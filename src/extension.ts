import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  // Helper function to execute terminal commands
  const runTerminalCommand = (
    command: string,
    successMessage: string,
    cwd: string
  ) => {
    exec(command, { cwd }, (err, stdout, stderr) => {
      if (err) {
        vscode.window.showErrorMessage(`Error: ${stderr}`);
        console.error(`Error: ${stderr}`);
      } else {
        vscode.window.showInformationMessage(successMessage);
        console.log(`Output: ${stdout}`);
      }
    });
  };

  // Get the workspace folder (assuming there's only one for simplicity)
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  // Flutter commands
  let flutterRun = vscode.commands.registerCommand(
    "flutter-helper.flutterRun",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      exec(
        "flutter devices",
        { cwd: workspaceFolder },
        (err, stdout, stderr) => {
          if (err) {
            vscode.window.showErrorMessage(`Error getting devices: ${stderr}`);
            console.error(`Error: ${stderr}`);
            return;
          }

          const devices = stdout
            .split("\n")
            .filter((line) => line.includes("•"))
            .map((line) => {
              const match = line.match(/• (.*?) \[(.*?)\]/);
              if (match) {
                return {
                  label: match[1], // Device name
                  id: match[2], // Device ID
                };
              }
              return null;
            })
            .filter((device) => device !== null);

          if (devices.length === 0) {
            vscode.window.showErrorMessage(
              "No devices found. Please connect a device or start an emulator."
            );
            return;
          }

          vscode.window
            .showQuickPick(
              devices.map((device) => device.label),
              {
                placeHolder: "Select a device to run the app on",
              }
            )
            .then((selectedDevice) => {
              if (!selectedDevice) {
                return;
              }

              const selected = devices.find(
                (device) => device.label === selectedDevice
              );
              if (selected) {
                vscode.window.showInformationMessage(
                  `Running on ${selected.label}...`
                );
                runTerminalCommand(
                  `flutter run -d ${selected.id}`,
                  `Flutter App Running on ${selected.label}!`,
                  workspaceFolder
                );
              }
            });
        }
      );
    }
  );

  let flutterPubGet = vscode.commands.registerCommand(
    "flutter-helper.flutterPubGet",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage('Running "flutter pub get"...');
      runTerminalCommand(
        "flutter pub get",
        "Flutter Pub Get Completed!",
        workspaceFolder
      );
    }
  );

  let flutterPubUpgrade = vscode.commands.registerCommand(
    "flutter-helper.flutterPubUpgrade",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage('Running "flutter pub upgrade"...');
      runTerminalCommand(
        "flutter pub upgrade",
        "Flutter Pub Upgrade Completed!",
        workspaceFolder
      );
    }
  );

  let flutterClean = vscode.commands.registerCommand(
    "flutter-helper.flutterClean",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage('Running "flutter clean"...');
      runTerminalCommand(
        "flutter clean",
        "Flutter Clean Completed!",
        workspaceFolder
      );
    }
  );

  let flutterTest = vscode.commands.registerCommand(
    "flutter-helper.flutterTest",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage('Running "flutter test"...');
      runTerminalCommand(
        "flutter test",
        "Flutter Test Completed!",
        workspaceFolder
      );
    }
  );

  let flutterAnalyze = vscode.commands.registerCommand(
    "flutter-helper.flutterAnalyze",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage('Running "flutter analyze"...');
      runTerminalCommand(
        "flutter analyze",
        "Flutter Analysis Completed!",
        workspaceFolder
      );
    }
  );

  let flutterCreate = vscode.commands.registerCommand(
    "flutter-helper.flutterCreate",
    async () => {
      const projectName = await vscode.window.showInputBox({
        prompt: "Enter the name of the new Flutter project",
      });

      if (!projectName) {
        vscode.window.showErrorMessage("Project name is required.");
        return;
      }

      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage(
        `Creating project "${projectName}"...`
      );
      runTerminalCommand(
        `flutter create ${projectName}`,
        `Flutter Project "${projectName}" Created!`,
        workspaceFolder
      );
    }
  );

  let flutterRunRelease = vscode.commands.registerCommand(
    "flutter-helper.flutterRunRelease",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      exec(
        "flutter devices",
        { cwd: workspaceFolder },
        (err, stdout, stderr) => {
          if (err) {
            vscode.window.showErrorMessage(`Error getting devices: ${stderr}`);
            console.error(`Error: ${stderr}`);
            return;
          }

          const devices = stdout
            .split("\n")
            .filter((line) => line.includes("•"))
            .map((line) => {
              const match = line.match(/• (.*?) \[(.*?)\]/);
              if (match) {
                return {
                  label: match[1], // Device name
                  id: match[2], // Device ID
                };
              }
              return null;
            })
            .filter((device) => device !== null);

          if (devices.length === 0) {
            vscode.window.showErrorMessage(
              "No devices found. Please connect a device or start an emulator."
            );
            return;
          }

          vscode.window
            .showQuickPick(
              devices.map((device) => device.label),
              {
                placeHolder: "Select a device to run the app on",
              }
            )
            .then((selectedDevice) => {
              if (!selectedDevice) {
                return;
              }

              const selected = devices.find(
                (device) => device.label === selectedDevice
              );
              if (selected) {
                vscode.window.showInformationMessage(
                  `Running on ${selected.label} in release mode...`
                );
                runTerminalCommand(
                  `flutter run -d ${selected.id} --release`,
                  `Flutter App Running on ${selected.label} in Release Mode!`,
                  workspaceFolder
                );
              }
            });
        }
      );
    }
  );

  let flutterBuildApk = vscode.commands.registerCommand(
    "flutter-helper.flutterBuildApk",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage("Building APK...");
      runTerminalCommand(
        "flutter build apk",
        "APK Built Successfully!",
        workspaceFolder
      );
    }
  );

  let flutterBuildIos = vscode.commands.registerCommand(
    "flutter-helper.flutterBuildIos",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage("Building iOS app...");
      runTerminalCommand(
        "flutter build ios",
        "iOS App Built Successfully!",
        workspaceFolder
      );
    }
  );

  let flutterBuildAppBundle = vscode.commands.registerCommand(
    "flutter-helper.flutterBuildAppBundle",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage("Building App Bundle...");
      runTerminalCommand(
        "flutter build appbundle",
        "App Bundle Built Successfully!",
        workspaceFolder
      );
    }
  );

  let podInstall = vscode.commands.registerCommand(
    "flutter-helper.podInstall",
    async () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      const iosPath = path.join(workspaceFolder, "ios");
      // Check if ios directory exists
      try {
        const stat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
        if (stat.type !== vscode.FileType.Directory) {
          vscode.window.showErrorMessage(
            "No ios directory found. Please check your Flutter project."
          );
          return;
        }

        vscode.window.showInformationMessage('Running "pod install"...');
        runTerminalCommand("pod install", "Pod Install Completed!", iosPath);
      } catch {
        vscode.window.showErrorMessage(
          "No ios directory found. Please check your Flutter project."
        );
      }
    }
  );

  let podInstallWithRepoUpdate = vscode.commands.registerCommand(
    "flutter-helper.podInstallWithRepoUpdate",
    async () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      const iosPath = path.join(workspaceFolder, "ios");
      // Check if ios directory exists
      try {
        const stat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
        if (stat.type !== vscode.FileType.Directory) {
          vscode.window.showErrorMessage(
            "No ios directory found. Please check your Flutter project."
          );
          return;
        }

        vscode.window.showInformationMessage(
          'Running "pod install --repo-update"...'
        );
        runTerminalCommand(
          "pod install --repo-update",
          "Pod Install with Repo Update Completed!",
          iosPath
        );
      } catch {
        vscode.window.showErrorMessage(
          "No ios directory found. Please check your Flutter project."
        );
      }
    }
  );

  let podUpdate = vscode.commands.registerCommand(
    "flutter-helper.podUpdate",
    async () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      const iosPath = path.join(workspaceFolder, "ios");
      // Check if ios directory exists
      try {
        const stat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
        if (stat.type !== vscode.FileType.Directory) {
          vscode.window.showErrorMessage(
            "No ios directory found. Please check your Flutter project."
          );
          return;
        }

        vscode.window.showInformationMessage('Running "pod update"...');
        runTerminalCommand("pod update", "Pod Update Completed!", iosPath);
      } catch {
        vscode.window.showErrorMessage(
          "No ios directory found. Please check your Flutter project."
        );
      }
    }
  );

  let podRepoUpdate = vscode.commands.registerCommand(
    "flutter-helper.podRepoUpdate",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage('Running "pod repo update"...');
      runTerminalCommand(
        "pod repo update",
        "Pod Repo Update Completed!",
        workspaceFolder
      );
    }
  );

  let flutterPubGlobalActivate = vscode.commands.registerCommand(
    "flutter-helper.flutterPubGlobalActivate",
    async () => {
      const packageName = await vscode.window.showInputBox({
        prompt: "Enter the name of the package to activate globally",
      });

      if (!packageName) {
        vscode.window.showErrorMessage("Package name is required.");
        return;
      }

      vscode.window.showInformationMessage(
        `Activating package "${packageName}" globally...`
      );
      runTerminalCommand(
        `flutter pub global activate ${packageName}`,
        `Package "${packageName}" Activated Globally!`,
        workspaceFolder!
      );
    }
  );

  let flutterChannel = vscode.commands.registerCommand(
    "flutter-helper.flutterChannel",
    async () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      const channel = await vscode.window.showQuickPick(
        ["stable", "beta", "dev", "master"],
        {
          placeHolder: "Select a Flutter channel to switch to",
        }
      );

      if (!channel) {
        return;
      }

      vscode.window.showInformationMessage(
        `Switching to "${channel}" channel...`
      );
      runTerminalCommand(
        `flutter channel ${channel}`,
        `Switched to "${channel}" channel!`,
        workspaceFolder
      );
    }
  );

  let flutterVersion = vscode.commands.registerCommand(
    "flutter-helper.flutterVersion",
    () => {
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a Flutter project folder."
        );
        return;
      }

      vscode.window.showInformationMessage(
        "Getting current Flutter version..."
      );
      runTerminalCommand(
        "flutter --version",
        "Flutter Version Retrieved!",
        workspaceFolder
      );
    }
  );

  // Add all commands to the context
  context.subscriptions.push(
    flutterRun,
    flutterPubGet,
    flutterPubUpgrade,
    flutterClean,
    flutterTest,
    flutterAnalyze,
    flutterCreate,
    flutterRunRelease,
    flutterBuildApk,
    flutterBuildIos,
    flutterBuildAppBundle,
    podInstall,
    podInstallWithRepoUpdate,
    podUpdate,
    podRepoUpdate,
    flutterPubGlobalActivate,
    flutterChannel,
    flutterVersion
  );
}

export function deactivate() {}
