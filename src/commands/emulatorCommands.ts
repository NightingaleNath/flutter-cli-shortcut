import * as vscode from "vscode";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const runTerminalCommand = async (command: string, cwd: string): Promise<string> => {
    try {
        const { stdout, stderr } = await execPromise(command, { cwd });
        if (stderr) {
            throw new Error(stderr);
        }
        return stdout;
    } catch (error: any) {
        throw new Error(`Failed to run command "${command}": ${error.message}`);
    }
};


// Command to list connected devices
const listDevices = async (workspaceFolder: string) => {
    try {
        const output = await runTerminalCommand("flutter devices", workspaceFolder);
        return output.split('\n').filter(line => line.trim() !== '');
    } catch (error: any) {
        throw new Error(`Failed to list devices: ${error.message}`);
    }
};

// Command to manage devices
export const registerDeviceManagementCommands = (context: vscode.ExtensionContext) => {

    // Command to list devices
    let listDevicesCommand = vscode.commands.registerCommand("flutter-cli-shortcut.listDevices", async () => {
        const workspaceFolder = getWorkspaceFolder();
        if (!workspaceFolder) {
            return; // Error message is already shown in the utility
        }

        try {
            const devices = await listDevices(workspaceFolder);
            vscode.window.showInformationMessage("Connected devices:\n" + devices.join("\n"));
        } catch (error: any) {
            vscode.window.showErrorMessage(error.message);
        }
    });

    // Command to start a device
    let startDeviceCommand = vscode.commands.registerCommand("flutter-cli-shortcut.startDevice", async () => {
        const workspaceFolder = getWorkspaceFolder();
        if (!workspaceFolder) {
            return; // Error message is already shown in the utility
        }

        try {
            const devices = await listDevices(workspaceFolder);
            if (devices.length === 0) {
                vscode.window.showErrorMessage("No devices available to start.");
                return;
            }

            const deviceToStart = await vscode.window.showQuickPick(devices, { placeHolder: "Select a device to start" });
            if (!deviceToStart) {
                vscode.window.showErrorMessage("No device selected. Start aborted.");
                return;
            }

            await runTerminalCommand(`flutter emulators --launch ${deviceToStart}`, workspaceFolder);
            vscode.window.showInformationMessage(`Successfully started device: ${deviceToStart}`);
        } catch (error: any) {
            vscode.window.showErrorMessage(error.message);
        }
    });

    // Command to stop a device
    let stopDeviceCommand = vscode.commands.registerCommand("flutter-cli-shortcut.stopDevice", async () => {
        const workspaceFolder = getWorkspaceFolder();
        if (!workspaceFolder) {
            return; // Error message is already shown in the utility
        }

        try {
            const devices = await listDevices(workspaceFolder);
            if (devices.length === 0) {
                vscode.window.showErrorMessage("No devices available to stop.");
                return;
            }

            const deviceToStop = await vscode.window.showQuickPick(devices, { placeHolder: "Select a device to stop" });
            if (!deviceToStop) {
                vscode.window.showErrorMessage("No device selected. Stop aborted.");
                return;
            }

            // For Android, we typically use ADB commands to stop
            await runTerminalCommand(`adb -s ${deviceToStop} emu kill`, workspaceFolder);
            vscode.window.showInformationMessage(`Successfully stopped device: ${deviceToStop}`);
        } catch (error: any) {
            vscode.window.showErrorMessage(error.message);
        }
    });

    // Register the commands
    context.subscriptions.push(listDevicesCommand);
    context.subscriptions.push(startDeviceCommand);
    context.subscriptions.push(stopDeviceCommand);
};
