import * as vscode from "vscode";
import { runTerminalCommand } from "../utils/terminalUtils";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { ANDROID_BUILD_OPTIONS, APK_BUILD_TYPES, COMMANDS, MESSAGES, PLATFORMS } from "../constants";

export const registerBuildCommands = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    let flutterBuildApk = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_BUILD_APK,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter build apk", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter build apk'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter build apk': ${error.message}`
                );
            }
        }
    );

    let flutterBuildIos = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_BUILD_IOS,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter build ios", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter build ios'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter build ios': ${error.message}`
                );
            }
        }
    );

    let flutterBuildAppBundle = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_BUILD_APPBUNDLE,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter build appbundle", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter build appbundle'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter build appbundle': ${error.message}`
                );
            }
        }
    );

    let flutterBuildWithOptions = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_BUILD_OPTIONS,
        async () => {

            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            // Prompt user for platforms to build
            const platforms = await vscode.window.showQuickPick(
                PLATFORMS,
                { canPickMany: true, placeHolder: "Select platforms to build for" }
            );

            if (!platforms || platforms.length === 0) {
                vscode.window.showErrorMessage(MESSAGES.NO_PLATFORMS_SELECTED);
                return;
            }

            // Iterate over the selected platforms and run builds
            for (const platform of platforms) {
                try {
                    let buildCommand: string | undefined;

                    if (platform === "Android") {
                        const androidBuildOption = await vscode.window.showQuickPick(
                            ANDROID_BUILD_OPTIONS,
                            { placeHolder: "Select Android build type" }
                        );

                        if (!androidBuildOption) {
                            vscode.window.showErrorMessage(MESSAGES.NO_ANDROID_OPTION);
                            continue; // Skip to the next platform
                        }

                        if (androidBuildOption === "APK") {
                            const apkBuildType = await vscode.window.showQuickPick(
                                APK_BUILD_TYPES,
                                { placeHolder: "Select APK build type" }
                            );

                            if (!apkBuildType) {
                                vscode.window.showErrorMessage(MESSAGES.NO_APK_BUILD_TYPE);
                                continue; // Skip to the next platform
                            }

                            buildCommand = apkBuildType === "Release"
                                ? "flutter build apk --release"
                                : "flutter build apk --debug";
                        } else if (androidBuildOption === "App Bundle") {
                            buildCommand = "flutter build appbundle";
                        }
                    } else if (platform === "iOS") {
                        buildCommand = "flutter build ios";
                    } else if (platform === "Web") {
                        buildCommand = "flutter build web";
                    }

                    if (buildCommand) {
                        await runTerminalCommand(buildCommand, workspaceFolder);
                        vscode.window.showInformationMessage(`Successfully built for ${platform}.`);
                    }
                } catch (error: any) {
                    vscode.window.showErrorMessage(`${MESSAGES.FAILED_TO_BUILD} ${platform}: ${error.message}`);
                }
            }
        }
    );
    context.subscriptions.push(flutterBuildWithOptions, flutterBuildApk, flutterBuildAppBundle, flutterBuildIos);
};
