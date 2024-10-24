import * as vscode from "vscode";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Execute Flutter command with zsh
const executeFlutterCommand = async (command: string): Promise<string> => {
  try {
    // Execute command through zsh
    const { stdout } = await execAsync(`/bin/zsh -i -c "${command}"`, {
      env: process.env,
      shell: "/bin/zsh",
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
    const stdout = await executeFlutterCommand("flutter emulators");
    const lines = stdout.split("\n");
    const emulators: string[] = [];

    lines.forEach((line) => {
      if (line.includes("•")) {
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

interface Device {
  id: string;
  name: string;
  platform: string;
  isEmulator: boolean;
}

// Function to get connected devices with better parsing
const getDevices = async (): Promise<Device[]> => {
  try {
    const stdout = await executeFlutterCommand("flutter devices");
    console.log("Raw devices output:", stdout); // Debug logging

    const lines = stdout.split("\n");
    const devices: Device[] = [];

    // Skip header lines
    let startIndex = lines.findIndex((line) => line.includes("devices"));
    if (startIndex === -1) {
      return devices;
    }

    // Process each line after the header
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines and the header separator
      if (!line || line.startsWith("─")) {
        continue;
      }

      // Parse device information
      // Example line: "sdk gphone64 x86 64 (mobile) • emulator-5554 • android-x64 • Android 14 (API 34) (emulator)"
      const parts = line.split("•").map((part) => part.trim());
      if (parts.length >= 3) {
        const deviceName = parts[0];
        const deviceId = parts[1];
        const platform = parts[2];

        // Check if it's an emulator based on various indicators
        const isEmulator =
          deviceId.includes("emulator") ||
          deviceName.toLowerCase().includes("emulator") ||
          line.toLowerCase().includes("(emulator)");

        if (deviceId && deviceName) {
          devices.push({
            id: deviceId,
            name: deviceName,
            platform: platform,
            isEmulator: isEmulator,
          });
        }
      }
    }

    console.log("Parsed devices:", devices); // Debug logging
    return devices;
  } catch (error) {
    vscode.window.showErrorMessage(`Error getting devices: ${error}`);
    return [];
  }
};

// Command to run a terminal command using VSCode's terminal
export const runTerminalCommandInVSCodeTerminal = (
  command: string,
  cwd: string
): void => {
  const terminal = vscode.window.createTerminal({
    name: `Flutter: ${command}`,
    cwd,
    shellPath: "/bin/zsh",
  });
  terminal.show();
  terminal.sendText(command);
};

// Register the commands for starting and stopping emulators
export const registerDeviceManagementCommands = (
  context: vscode.ExtensionContext
) => {
  // Command to list devices (physical devices + running emulators)
  let startEmulatorCommand = vscode.commands.registerCommand(
    "flutter-cli-shortcut.startEmulator",
    async () => {
      const workspaceFolder = getWorkspaceFolder();
      if (!workspaceFolder) {
        vscode.window.showErrorMessage("Workspace folder not found.");
        return;
      }

      try {
        // Show loading message while fetching emulators
        const emulators = await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Fetching available emulators...",
            cancellable: false,
          },
          async () => {
            return await getEmulators();
          }
        );

        if (emulators.length === 0) {
          vscode.window.showInformationMessage("No emulators found.");
          return;
        }

        const selectedEmulator = await vscode.window.showQuickPick(emulators, {
          placeHolder: "Select an emulator to start",
        });

        if (selectedEmulator) {
          const emulatorId = selectedEmulator.split("•")[0].trim();
          runTerminalCommandInVSCodeTerminal(
            `flutter emulators --launch ${emulatorId}`,
            workspaceFolder
          );
          vscode.window.showInformationMessage(
            `Starting emulator: ${selectedEmulator}`
          );
        }
      } catch (error: any) {
        vscode.window.showErrorMessage(error.message);
      }
    }
  );

  let listDevicesCommand = vscode.commands.registerCommand(
    "flutter-cli-shortcut.listDevices",
    async () => {
      const workspaceFolder = getWorkspaceFolder();
      if (!workspaceFolder) {
        vscode.window.showErrorMessage("Workspace folder not found.");
        return;
      }

      try {
        // Show loading message while fetching devices
        const devices = await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Fetching connected devices...",
            cancellable: false,
          },
          async () => {
            return await getDevices();
          }
        );

        if (devices.length === 0) {
          vscode.window.showInformationMessage("No devices found.");
          return;
        }

        const deviceItems = devices.map((device) => ({
          label: device.name,
          description: device.id,
          detail: `Platform: ${device.platform} ${
            device.isEmulator ? "(Emulator)" : ""
          }`,
        }));

        const selectedDevice = await vscode.window.showQuickPick(deviceItems, {
          placeHolder: "Select a device to view details",
        });

        if (selectedDevice) {
          vscode.window.showInformationMessage(
            `Selected device: ${selectedDevice.label} (${selectedDevice.description})`
          );
        }
      } catch (error: any) {
        vscode.window.showErrorMessage(`Error getting devices: ${error}`);
      }
    }
  );

  // Command to stop a running emulator
  let stopDeviceCommand = vscode.commands.registerCommand(
    "flutter-cli-shortcut.stopDevice",
    async () => {
      const workspaceFolder = getWorkspaceFolder();
      if (!workspaceFolder) {
        vscode.window.showErrorMessage("Workspace folder not found.");
        return;
      }

      try {
        const devices = await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Fetching running emulators...",
            cancellable: false,
          },
          async () => {
            return await getDevices();
          }
        );

        const runningEmulators = devices.filter((device) => device.isEmulator);

        if (runningEmulators.length === 0) {
          vscode.window.showInformationMessage("No running emulators found.");
          return;
        }

        const emulatorItems = runningEmulators.map((emulator) => ({
          label: emulator.name,
          description: emulator.id,
          detail: `Platform: ${emulator.platform}`,
        }));

        const selectedEmulator = await vscode.window.showQuickPick(
          emulatorItems,
          {
            placeHolder: "Select an emulator to stop",
          }
        );

        if (selectedEmulator) {
          // Use the emulator ID for the adb command
          runTerminalCommandInVSCodeTerminal(
            `adb -s ${selectedEmulator.description} emu kill`,
            workspaceFolder
          );
          vscode.window.showInformationMessage(
            `Stopping emulator: ${selectedEmulator.label}`
          );
        }
      } catch (error: any) {
        vscode.window.showErrorMessage(`Error stopping emulator: ${error}`);
      }
    }
  );

  // Register all the commands
  context.subscriptions.push(listDevicesCommand);
  context.subscriptions.push(startEmulatorCommand);
  context.subscriptions.push(stopDeviceCommand);
};
