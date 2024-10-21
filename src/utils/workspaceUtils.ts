import * as vscode from "vscode";

export const getWorkspaceFolder = (): string | undefined => {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

    if (!workspaceFolder) {
        vscode.window.showErrorMessage(
            "No workspace folder found. Please open a Flutter project folder."
        );
    }

    return workspaceFolder;
};
