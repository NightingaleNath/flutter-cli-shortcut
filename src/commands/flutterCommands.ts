import * as vscode from "vscode";
import { runTerminalCommand } from "../utils/terminalUtils";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { COMMANDS, MESSAGES } from "../constants";

export const registerFlutterCommands = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    let flutterClean = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_CLEAN,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter clean", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter clean'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter clean': ${error.message}`
                );
            }
        }
    );

    let flutterTest = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_TEST,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter test", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter test'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter test': ${error.message}`
                );
            }
        }
    );

    let flutterAnalyze = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_ANALYZE,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand("flutter analyze", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully ran 'flutter analyze'."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run 'flutter analyze': ${error.message}`
                );
            }
        }
    );

    // Clean and rebuild command
    let cleanAndRebuild = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_CLEAN_REBUILD,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(MESSAGES.NO_WORKSPACE);
                return;
            }

            try {
                await runTerminalCommand("flutter clean && flutter pub get", workspaceFolder);
                vscode.window.showInformationMessage(
                    "Successfully cleaned and rebuilt the project."
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to clean and rebuild: ${error.message}`
                );
            }
        }
    );

    context.subscriptions.push(
        flutterClean,
        flutterTest,
        flutterAnalyze, cleanAndRebuild
    );
}