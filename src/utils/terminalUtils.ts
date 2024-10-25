import * as vscode from "vscode";

export const runTerminalCommandWithOutput = async (command: string, cwd: string): Promise<string> => {
    const outputChannel = vscode.window.createOutputChannel("Flutter Doctor Output");
    outputChannel.show();

    return new Promise<string>((resolve, reject) => {
        const terminal = vscode.window.createTerminal({
            name: `Flutter Doctor`,
            cwd,
            shellPath: "/bin/zsh",
        });

        terminal.sendText(command);
        terminal.sendText("exit");

        setTimeout(() => {
            outputChannel.appendLine("Running 'flutter doctor'...");
            outputChannel.appendLine("Command executed, check the terminal output.");
            resolve("Command executed, check terminal output.");
        }, 3000);
    });
};

export const runTerminalCommand = async (command: string, cwd: string) => {
    return new Promise<void>((resolve, reject) => {
        const terminal = vscode.window.createTerminal({
            name: `Flutter: ${command}`,
            cwd,
            shellPath: "/bin/zsh",
        });
        terminal.show();
        terminal.sendText(command);

        // Listen for when the terminal is closed to indicate completion
        const disposable = vscode.window.onDidCloseTerminal((closedTerminal) => {
            if (closedTerminal === terminal) {
                disposable.dispose(); // Clean up listener
                resolve(); // Command has completed
            }
        });
    });
};

// Helper function to run runTerminalCommandWithTimeout
export const runTerminalCommandWithTimeout = (command: string, cwd: string) => {
    return new Promise<void>((resolve, reject) => {
        const terminal = vscode.window.createTerminal({
            name: `Flutter: ${command}`,
            cwd,
            shellPath: "/bin/zsh",
        });
        terminal.show();
        terminal.sendText(command);

        // Listen for when the terminal is closed to indicate completion
        const disposable = vscode.window.onDidCloseTerminal((closedTerminal) => {
            if (closedTerminal === terminal) {
                disposable.dispose(); // Clean up listener
                resolve(); // Command has completed
            }
        });

        terminal.sendText("exit");
    });
};