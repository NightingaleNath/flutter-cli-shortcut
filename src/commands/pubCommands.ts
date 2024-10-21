import * as vscode from "vscode";
import { runTerminalCommand } from "../utils/terminalUtils";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { ANDROID_BUILD_OPTIONS, APK_BUILD_TYPES, COMMANDS, MESSAGES, PLATFORMS } from "../constants";

export const registerPubCommands = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    // Flutter commands
    let flutterPubGet = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_GET,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter pub get", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter pub get'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter pub get': ${error.message}`
                );
            }
        }
    );

    let flutterPubUpgrade = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_UPGRADE,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter pub upgrade", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter pub upgrade'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter pub upgrade': ${error.message}`
                );
            }
        }
    );

    let flutterPubUpgradeMajorVersions = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_UPGRADE_MAJOR_VERSION,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand(
                    "flutter pub upgrade --major-versions",
                    workspaceFolder
                );
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter pub upgrade --major-versions'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter pub upgrade --major-versions': ${error.message}`
                );
            }
        }
    );

    let flutterPubOutdated = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_OUTDATED,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter pub outdated", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter pub outdated'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter pub outdated': ${error.message}`
                );
            }
        }
    );

    let flutterPubCacheRepair = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_CACHE_REPAIR,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter pub cache repair", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter pub cache repair'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter pub cache repair': ${error.message}`
                );
            }
        }
    );

    let flutterPubUpgradeDryRun = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_UPGRADE_DRYRUN,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand(
                    "flutter pub upgrade --dry-run",
                    workspaceFolder
                );
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter pub upgrade --dry-run'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter pub upgrade --dry-run': ${error.message}`
                );
            }
        }
    );

    let flutterPubDowngrade = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_DOWNGRADE,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter pub downgrade", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter pub downgrade'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter pub downgrade': ${error.message}`
                );
            }
        }
    );

    let flutterPubVersion = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_VERSION,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand(
                    "flutter --version && flutter pub version",
                    workspaceFolder
                );
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter --version && flutter pub version'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter --version && flutter pub version': ${error.message}`
                );
            }
        }
    );

    let flutterPubAdd = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_ADD,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            // Prompt for the package name
            const packageName = await vscode.window.showInputBox({
                prompt: "Enter the package name to add",
                placeHolder: "e.g., provider",
            });

            if (!packageName) {
                vscode.window.showErrorMessage("Package name is required.");
                return;
            }

            // Run the flutter pub add command
            try {
                await runTerminalCommand(
                    `flutter pub add ${packageName}`,
                    workspaceFolder
                );
                vscode.window.showInformationMessage(
                    `Successfully ran flutter pub add ${packageName}.`
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run flutter pub add ${packageName}: ${error.message}`
                );
            }
        }
    );

    let flutterPubRemove = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_PUB_REMOVE,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            // Prompt for the package name
            const packageName = await vscode.window.showInputBox({
                prompt: "Enter the package name to remove",
                placeHolder: "e.g., provider",
            });

            if (!packageName) {
                vscode.window.showErrorMessage("Package name is required.");
                return;
            }

            // Run the flutter pub remove command
            try {
                await runTerminalCommand(
                    `flutter pub remove ${packageName}`,
                    workspaceFolder
                );
                vscode.window.showInformationMessage(
                    `Successfully ran flutter pub remove ${packageName}.`
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run flutter pub remove ${packageName}: ${error.message}`
                );
            }
        }
    );

    context.subscriptions.push(flutterPubGet, flutterPubUpgrade, flutterPubAdd, flutterPubCacheRepair, flutterPubDowngrade, flutterPubOutdated, flutterPubRemove, flutterPubUpgradeDryRun, flutterPubUpgradeMajorVersions, flutterPubVersion);
};
