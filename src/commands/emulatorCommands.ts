import * as vscode from "vscode";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { exec } from 'child_process';
import { promisify } from 'util';
import * as os from 'os';

const execAsync = promisify(exec);

// Execute Flutter command with zsh
const executeFlutterCommand = async (command: string): Promise<string> => {
    try {
        // Execute command through zsh
        const { stdout } = await execAsync(`/bin/zsh -i -c "${command}"`, {
            env: process.env,
            shell: '/bin/zsh'
        });
        return stdout;
    } catch (error: any) {
        console.error(`Error executing Flutter command: ${error.message}`);
        throw error;
    }
};

// Function to get available emulators
const getEmulators = async (): Promise<string[]> => {
    try {
        const stdout = await executeFlutterCommand('flutter emulators');
        const lines = stdout.split('\n');
        const emulators: string[] = [];

        lines.forEach(line => {
            if (line.includes('•')) {
                const name = line.trim();
                if (name) {
                    emulators.push(name);
                }
            }
        });

        return emulators;
    } catch (error) {
        vscode.window.showErrorMessage(`Error getting emulators: ${error}`);
        return [];
    }
};

// Function to get connected devices
const getDevices = async (): Promise<string[]> => {
    try {
        const stdout = await executeFlutterCommand('flutter devices');
        const lines = stdout.split('\n');
        const devices: string[] = [];

        let startParsing = false;
        lines.forEach(line => {
            if (line.includes('•') && !startParsing) {
                startParsing = true;
                return;
            }
            if (startParsing && line.includes('•')) {
                const deviceName = line.trim();
                if (deviceName) {
                    devices.push(deviceName);
                }
            }
        });

        return devices;
    } catch (error) {
        vscode.window.showErrorMessage(`Error getting devices: ${error}`);
        return [];
    }
};

// Command to run a terminal command using VSCode's terminal
export const runTerminalCommandInVSCodeTerminal = (command: string, cwd: string): void => {
    const terminal = vscode.window.createTerminal({
        name: `Flutter: ${command}`,
        cwd,
        shellPath: '/bin/zsh',
    });
    terminal.show();
    terminal.sendText(command);
};

// Register the commands for starting and stopping emulators
export const registerDeviceManagementCommands = (context: vscode.ExtensionContext) => {
    // Command to list devices (physical devices + running emulators)
    let listDevicesCommand = vscode.commands.registerCommand("flutter-cli-shortcut.listDevices", async () => {
        const workspaceFolder = getWorkspaceFolder();
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Workspace folder not found.");
            return;
        }

        const devices = await getDevices();
        if (devices.length === 0) {
            vscode.window.showInformationMessage("No devices found.");
            return;
        }

        const selectedDevice = await vscode.window.showQuickPick(devices, {
            placeHolder: "Select a device to view details",
        });

        if (selectedDevice) {
            vscode.window.showInformationMessage(`Selected device: ${selectedDevice}`);
        }
    });

    // Command to list and start an emulator
    let startEmulatorCommand = vscode.commands.registerCommand("flutter-cli-shortcut.startEmulator", async () => {
        const workspaceFolder = getWorkspaceFolder();
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Workspace folder not found.");
            return;
        }

        try {
            const emulators = await getEmulators();
            if (emulators.length === 0) {
                vscode.window.showInformationMessage("No emulators found.");
                return;
            }

            const selectedEmulator = await vscode.window.showQuickPick(emulators, {
                placeHolder: "Select an emulator to start",
            });

            if (selectedEmulator) {
                const emulatorId = selectedEmulator.split('•')[0].trim();
                runTerminalCommandInVSCodeTerminal(`flutter emulators --launch ${emulatorId}`, workspaceFolder);
                vscode.window.showInformationMessage(`Starting emulator: ${selectedEmulator}`);
            }
        } catch (error: any) {
            vscode.window.showErrorMessage(error.message);
        }
    });

    // Command to stop a running emulator
    let stopDeviceCommand = vscode.commands.registerCommand("flutter-cli-shortcut.stopDevice", async () => {
        const workspaceFolder = getWorkspaceFolder();
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Workspace folder not found.");
            return;
        }

        const devices = await getDevices();
        const runningEmulators = devices.filter(device => device.toLowerCase().includes('emulator'));

        if (runningEmulators.length === 0) {
            vscode.window.showInformationMessage("No running emulators found.");
            return;
        }

        const selectedDevice = await vscode.window.showQuickPick(runningEmulators, {
            placeHolder: "Select a running emulator to stop",
        });

        if (selectedDevice) {
            const deviceId = selectedDevice.split('•')[0].trim();
            runTerminalCommandInVSCodeTerminal(`adb -s ${deviceId} emu kill`, workspaceFolder);
            vscode.window.showInformationMessage(`Stopping device/emulator: ${selectedDevice}`);
        }
    });

    // Register all the commands
    context.subscriptions.push(listDevicesCommand);
    context.subscriptions.push(startEmulatorCommand);
    context.subscriptions.push(stopDeviceCommand);
};