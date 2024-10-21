import * as vscode from "vscode";
import { runTerminalCommandWithOutput } from "../utils/terminalUtils";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { COMMANDS, MESSAGES } from "../constants";

export const registerDoctorCommand = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    let flutterDetailedDoctor = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_DETAILED_DOCTOR,
        async () => {

            if (!workspaceFolder) {
                vscode.window.showErrorMessage(MESSAGES.NO_WORKSPACE);
                return;
            }

            try {
                const output = await runTerminalCommandWithOutput("flutter doctor", workspaceFolder);
                analyzeDoctorOutput(output);
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to run 'flutter doctor': ${error.message}`);
            }
        }
    );

    context.subscriptions.push(flutterDetailedDoctor);
};

// Function to analyze output from 'flutter doctor' and suggest resolutions
const analyzeDoctorOutput = (output: string) => {
    const lines = output.split('\n');
    let issues: string[] = [];
    let suggestions: string[] = [];

    for (const line of lines) {
        if (line.includes("✗")) {
            issues.push(line);
            if (line.includes("Android")) {
                suggestions.push("Make sure you have the latest Android SDK installed.");
            } else if (line.includes("Xcode")) {
                suggestions.push("Ensure Xcode is installed and updated.");
            } else if (line.includes("Flutter SDK")) {
                suggestions.push("Check your Flutter SDK path and version.");
            }
        }
    }

    if (issues.length > 0) {
        vscode.window.showInformationMessage("Issues found: " + issues.join(", "));
        vscode.window.showInformationMessage("Suggestions: " + suggestions.join(", "));
    } else {
        vscode.window.showInformationMessage("All checks passed! No issues found.");
    }
};
