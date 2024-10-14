"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
function activate(context) {
    // Helper function to execute terminal commands
    const runTerminalCommand = (command, successMessage) => {
        (0, child_process_1.exec)(command, (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(`Error: ${stderr}`);
                console.error(`Error: ${stderr}`);
            }
            else {
                vscode.window.showInformationMessage(successMessage);
                console.log(`Output: ${stdout}`);
            }
        });
    };
    // Flutter Run Command with Device Selection
    let flutterRun = vscode.commands.registerCommand('flutter-helper.flutterRun', () => {
        // Step 1: Get the list of available devices using `flutter devices`
        (0, child_process_1.exec)('flutter devices', (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(`Error getting devices: ${stderr}`);
                console.error(`Error: ${stderr}`);
                return;
            }
            // Step 2: Parse the output to get device names
            const devices = stdout.split('\n').filter(line => line.includes('•')).map(line => {
                const match = line.match(/• (.*?) \[(.*?)\]/);
                if (match) {
                    return {
                        label: match[1], // Device name (e.g., iPhone 12)
                        id: match[2] // Device ID (e.g., emulator-5554)
                    };
                }
                return null;
            }).filter(device => device !== null);
            if (devices.length === 0) {
                vscode.window.showErrorMessage('No devices found. Please connect a device or start an emulator.');
                return;
            }
            // Step 3: Show the Quick Pick prompt for device selection
            vscode.window.showQuickPick(devices.map(device => device.label), {
                placeHolder: 'Select a device to run the app on'
            }).then(selectedDevice => {
                if (!selectedDevice) {
                    return;
                }
                // Step 4: Find the selected device ID and run the app on that device
                const selected = devices.find(device => device.label === selectedDevice);
                if (selected) {
                    vscode.window.showInformationMessage(`Running on ${selected.label}...`);
                    runTerminalCommand(`flutter run -d ${selected.id}`, `Flutter App Running on ${selected.label}!`);
                }
            });
        });
    });
    // Other Flutter commands like Flutter Clean, Flutter Pub Get, etc.
    let flutterPubGet = vscode.commands.registerCommand('flutter-helper.flutterPubGet', () => {
        vscode.window.showInformationMessage('Running "flutter pub get"...');
        runTerminalCommand('flutter pub get', 'Flutter Pub Get Completed!');
    });
    let flutterClean = vscode.commands.registerCommand('flutter-helper.flutterClean', () => {
        vscode.window.showInformationMessage('Running "flutter clean"...');
        runTerminalCommand('flutter clean', 'Flutter Clean Completed!');
    });
    let podInstall = vscode.commands.registerCommand('flutter-helper.podInstall', () => {
        vscode.window.showInformationMessage('Running "cd ios && pod install"...');
        runTerminalCommand('cd ios && pod install', 'Pod Install Completed!');
    });
    let podUpdate = vscode.commands.registerCommand('flutter-helper.podUpdate', () => {
        vscode.window.showInformationMessage('Running "cd ios && pod update"...');
        runTerminalCommand('cd ios && pod update', 'Pod Update Completed!');
    });
    let podRepoUpdate = vscode.commands.registerCommand('flutter-helper.podRepoUpdate', () => {
        vscode.window.showInformationMessage('Running "pod repo update"...');
        runTerminalCommand('pod repo update', 'Pod Repo Update Completed!');
    });
    // Add all commands to the context
    context.subscriptions.push(flutterRun, flutterPubGet, flutterClean, podInstall, podUpdate, podRepoUpdate);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map