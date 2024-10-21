import * as vscode from "vscode";
import * as path from "path";
import { runTerminalCommand } from "../utils/terminalUtils";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { COMMANDS, MESSAGES } from "../constants";

export const registerPodCommands = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    let podInstall = vscode.commands.registerCommand(
       COMMANDS.POD_INSTALL,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            const iosPath = path.join(workspaceFolder, "ios");
            const podfilePath = path.join(iosPath, "Podfile");

            // Check if ios directory and Podfile exist
            try {
                const iosStat = await vscode.workspace.fs.stat(
                    vscode.Uri.file(iosPath)
                );
                if (iosStat.type !== vscode.FileType.Directory) {
                    vscode.window.showErrorMessage(
                       MESSAGES.NO_IOS_WORKSPACE
                    );
                    return;
                }

                try {
                    await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                    // Podfile exists, so just install
                    try {
                        await runTerminalCommand("cd ios && pod install", workspaceFolder);
                        vscode.window.showInformationMessage(
                            "Pods installed successfully!"
                        );
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Error: ${error.message}`);
                    }
                } catch {
                    // Podfile doesn't exist, initialize pods first
                    try {
                        await runTerminalCommand(
                            "cd ios && pod init && pod install",
                            workspaceFolder
                        );
                        vscode.window.showInformationMessage(
                            "Pods initialized and installed!"
                        );
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Error: ${error.message}`);
                    }
                }
            } catch {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_IOS_WORKSPACE
                );
            }
        }
    );

    let podInstallWithRepoUpdate = vscode.commands.registerCommand(
        COMMANDS.POD_INSTALL_REPO_UPDATE,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            const iosPath = path.join(workspaceFolder, "ios");
            const podfilePath = path.join(iosPath, "Podfile");

            // Check if ios directory and Podfile exist
            try {
                const iosStat = await vscode.workspace.fs.stat(
                    vscode.Uri.file(iosPath)
                );
                if (iosStat.type !== vscode.FileType.Directory) {
                    vscode.window.showErrorMessage(
                        MESSAGES.NO_IOS_WORKSPACE
                    );
                    return;
                }

                try {
                    await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                    // Podfile exists, so just install with repo update
                    try {
                        await runTerminalCommand(
                            "cd ios && pod install --repo-update",
                            workspaceFolder
                        );
                        vscode.window.showInformationMessage(
                            "Pods installed with repo update!"
                        );
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Error: ${error.message}`);
                    }
                } catch {
                    // Podfile doesn't exist, initialize pods first
                    try {
                        await runTerminalCommand(
                            "cd ios && pod init && pod install --repo-update",
                            workspaceFolder
                        );
                        vscode.window.showInformationMessage(
                            "Pods initialized and installed with repo update!"
                        );
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Error: ${error.message}`);
                    }
                }
            } catch {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_IOS_WORKSPACE
                );
            }
        }
    );

    let podUpdate = vscode.commands.registerCommand(
        COMMANDS.POD_UPDATE,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            const iosPath = path.join(workspaceFolder, "ios");
            const podfilePath = path.join(iosPath, "Podfile");

            // Check if ios directory and Podfile exist
            try {
                const iosStat = await vscode.workspace.fs.stat(
                    vscode.Uri.file(iosPath)
                );
                if (iosStat.type !== vscode.FileType.Directory) {
                    vscode.window.showErrorMessage(
                        MESSAGES.NO_IOS_WORKSPACE
                    );
                    return;
                }

                try {
                    await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                    // Podfile exists, so just update pods
                    try {
                        await runTerminalCommand("cd ios && pod update", workspaceFolder);
                        vscode.window.showInformationMessage("Pods updated successfully!");
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Error: ${error.message}`);
                    }
                } catch {
                    // Podfile doesn't exist, initialize pods first
                    try {
                        await runTerminalCommand(
                            "cd ios && pod init && pod update",
                            workspaceFolder
                        );
                        vscode.window.showInformationMessage(
                            "Pods initialized and updated!"
                        );
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Error: ${error.message}`);
                    }
                }
            } catch {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_IOS_WORKSPACE
                );
            }
        }
    );

    let podRepoUpdate = vscode.commands.registerCommand(
        COMMANDS.POD_REPO_UPDATE,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            const iosPath = path.join(workspaceFolder, "ios");
            const podfilePath = path.join(iosPath, "Podfile");

            // Check if ios directory and Podfile exist
            try {
                const iosStat = await vscode.workspace.fs.stat(
                    vscode.Uri.file(iosPath)
                );
                if (iosStat.type !== vscode.FileType.Directory) {
                    vscode.window.showErrorMessage(
                        MESSAGES.NO_IOS_WORKSPACE
                    );
                    return;
                }

                try {
                    await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                    // Podfile exists, so just run the repo update
                    try {
                        await runTerminalCommand(
                            "cd ios && pod repo update",
                            workspaceFolder
                        );
                        vscode.window.showInformationMessage("Repo updated successfully!");
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Error: ${error.message}`);
                    }
                } catch {
                    // Podfile doesn't exist, initialize pods first
                    try {
                        await runTerminalCommand(
                            "cd ios && pod init && pod repo update",
                            workspaceFolder
                        );
                        vscode.window.showInformationMessage(
                            "Repo initialized and updated!"
                        );
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Error: ${error.message}`);
                    }
                }
            } catch {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_IOS_WORKSPACE
                );
            }
        }
    );

    context.subscriptions.push(
        podInstall,
        podInstallWithRepoUpdate,
        podUpdate,
        podRepoUpdate,);
};
