/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerBuildCommands = void 0;
const vscode = __importStar(__webpack_require__(2));
const terminalUtils_1 = __webpack_require__(3);
const workspaceUtils_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
const registerBuildCommands = (context) => {
    const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
    let flutterBuildApk = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_BUILD_APK, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter build apk", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter build apk'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter build apk': ${error.message}`);
        }
    });
    let flutterBuildIos = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_BUILD_IOS, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter build ios", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter build ios'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter build ios': ${error.message}`);
        }
    });
    let flutterBuildAppBundle = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_BUILD_APPBUNDLE, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter build appbundle", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter build appbundle'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter build appbundle': ${error.message}`);
        }
    });
    let flutterBuildWithOptions = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_BUILD_OPTIONS, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        // Prompt user for platforms to build
        const platforms = await vscode.window.showQuickPick(constants_1.PLATFORMS, { canPickMany: true, placeHolder: "Select platforms to build for" });
        if (!platforms || platforms.length === 0) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_PLATFORMS_SELECTED);
            return;
        }
        // Iterate over the selected platforms and run builds
        for (const platform of platforms) {
            try {
                let buildCommand;
                if (platform === "Android") {
                    const androidBuildOption = await vscode.window.showQuickPick(constants_1.ANDROID_BUILD_OPTIONS, { placeHolder: "Select Android build type" });
                    if (!androidBuildOption) {
                        vscode.window.showErrorMessage(constants_1.MESSAGES.NO_ANDROID_OPTION);
                        continue; // Skip to the next platform
                    }
                    if (androidBuildOption === "APK") {
                        const apkBuildType = await vscode.window.showQuickPick(constants_1.APK_BUILD_TYPES, { placeHolder: "Select APK build type" });
                        if (!apkBuildType) {
                            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_APK_BUILD_TYPE);
                            continue; // Skip to the next platform
                        }
                        buildCommand = apkBuildType === "Release"
                            ? "flutter build apk --release"
                            : "flutter build apk --debug";
                    }
                    else if (androidBuildOption === "App Bundle") {
                        buildCommand = "flutter build appbundle";
                    }
                }
                else if (platform === "iOS") {
                    buildCommand = "flutter build ios";
                }
                else if (platform === "Web") {
                    buildCommand = "flutter build web";
                }
                if (buildCommand) {
                    await (0, terminalUtils_1.runTerminalCommand)(buildCommand, workspaceFolder);
                    vscode.window.showInformationMessage(`Successfully built for ${platform}.`);
                }
            }
            catch (error) {
                vscode.window.showErrorMessage(`${constants_1.MESSAGES.FAILED_TO_BUILD} ${platform}: ${error.message}`);
            }
        }
    });
    context.subscriptions.push(flutterBuildWithOptions, flutterBuildApk, flutterBuildAppBundle, flutterBuildIos);
};
exports.registerBuildCommands = registerBuildCommands;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runTerminalCommand = exports.runTerminalCommandWithOutput = void 0;
const vscode = __importStar(__webpack_require__(2));
const runTerminalCommandWithOutput = async (command, cwd) => {
    const outputChannel = vscode.window.createOutputChannel("Flutter Doctor Output");
    outputChannel.show();
    return new Promise((resolve, reject) => {
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
exports.runTerminalCommandWithOutput = runTerminalCommandWithOutput;
const runTerminalCommand = async (command, cwd) => {
    return new Promise((resolve, reject) => {
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
exports.runTerminalCommand = runTerminalCommand;
// Helper function to run runTerminalCommandWithTimeout
const runTerminalCommandWithTimeout = (command, cwd) => {
    return new Promise((resolve, reject) => {
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


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWorkspaceFolder = void 0;
const vscode = __importStar(__webpack_require__(2));
const getWorkspaceFolder = () => {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceFolder) {
        vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
    }
    return workspaceFolder;
};
exports.getWorkspaceFolder = getWorkspaceFolder;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APK_BUILD_TYPES = exports.ANDROID_BUILD_OPTIONS = exports.PLATFORMS = exports.MESSAGES = exports.COMMANDS = void 0;
exports.COMMANDS = {
    FLUTTER_PUB_GET: "flutter-cli-shortcut.flutterPubGet",
    FLUTTER_PUB_UPGRADE: "flutter-cli-shortcut.flutterPubUpgrade",
    FLUTTER_BUILD_OPTIONS: "flutter-cli-shortcut.flutterBuildWithOptions",
    FLUTTER_BUILD_APK: "flutter-cli-shortcut.flutterBuildApk",
    FLUTTER_BUILD_IOS: "flutter-cli-shortcut.flutterBuildIos",
    FLUTTER_BUILD_APPBUNDLE: "flutter-cli-shortcut.flutterBuildAppBundle",
    FLUTTER_DETAILED_DOCTOR: "flutter-cli-shortcut.detailedFlutterDoctor",
    FLUTTER_PUB_UPGRADE_MAJOR_VERSION: "flutter-cli-shortcut.flutterPubUpgradeMajorVersions",
    FLUTTER_PUB_OUTDATED: "flutter-cli-shortcut.flutterPubOutdated",
    FLUTTER_PUB_CACHE_REPAIR: "flutter-cli-shortcut.flutterPubCacheRepair",
    FLUTTER_PUB_UPGRADE_DRYRUN: "flutter-cli-shortcut.flutterPubUpgradeDryRun",
    FLUTTER_PUB_DOWNGRADE: "flutter-cli-shortcut.flutterPubDowngrade",
    FLUTTER_PUB_VERSION: "flutter-cli-shortcut.flutterPubVersion",
    FLUTTER_PUB_ADD: "flutter-cli-shortcut.flutterPubAdd",
    FLUTTER_PUB_REMOVE: "flutter-cli-shortcut.flutterPubRemove",
    // POD
    POD_INSTALL: "flutter-cli-shortcut.podInstall",
    POD_INSTALL_REPO_UPDATE: "flutter-cli-shortcut.podInstallWithRepoUpdate",
    POD_UPDATE: "flutter-cli-shortcut.podUpdate",
    POD_REPO_UPDATE: "flutter-cli-shortcut.podRepoUpdate",
    // CREATE
    FLUTTER_CREATE: "flutter-cli-shortcut.flutterCreate",
    FLUTTER_CREATE_CODELYTICAL: "flutter-cli-shortcut.flutterCreateCodeLytical",
    FLUTTER_CREATE_CODELYTICAL_RIVERPOD: "flutter-cli-shortcut.flutterCreateCodeLyticalRiverpod",
    FLUTTER_CLEAN: "flutter-cli-shortcut.flutterClean",
    FLUTTER_TEST: "flutter-cli-shortcut.flutterTest",
    FLUTTER_ANALYZE: "flutter-cli-shortcut.flutterAnalyze",
    MANAGE_EMULATORS: "flutter-cli-shortcut.manageEmulators",
    FLUTTER_GENERATE_JSON_MODEL: "flutter-cli-shortcut.generateJsonModel",
    FLUTTER_CLEAN_REBUILD: "flutter-cli-shortcut.cleanRebuild",
    FLUTTER_GENERATE_UTILS: "flutter-cli-shortcut.generateUtils"
};
exports.MESSAGES = {
    NO_WORKSPACE: "No workspace folder found. Please open a Flutter project folder.",
    NO_IOS_WORKSPACE: "No ios directory found. Please check your Flutter project.",
    SUCCESSFUL_PUB_GET: "Successfully ran 'flutter pub get'.",
    SUCCESSFUL_PUB_UPGRADE: "Successfully ran 'flutter pub upgrade'.",
    NO_PLATFORMS_SELECTED: "No platforms selected. Build aborted.",
    ISSUES_FOUND: "Issues found: ",
    SUGGESTIONS: "Suggestions: ",
    NO_ISSUES: "All checks passed! No issues found.",
    FAILED_TO_BUILD: "Failed to build for ",
    NO_ANDROID_OPTION: "No Android build option selected. Build aborted.",
    NO_APK_BUILD_TYPE: "No APK build type selected. Build aborted.",
    COMMAND_EXECUTED: "Command executed, check the terminal output.",
    RUNNING_FLUTTER_DOCTOR: "Running 'flutter doctor'...",
};
exports.PLATFORMS = ["Android", "iOS", "Web"];
exports.ANDROID_BUILD_OPTIONS = ["APK", "App Bundle"];
exports.APK_BUILD_TYPES = ["Debug", "Release"];


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerDoctorCommand = void 0;
const vscode = __importStar(__webpack_require__(2));
const terminalUtils_1 = __webpack_require__(3);
const workspaceUtils_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
const registerDoctorCommand = (context) => {
    const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
    let flutterDetailedDoctor = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_DETAILED_DOCTOR, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            const output = await (0, terminalUtils_1.runTerminalCommandWithOutput)("flutter doctor", workspaceFolder);
            analyzeDoctorOutput(output);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter doctor': ${error.message}`);
        }
    });
    context.subscriptions.push(flutterDetailedDoctor);
};
exports.registerDoctorCommand = registerDoctorCommand;
// Function to analyze output from 'flutter doctor' and suggest resolutions
const analyzeDoctorOutput = (output) => {
    const lines = output.split('\n');
    let issues = [];
    let suggestions = [];
    for (const line of lines) {
        if (line.includes("✗")) {
            issues.push(line);
            if (line.includes("Android")) {
                suggestions.push("Make sure you have the latest Android SDK installed.");
            }
            else if (line.includes("Xcode")) {
                suggestions.push("Ensure Xcode is installed and updated.");
            }
            else if (line.includes("Flutter SDK")) {
                suggestions.push("Check your Flutter SDK path and version.");
            }
        }
    }
    if (issues.length > 0) {
        vscode.window.showInformationMessage("Issues found: " + issues.join(", "));
        vscode.window.showInformationMessage("Suggestions: " + suggestions.join(", "));
    }
    else {
        vscode.window.showInformationMessage("All checks passed! No issues found.");
    }
};


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerPubCommands = void 0;
const vscode = __importStar(__webpack_require__(2));
const terminalUtils_1 = __webpack_require__(3);
const workspaceUtils_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
const registerPubCommands = (context) => {
    const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
    // Flutter commands
    let flutterPubGet = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_GET, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter pub get", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub get'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub get': ${error.message}`);
        }
    });
    let flutterPubUpgrade = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_UPGRADE, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter pub upgrade", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub upgrade'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub upgrade': ${error.message}`);
        }
    });
    let flutterPubUpgradeMajorVersions = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_UPGRADE_MAJOR_VERSION, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter pub upgrade --major-versions", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub upgrade --major-versions'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub upgrade --major-versions': ${error.message}`);
        }
    });
    let flutterPubOutdated = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_OUTDATED, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter pub outdated", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub outdated'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub outdated': ${error.message}`);
        }
    });
    let flutterPubCacheRepair = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_CACHE_REPAIR, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter pub cache repair", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub cache repair'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub cache repair': ${error.message}`);
        }
    });
    let flutterPubUpgradeDryRun = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_UPGRADE_DRYRUN, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter pub upgrade --dry-run", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub upgrade --dry-run'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub upgrade --dry-run': ${error.message}`);
        }
    });
    let flutterPubDowngrade = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_DOWNGRADE, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter pub downgrade", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub downgrade'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub downgrade': ${error.message}`);
        }
    });
    let flutterPubVersion = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_VERSION, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter --version && flutter pub version", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter --version && flutter pub version'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter --version && flutter pub version': ${error.message}`);
        }
    });
    let flutterPubAdd = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_ADD, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
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
            await (0, terminalUtils_1.runTerminalCommand)(`flutter pub add ${packageName}`, workspaceFolder);
            vscode.window.showInformationMessage(`Successfully ran flutter pub add ${packageName}.`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run flutter pub add ${packageName}: ${error.message}`);
        }
    });
    let flutterPubRemove = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_PUB_REMOVE, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
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
            await (0, terminalUtils_1.runTerminalCommand)(`flutter pub remove ${packageName}`, workspaceFolder);
            vscode.window.showInformationMessage(`Successfully ran flutter pub remove ${packageName}.`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run flutter pub remove ${packageName}: ${error.message}`);
        }
    });
    context.subscriptions.push(flutterPubGet, flutterPubUpgrade, flutterPubAdd, flutterPubCacheRepair, flutterPubDowngrade, flutterPubOutdated, flutterPubRemove, flutterPubUpgradeDryRun, flutterPubUpgradeMajorVersions, flutterPubVersion);
};
exports.registerPubCommands = registerPubCommands;


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerPodCommands = void 0;
const vscode = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(9));
const terminalUtils_1 = __webpack_require__(3);
const workspaceUtils_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
const registerPodCommands = (context) => {
    const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
    let podInstall = vscode.commands.registerCommand(constants_1.COMMANDS.POD_INSTALL, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        const iosPath = path.join(workspaceFolder, "ios");
        const podfilePath = path.join(iosPath, "Podfile");
        // Check if ios directory and Podfile exist
        try {
            const iosStat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
            if (iosStat.type !== vscode.FileType.Directory) {
                vscode.window.showErrorMessage(constants_1.MESSAGES.NO_IOS_WORKSPACE);
                return;
            }
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                // Podfile exists, so just install
                try {
                    await (0, terminalUtils_1.runTerminalCommand)("cd ios && pod install", workspaceFolder);
                    vscode.window.showInformationMessage("Pods installed successfully!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
            catch {
                // Podfile doesn't exist, initialize pods first
                try {
                    await (0, terminalUtils_1.runTerminalCommand)("cd ios && pod init && pod install", workspaceFolder);
                    vscode.window.showInformationMessage("Pods initialized and installed!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
        }
        catch {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_IOS_WORKSPACE);
        }
    });
    let podInstallWithRepoUpdate = vscode.commands.registerCommand(constants_1.COMMANDS.POD_INSTALL_REPO_UPDATE, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        const iosPath = path.join(workspaceFolder, "ios");
        const podfilePath = path.join(iosPath, "Podfile");
        // Check if ios directory and Podfile exist
        try {
            const iosStat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
            if (iosStat.type !== vscode.FileType.Directory) {
                vscode.window.showErrorMessage(constants_1.MESSAGES.NO_IOS_WORKSPACE);
                return;
            }
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                // Podfile exists, so just install with repo update
                try {
                    await (0, terminalUtils_1.runTerminalCommand)("cd ios && pod install --repo-update", workspaceFolder);
                    vscode.window.showInformationMessage("Pods installed with repo update!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
            catch {
                // Podfile doesn't exist, initialize pods first
                try {
                    await (0, terminalUtils_1.runTerminalCommand)("cd ios && pod init && pod install --repo-update", workspaceFolder);
                    vscode.window.showInformationMessage("Pods initialized and installed with repo update!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
        }
        catch {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_IOS_WORKSPACE);
        }
    });
    let podUpdate = vscode.commands.registerCommand(constants_1.COMMANDS.POD_UPDATE, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        const iosPath = path.join(workspaceFolder, "ios");
        const podfilePath = path.join(iosPath, "Podfile");
        // Check if ios directory and Podfile exist
        try {
            const iosStat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
            if (iosStat.type !== vscode.FileType.Directory) {
                vscode.window.showErrorMessage(constants_1.MESSAGES.NO_IOS_WORKSPACE);
                return;
            }
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                // Podfile exists, so just update pods
                try {
                    await (0, terminalUtils_1.runTerminalCommand)("cd ios && pod update", workspaceFolder);
                    vscode.window.showInformationMessage("Pods updated successfully!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
            catch {
                // Podfile doesn't exist, initialize pods first
                try {
                    await (0, terminalUtils_1.runTerminalCommand)("cd ios && pod init && pod update", workspaceFolder);
                    vscode.window.showInformationMessage("Pods initialized and updated!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
        }
        catch {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_IOS_WORKSPACE);
        }
    });
    let podRepoUpdate = vscode.commands.registerCommand(constants_1.COMMANDS.POD_REPO_UPDATE, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        const iosPath = path.join(workspaceFolder, "ios");
        const podfilePath = path.join(iosPath, "Podfile");
        // Check if ios directory and Podfile exist
        try {
            const iosStat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
            if (iosStat.type !== vscode.FileType.Directory) {
                vscode.window.showErrorMessage(constants_1.MESSAGES.NO_IOS_WORKSPACE);
                return;
            }
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                // Podfile exists, so just run the repo update
                try {
                    await (0, terminalUtils_1.runTerminalCommand)("cd ios && pod repo update", workspaceFolder);
                    vscode.window.showInformationMessage("Repo updated successfully!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
            catch {
                // Podfile doesn't exist, initialize pods first
                try {
                    await (0, terminalUtils_1.runTerminalCommand)("cd ios && pod init && pod repo update", workspaceFolder);
                    vscode.window.showInformationMessage("Repo initialized and updated!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
        }
        catch {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_IOS_WORKSPACE);
        }
    });
    context.subscriptions.push(podInstall, podInstallWithRepoUpdate, podUpdate, podRepoUpdate);
};
exports.registerPodCommands = registerPodCommands;


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerFlutterCommands = void 0;
const vscode = __importStar(__webpack_require__(2));
const terminalUtils_1 = __webpack_require__(3);
const workspaceUtils_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
const registerFlutterCommands = (context) => {
    const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
    let flutterClean = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_CLEAN, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter clean", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter clean'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter clean': ${error.message}`);
        }
    });
    let flutterTest = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_TEST, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter test", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter test'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter test': ${error.message}`);
        }
    });
    let flutterAnalyze = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_ANALYZE, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter analyze", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter analyze'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter analyze': ${error.message}`);
        }
    });
    // Clean and rebuild command
    let cleanAndRebuild = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_CLEAN_REBUILD, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)("flutter clean && flutter pub get", workspaceFolder);
            vscode.window.showInformationMessage("Successfully cleaned and rebuilt the project.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to clean and rebuild: ${error.message}`);
        }
    });
    context.subscriptions.push(flutterClean, flutterTest, flutterAnalyze, cleanAndRebuild);
};
exports.registerFlutterCommands = registerFlutterCommands;


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCreateCommands = void 0;
const vscode = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(9));
const fs = __importStar(__webpack_require__(12));
const terminalUtils_1 = __webpack_require__(3);
const workspaceUtils_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
const registerCreateCommands = (context) => {
    const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
    let flutterCreate = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_CREATE, async () => {
        const projectName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new Flutter project (e.g., methodist_ndwom)",
            placeHolder: "e.g., methodist_ndwom",
        });
        if (!projectName) {
            vscode.window.showErrorMessage("Project name is required.");
            return;
        }
        const organization = await vscode.window.showInputBox({
            prompt: "Enter the organization identifier (e.g., com.codelytical)",
            placeHolder: "e.g., com.codelytical",
        });
        if (!organization) {
            vscode.window.showErrorMessage("Organization identifier is required.");
            return;
        }
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            await (0, terminalUtils_1.runTerminalCommand)(`flutter create --org ${organization} ${projectName}`, workspaceFolder);
            vscode.window.showInformationMessage(`Successfully ran flutter create --org ${organization} ${projectName}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run flutter create--org ${organization} ${projectName}: ${error.message}`);
        }
    });
    let flutterCreateCodeLytical = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_CREATE_CODELYTICAL, async () => {
        const projectName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new Flutter project (e.g., methodist_ndwom)",
            placeHolder: "e.g., methodist_ndwom",
        });
        if (!projectName) {
            vscode.window.showErrorMessage("Project name is required.");
            return;
        }
        const organization = await vscode.window.showInputBox({
            prompt: "Enter the organization identifier (e.g., com.codelytical)",
            placeHolder: "e.g., com.codelytical",
        });
        if (!organization) {
            vscode.window.showErrorMessage("Organization identifier is required.");
            return;
        }
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        // Create the Flutter project
        try {
            await runTerminalCommandWithTimeout(`flutter create --org ${organization} ${projectName}`, workspaceFolder);
            // Define the project structure
            const projectPath = path.join(workspaceFolder, projectName);
            const folders = [
                "app/routes",
                "app/theme",
                "mixins",
                "services/local",
                "services/network",
                "utils",
                "controllers/sample",
                "models",
                "ui/screens",
                "ui/widgets",
            ];
            // Create the folder structure
            folders.forEach((folder) => {
                const dirPath = path.join(projectPath, "lib", folder);
                fs.mkdirSync(dirPath, { recursive: true });
            });
            // Populate main.dart
            const mainFile = path.join(projectPath, "lib", "main.dart");
            fs.writeFileSync(mainFile, `import 'app/launcher.dart' as launcher;\n\nvoid main() {\n  launcher.main();\n}\n`);
            // Create additional files
            await createProjectFiles(projectPath, projectName);
            // Add provider dependency using flutter pub add
            await runTerminalCommandWithTimeout(`flutter pub add provider`, projectPath);
            // Remove the default test file
            const defaultTestFile = path.join(projectPath, "test", "widget_test.dart");
            if (fs.existsSync(defaultTestFile)) {
                fs.unlinkSync(defaultTestFile);
            }
            // Add custom test for SampleController
            const sampleControllerTestFile = path.join(projectPath, "test", "sample_controller_test.dart");
            fs.writeFileSync(sampleControllerTestFile, getSampleControllerTestTemplate(projectName));
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to create project: ${error.message}`);
            return;
        }
    });
    let flutterCreateCodeLyticalRiverpod = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_CREATE_CODELYTICAL_RIVERPOD, async () => {
        const projectName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new Flutter project (e.g., methodist_ndwom)",
            placeHolder: "e.g., methodist_ndwom",
        });
        if (!projectName) {
            vscode.window.showErrorMessage("Project name is required.");
            return;
        }
        const organization = await vscode.window.showInputBox({
            prompt: "Enter the organization identifier (e.g., com.codelytical)",
            placeHolder: "e.g., com.codelytical",
        });
        if (!organization) {
            vscode.window.showErrorMessage("Organization identifier is required.");
            return;
        }
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        // Create the Flutter project
        try {
            await runTerminalCommandWithTimeout(`flutter create --org ${organization} ${projectName}`, workspaceFolder);
            // Define the project structure
            const projectPath = path.join(workspaceFolder, projectName);
            const folders = [
                "core",
                "core/router",
                "core/theme",
                "features/home",
                "features/home/view",
                "features/home/viewmodel",
                "features/home/model",
                "services/local",
                "services/network",
            ];
            // Create the folder structure
            folders.forEach((folder) => {
                const dirPath = path.join(projectPath, "lib", folder);
                fs.mkdirSync(dirPath, { recursive: true });
            });
            // Populate main.dart
            const mainFile = path.join(projectPath, "lib", "main.dart");
            fs.writeFileSync(mainFile, `import 'package:flutter/material.dart';\nimport 'package:flutter_riverpod/flutter_riverpod.dart';\nimport 'core/router/app_router.dart';\n\nvoid main() {\n  runApp(const ProviderScope(child: MyApp()));\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n @override\n  Widget build(BuildContext context) {\n    return MaterialApp.router(\n      title: 'Flutter Demo',\n      theme: ThemeData(\n        primarySwatch: Colors.blue,\n      ),\n      routerConfig: AppRouter.router,\n    );\n  }\n}\n`);
            // Create additional files
            await createRiverPodProjectFiles(projectPath, projectName);
            // Add riverpod and go_router dependencies using flutter pub add
            await runTerminalCommandWithTimeout(`flutter pub add flutter_riverpod go_router`, projectPath);
            // Remove the default test file
            const defaultTestFile = path.join(projectPath, "test", "widget_test.dart");
            if (fs.existsSync(defaultTestFile)) {
                fs.unlinkSync(defaultTestFile); // Delete the default widget_test.dart
            }
            // Add custom test for HomeViewModel
            const homeViewModelTestFile = path.join(projectPath, "test", "home_viewmodel_test.dart");
            fs.writeFileSync(homeViewModelTestFile, getHomeViewModelTestTemplate(projectName));
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to create project: ${error.message}`);
            return;
        }
    });
    // Helper function to create necessary project files
    const createRiverPodProjectFiles = async (projectPath, projectName) => {
        const appClassName = projectName
            .replace(/_/g, " ")
            .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1))
            .replace(/\s/g, "");
        // Create core/router/app_router.dart
        const appRouterFile = path.join(projectPath, "lib", "core", "router", "app_router.dart");
        fs.writeFileSync(appRouterFile, `import 'package:go_router/go_router.dart';\nimport '../../features/home/view/home_view.dart';\n\nclass AppRouter {\n  static final router = GoRouter(\n    routes: [\n      GoRoute(\n        path: '/',\n        builder: (context, state) => const HomeView(),\n      ),\n    ],\n  );\n}\n`);
        // Create features/home/view/home_view.dart
        const homeViewFile = path.join(projectPath, "lib", "features", "home", "view", "home_view.dart");
        fs.writeFileSync(homeViewFile, `import 'package:flutter/material.dart';\nimport 'package:flutter_riverpod/flutter_riverpod.dart';\nimport '../viewmodel/home_viewmodel.dart';\n\nclass HomeView extends ConsumerWidget {\n  const HomeView({super.key});\n\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final viewModel = ref.watch(homeViewModelProvider);\n\n    return Scaffold(\n      appBar: AppBar(\n        title: const Text('Home View'),\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            Text(viewModel.message, style: const TextStyle(fontSize: 20)),\n            const SizedBox(height: 20),\n            Padding(\n              padding: const EdgeInsets.symmetric(horizontal: 50.0),\n              child: TextField(\n                controller: viewModel.textController,\n                decoration: const InputDecoration(\n                  border: OutlineInputBorder(),\n                  labelText: 'Enter new message',\n                ),\n              ),\n            ),\n            const SizedBox(height: 20),\n            ElevatedButton(\n              onPressed: () {\n                if (viewModel.textController.text.isNotEmpty) {\n                  viewModel.updateMessage(viewModel.textController.text);\n                  viewModel.textController.clear(); // Clear the TextField after updating\n                }\n              },\n              child: const Text('Update Message'),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}\n`);
        // Create features/home/viewmodel/home_viewmodel.dart
        const homeViewModelFile = path.join(projectPath, "lib", "features", "home", "viewmodel", "home_viewmodel.dart");
        fs.writeFileSync(homeViewModelFile, `import 'package:flutter/material.dart';\nimport 'package:flutter_riverpod/flutter_riverpod.dart';\n\nclass HomeViewModel extends ChangeNotifier {\n  final TextEditingController textController = TextEditingController();\n  String _message = 'Hello, Riverpod!';\n\n  String get message => _message;\n\n  void updateMessage(String newMessage) {\n    _message = newMessage;\n    notifyListeners();\n  }\n}\n\nfinal homeViewModelProvider = ChangeNotifierProvider((ref) => HomeViewModel());\n`);
        // Create features/home/model/sample_model.dart
        const sampleModelFile = path.join(projectPath, "lib", "features", "home", "model", "sample_model.dart");
        fs.writeFileSync(sampleModelFile, `class SampleModel {\n  final String message;\n  SampleModel(this.message);\n}\n`);
    };
    // Helper function to create HomeViewModel test
    const getHomeViewModelTestTemplate = (projectName) => {
        return (`import 'package:flutter_test/flutter_test.dart';\n` +
            `import 'package:${projectName}/features/home/viewmodel/home_viewmodel.dart';\n\n` +
            `void main() {\n` +
            `  group('HomeViewModel', () {\n` +
            `    test('initial message should be correct', () {\n` +
            `      // Arrange\n` +
            `      final viewModel = HomeViewModel();\n\n` +
            `      // Act\n` +
            `      final message = viewModel.message;\n\n` +
            `      // Assert\n` +
            `      expect(message, 'Hello, Riverpod!');\n` +
            `    });\n\n` +
            `    test('updateMessage should update the message and notify listeners', () {\n` +
            `      // Arrange\n` +
            `      final viewModel = HomeViewModel();\n` +
            `      String? updatedMessage;\n\n` +
            `      // Add a listener to check for notification\n` +
            `      viewModel.addListener(() {\n` +
            `        updatedMessage = viewModel.message;\n` +
            `      });\n\n` +
            `      // Act\n` +
            `      viewModel.updateMessage('New message from Riverpod');\n\n` +
            `      // Assert\n` +
            `      expect(updatedMessage, 'New message from Riverpod');\n` +
            `    });\n` +
            `  });\n` +
            `}\n`);
    };
    // Helper function to create necessary project files
    const createProjectFiles = async (projectPath, projectName) => {
        const appClassName = projectName
            .replace(/_/g, " ")
            .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1))
            .replace(/\s/g, "");
        const launcherFile = path.join(projectPath, "lib", "app", "launcher.dart");
        fs.writeFileSync(launcherFile, `import 'package:flutter/material.dart';\nimport 'package:provider/provider.dart';\nimport 'provider_registry.dart';\nimport 'app.dart';\n\nvoid main() async {\n  WidgetsFlutterBinding.ensureInitialized();\n  runApp(\n    MultiProvider(\n      providers: ProviderRegistry.registeredProviders,\n      child: const ${appClassName}(),\n    ),\n  );\n}\n`);
        const appFile = path.join(projectPath, "lib", "app", "app.dart");
        fs.writeFileSync(appFile, `import 'package:flutter/material.dart';\nimport 'package:flutter/services.dart';\nimport 'codelytical_context_helper.dart';\nimport '../ui/screens/welcome_screen.dart';\n\nclass ${appClassName} extends StatelessWidget {\n  const ${appClassName}({super.key});\n  @override\n  Widget build(BuildContext context) {\n    var isDark = MediaQuery.of(context).platformBrightness == Brightness.dark;\n    return AnnotatedRegion<SystemUiOverlayStyle>(\n      value: SystemUiOverlayStyle(\n          statusBarBrightness: !isDark ? Brightness.light : Brightness.dark,\n          statusBarColor: Colors.transparent,\n          statusBarIconBrightness: isDark ? Brightness.light : Brightness.dark),\n      child: MaterialApp(\n          navigatorKey: CodeLyticalContextHelper.mainNavigatorKey,\n          debugShowCheckedModeBanner: false,\n          title: "CodeLytical Sample",\n          themeMode: ThemeMode.light,\n          home: const WelcomeScreen(),\n      ),\n    );\n  }\n}\n`);
        // Create app/provider_registry.dart
        const providersFile = path.join(projectPath, "lib", "app", "provider_registry.dart");
        fs.writeFileSync(providersFile, `import 'package:provider/provider.dart';\nimport 'package:provider/single_child_widget.dart';\nimport 'provider_registry_export.dart';\n\nclass ProviderRegistry {\n  static List<SingleChildWidget> get registeredProviders => [\n    ChangeNotifierProvider(create: (_) => SampleController()),\n    // Add more providers here as needed\n  ];\n}\n`);
        // Create app/provider_registry_export.dart
        const providersExportFile = path.join(projectPath, "lib", "app", "provider_registry_export.dart");
        fs.writeFileSync(providersExportFile, `// Exports for your controllers\nexport '../controllers/sample/sample_controller.dart';\n`);
        // Create controllers/sample/sample_controller.dart
        const sampleControllerFile = path.join(projectPath, "lib", "controllers", "sample", "sample_controller.dart");
        fs.writeFileSync(sampleControllerFile, `import 'package:flutter/material.dart';\n\nclass SampleController extends ChangeNotifier {\n  String _message = 'CodeLytical is a YouTube channel';\n\n  String get message => _message;\n\n  void updateMessage(String newMessage) {\n    _message = newMessage;\n    notifyListeners();\n  }\n}\n`);
        // Create ui/screens/welcome_screen.dart
        const welcomeScreenFile = path.join(projectPath, "lib", "ui", "screens", "welcome_screen.dart");
        fs.writeFileSync(welcomeScreenFile, `import 'package:flutter/material.dart';\nimport 'package:provider/provider.dart';\nimport '../../app/provider_registry_export.dart';\n\nclass WelcomeScreen extends StatelessWidget {\n  const WelcomeScreen({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    final sampleController = context.watch<SampleController>();\n    final TextEditingController textController = TextEditingController();\n\n    return Scaffold(\n      appBar: AppBar(\n        title: const Text('Welcome Screen'),\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            Text(sampleController.message,\n                style: const TextStyle(fontSize: 20)),\n            const SizedBox(height: 20),\n            Padding(\n              padding: const EdgeInsets.symmetric(horizontal: 50.0),\n              child: TextField(\n                controller: textController,\n                decoration: const InputDecoration(\n                  border: OutlineInputBorder(),\n                  labelText: 'Enter new message',\n                ),\n              ),\n            ),\n            const SizedBox(height: 20),\n            ElevatedButton(\n              onPressed: () {\n                if (textController.text.isNotEmpty) {\n                  sampleController.updateMessage(textController.text);\n                  textController.clear(); // Clear the TextField after updating\n                }\n              },\n              child: const Text('Update Message'),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}\n`);
        // Create app/codelytical_context_helper.dart
        const contextHelperFile = path.join(projectPath, "lib", "app", "codelytical_context_helper.dart");
        fs.writeFileSync(contextHelperFile, `import 'package:flutter/material.dart';\n\nclass CodeLyticalContextHelper {\n  CodeLyticalContextHelper._();  // Private constructor to prevent instantiation\n\n  static final GlobalKey<NavigatorState> mainNavigatorKey = GlobalKey<NavigatorState>();\n\n  static BuildContext get currentBuildContext {\n    final context = mainNavigatorKey.currentContext;\n    if (context == null) {\n      throw StateError("Navigator key is not associated with any context.");\n    }\n    return context;\n  }\n}\n`);
    };
    // Helper function to create sample controller test
    const getSampleControllerTestTemplate = (projectName) => {
        return (`import 'package:${projectName}/controllers/sample/sample_controller.dart';\n` +
            `import 'package:flutter_test/flutter_test.dart';\n\n` +
            `void main() {\n` +
            `  group('SampleController', () {\n` +
            `    test('initial message should be correct', () {\n` +
            `      // Arrange\n` +
            `      final controller = SampleController();\n\n` +
            `      // Act\n` +
            `      final message = controller.message;\n\n` +
            `      // Assert\n` +
            `      expect(message, 'CodeLytical is a YouTube channel');\n` +
            `    });\n\n` +
            `    test('updateMessage should update the message and notify listeners', () {\n` +
            `      // Arrange\n` +
            `      final controller = SampleController();\n` +
            `      String? updatedMessage;\n\n` +
            `      // Add a listener to check for notification\n` +
            `      controller.addListener(() {\n` +
            `        updatedMessage = controller.message;\n` +
            `      });\n\n` +
            `      // Act\n` +
            `      controller.updateMessage('New message from CodeLytical');\n\n` +
            `      // Assert\n` +
            `      expect(updatedMessage, 'New message from CodeLytical');\n` +
            `      expect(controller.message, 'New message from CodeLytical');\n` +
            `    });\n` +
            `  });\n` +
            `}\n`);
    };
    context.subscriptions.push(flutterCreate, flutterCreateCodeLytical, flutterCreateCodeLyticalRiverpod);
};
exports.registerCreateCommands = registerCreateCommands;
function runTerminalCommandWithTimeout(arg0, workspaceFolder) {
    throw new Error("Function not implemented.");
}


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerDeviceManagementCommands = exports.runTerminalCommandInVSCodeTerminal = void 0;
const vscode = __importStar(__webpack_require__(2));
const workspaceUtils_1 = __webpack_require__(4);
const child_process_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
const execAsync = (0, util_1.promisify)(child_process_1.exec);
// Execute Flutter command with zsh
const executeFlutterCommand = async (command) => {
    try {
        // Execute command through zsh
        const { stdout } = await execAsync(`/bin/zsh -i -c "${command}"`, {
            env: process.env,
            shell: "/bin/zsh",
        });
        return stdout;
    }
    catch (error) {
        console.error(`Error executing Flutter command: ${error.message}`);
        throw error;
    }
};
// Function to get available emulators
const getEmulators = async () => {
    try {
        const stdout = await executeFlutterCommand("flutter emulators");
        const lines = stdout.split("\n");
        const emulators = [];
        lines.forEach((line) => {
            if (line.includes("•")) {
                const name = line.trim();
                if (name) {
                    emulators.push(name);
                }
            }
        });
        return emulators;
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error getting emulators: ${error}`);
        return [];
    }
};
// Function to get connected devices with better parsing
const getDevices = async () => {
    try {
        const stdout = await executeFlutterCommand("flutter devices");
        console.log("Raw devices output:", stdout); // Debug logging
        const lines = stdout.split("\n");
        const devices = [];
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
                const isEmulator = deviceId.includes("emulator") ||
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
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error getting devices: ${error}`);
        return [];
    }
};
// Command to run a terminal command using VSCode's terminal
const runTerminalCommandInVSCodeTerminal = (command, cwd) => {
    const terminal = vscode.window.createTerminal({
        name: `Flutter: ${command}`,
        cwd,
        shellPath: "/bin/zsh",
    });
    terminal.show();
    terminal.sendText(command);
};
exports.runTerminalCommandInVSCodeTerminal = runTerminalCommandInVSCodeTerminal;
// Register the commands for starting and stopping emulators
const registerDeviceManagementCommands = (context) => {
    // Command to list devices (physical devices + running emulators)
    let startEmulatorCommand = vscode.commands.registerCommand("flutter-cli-shortcut.startEmulator", async () => {
        const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Workspace folder not found.");
            return;
        }
        try {
            // Show loading message while fetching emulators
            const emulators = await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Fetching available emulators...",
                cancellable: false,
            }, async () => {
                return await getEmulators();
            });
            if (emulators.length === 0) {
                vscode.window.showInformationMessage("No emulators found.");
                return;
            }
            const selectedEmulator = await vscode.window.showQuickPick(emulators, {
                placeHolder: "Select an emulator to start",
            });
            if (selectedEmulator) {
                const emulatorId = selectedEmulator.split("•")[0].trim();
                (0, exports.runTerminalCommandInVSCodeTerminal)(`flutter emulators --launch ${emulatorId}`, workspaceFolder);
                vscode.window.showInformationMessage(`Starting emulator: ${selectedEmulator}`);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(error.message);
        }
    });
    let listDevicesCommand = vscode.commands.registerCommand("flutter-cli-shortcut.listDevices", async () => {
        const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Workspace folder not found.");
            return;
        }
        try {
            // Show loading message while fetching devices
            const devices = await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Fetching connected devices...",
                cancellable: false,
            }, async () => {
                return await getDevices();
            });
            if (devices.length === 0) {
                vscode.window.showInformationMessage("No devices found.");
                return;
            }
            const deviceItems = devices.map((device) => ({
                label: device.name,
                description: device.id,
                detail: `Platform: ${device.platform} ${device.isEmulator ? "(Emulator)" : ""}`,
            }));
            const selectedDevice = await vscode.window.showQuickPick(deviceItems, {
                placeHolder: "Select a device to view details",
            });
            if (selectedDevice) {
                vscode.window.showInformationMessage(`Selected device: ${selectedDevice.label} (${selectedDevice.description})`);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error getting devices: ${error}`);
        }
    });
    // Command to stop a running emulator
    let stopDeviceCommand = vscode.commands.registerCommand("flutter-cli-shortcut.stopDevice", async () => {
        const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Workspace folder not found.");
            return;
        }
        try {
            const devices = await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Fetching running emulators...",
                cancellable: false,
            }, async () => {
                return await getDevices();
            });
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
            const selectedEmulator = await vscode.window.showQuickPick(emulatorItems, {
                placeHolder: "Select an emulator to stop",
            });
            if (selectedEmulator) {
                // Use the emulator ID for the adb command
                (0, exports.runTerminalCommandInVSCodeTerminal)(`adb -s ${selectedEmulator.description} emu kill`, workspaceFolder);
                vscode.window.showInformationMessage(`Stopping emulator: ${selectedEmulator.label}`);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error stopping emulator: ${error}`);
        }
    });
    // Register all the commands
    context.subscriptions.push(listDevicesCommand);
    context.subscriptions.push(startEmulatorCommand);
    context.subscriptions.push(stopDeviceCommand);
};
exports.registerDeviceManagementCommands = registerDeviceManagementCommands;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("util");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerComplexCommands = void 0;
const vscode = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(9));
const workspaceUtils_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
// Helper function to convert snake_case to PascalCase
const toPascalCase = (str) => {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
};
// Helper function to convert class name to snake_case file name
const classNameToFileName = (className) => {
    const fileName = className
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toLowerCase();
    return `${fileName}.dart`;
};
// Helper function to convert snake_case to camelCase
const toCamelCase = (str) => {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};
// Helper function to generate model property with dynamic handling
const generateModelProperty = (key, value) => {
    let type = 'dynamic'; // Default is dynamic
    if (typeof value === 'string')
        type = 'String';
    else if (typeof value === 'number') {
        type = Number.isInteger(value) ? 'int' : 'double';
    }
    else if (typeof value === 'boolean')
        type = 'bool';
    else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
            type = `List<${toPascalCase(key.slice(0, -1))}Model>`;
        }
        else {
            type = 'List<dynamic>';
        }
    }
    else if (typeof value === 'object' && value !== null) {
        type = `${toPascalCase(key)}Model`;
    }
    const camelCaseKey = toCamelCase(key);
    // For dynamic types, no nullability is needed, so omit the ?
    return type === 'dynamic'
        ? `  final ${type} ${camelCaseKey};`
        : `  final ${type}? ${camelCaseKey};`;
};
// Helper function to generate fromJson method with null checks
const generateFromJson = (className, json) => {
    let fromJsonContent = `  factory ${className}.fromJson(Map<String, dynamic> json) {\n    return ${className}(\n`;
    for (const [key, value] of Object.entries(json)) {
        const camelCaseKey = toCamelCase(key);
        // Check if the type is dynamic (no null checks for dynamic types)
        if (typeof value === 'string') {
            fromJsonContent += `      ${camelCaseKey}: json['${key}'] ?? "",\n`;
        }
        else if (typeof value === 'number') {
            fromJsonContent += `      ${camelCaseKey}: json['${key}'] ?? ${Number.isInteger(value) ? 0 : 0.0},\n`;
        }
        else if (typeof value === 'boolean') {
            fromJsonContent += `      ${camelCaseKey}: json['${key}'] ?? false,\n`;
        }
        else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            const subClassName = `${toPascalCase(key.slice(0, -1))}Model`;
            fromJsonContent += `      ${camelCaseKey}: json.containsKey('${key}') && json['${key}'] != null\n` +
                `          ? List<${subClassName}>.from(json['${key}'].map((x) => ${subClassName}.fromJson(x as Map<String, dynamic>)))\n` +
                `          : [],\n`;
        }
        else if (typeof value === 'object' && value !== null) {
            const subClassName = `${toPascalCase(key)}Model`;
            fromJsonContent += `      ${camelCaseKey}: ${subClassName}.fromJson(json['${key}'] ?? {}),\n`;
        }
        else if (typeof value === 'object' || typeof value === 'undefined') {
            fromJsonContent += `      ${camelCaseKey}: json['${key}'],\n`; // No null check for dynamic
        }
    }
    fromJsonContent += '    );\n  }';
    return fromJsonContent;
};
// Helper function to generate nested models
const generateNestedModels = (json) => {
    const models = [];
    for (const [key, value] of Object.entries(json)) {
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            const className = `${toPascalCase(key.slice(0, -1))}Model`;
            models.push(generateModel(className, value[0]));
        }
        else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const className = `${toPascalCase(key)}Model`;
            models.push(generateModel(className, value));
        }
    }
    return models;
};
// Helper function to generate complete model
const generateModel = (className, json) => {
    let modelContent = `class ${className} {\n`;
    // Properties
    for (const [key, value] of Object.entries(json)) {
        modelContent += generateModelProperty(key, value) + '\n';
    }
    // Constructor - Fixed to use actual class name instead of string interpolation
    modelContent += `\n  ${className}({\n`; // Remove the $ and {}
    for (const key of Object.keys(json)) {
        const camelCaseKey = toCamelCase(key);
        modelContent += `    this.${camelCaseKey},\n`;
    }
    modelContent += '  });\n\n';
    // FromJson method
    modelContent += generateFromJson(className, json) + '\n\n';
    // ToJson method
    modelContent += '  Map<String, dynamic> toJson() => {\n';
    for (const [key, value] of Object.entries(json)) {
        const camelCaseKey = toCamelCase(key);
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            modelContent += `        '${key}': ${camelCaseKey}?.map((x) => x.toJson()).toList(),\n`;
        }
        else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            modelContent += `        '${key}': ${camelCaseKey}?.toJson(),\n`;
        }
        else {
            modelContent += `        '${key}': ${camelCaseKey},\n`;
        }
    }
    modelContent += '      };\n';
    modelContent += '}\n';
    return modelContent;
};
// Helper function to find models directory
const findModelsDirectory = async (workspaceFolder) => {
    const possiblePaths = [
        'lib/models',
        'lib/model',
        'lib/src/models',
        'lib/src/model',
        'lib/core/models',
        'lib/core/model',
        'lib/data/models',
        'lib/data/model',
    ];
    for (const relativePath of possiblePaths) {
        const fullPath = path.join(workspaceFolder, relativePath);
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(fullPath));
            return fullPath;
        }
        catch (error) {
            // Directory doesn't exist, continue checking
        }
    }
    return null;
};
const registerComplexCommands = (context) => {
    const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
    // Generate JSON serialization code command
    let generateJsonModel = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_GENERATE_JSON_MODEL, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            // Show input box for JSON
            const jsonInput = await vscode.window.showInputBox({
                prompt: "Paste your JSON structure",
                placeHolder: '{"key": "value"}',
                ignoreFocusOut: true
            });
            if (!jsonInput)
                return;
            let jsonObject;
            try {
                jsonObject = JSON.parse(jsonInput);
            }
            catch (parseError) {
                vscode.window.showErrorMessage('Invalid JSON format. Please check your input.');
                return;
            }
            // Get class name from user
            const className = await vscode.window.showInputBox({
                prompt: "Enter the main class name (e.g., CodeLyticalResponse, CodeLytical, Payment)",
                placeHolder: 'e.g., CodeLyticalResponse, CodeLytical, Payment, BillPayment etc',
                validateInput: (value) => {
                    return /^[A-Z][a-zA-Z0-9]*$/.test(value)
                        ? null
                        : 'Class name must start with an uppercase letter and contain only letters and numbers';
                }
            });
            if (!className)
                return;
            // Find existing models directory
            const modelsDir = await findModelsDirectory(workspaceFolder);
            let targetDir;
            if (!modelsDir) {
                // Ask user where to create the models directory
                const selectedFolder = await vscode.window.showQuickPick([
                    'lib/models',
                    'lib/model',
                    'lib/src/models',
                    'lib/core/models',
                    'lib/data/models',
                    'Custom location...'
                ], {
                    placeHolder: 'Select where to create the models directory'
                });
                if (!selectedFolder)
                    return;
                if (selectedFolder === 'Custom location...') {
                    const customPath = await vscode.window.showInputBox({
                        prompt: "Enter the path relative to the project root (e.g., lib/core/models)",
                        placeHolder: 'lib/your/path/here'
                    });
                    if (!customPath)
                        return;
                    targetDir = path.join(workspaceFolder, customPath);
                }
                else {
                    targetDir = path.join(workspaceFolder, selectedFolder);
                }
                // Create directory recursively
                await vscode.workspace.fs.createDirectory(vscode.Uri.file(targetDir));
            }
            else {
                targetDir = modelsDir;
            }
            // Generate the model content
            const fullClassName = `${className}`;
            let modelContent = generateModel(fullClassName, jsonObject);
            // Generate nested models
            const nestedModels = generateNestedModels(jsonObject);
            modelContent = nestedModels.join('\n\n') + '\n\n' + modelContent;
            // Create new file with the appropriate snake_case name
            const newFile = vscode.Uri.file(path.join(targetDir, classNameToFileName(className)));
            const fileContent = new TextEncoder().encode(`// Generated using Flux JSON Model Generator\n\n${modelContent}`);
            await vscode.workspace.fs.writeFile(newFile, fileContent);
            // Open the generated file
            const document = await vscode.workspace.openTextDocument(newFile);
            await vscode.window.showTextDocument(document);
            vscode.window.showInformationMessage(`Successfully generated model in ${newFile.fsPath}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to generate model: ${error.message}`);
        }
    });
    context.subscriptions.push(generateJsonModel);
};
exports.registerComplexCommands = registerComplexCommands;


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerUtilsCommand = void 0;
const vscode = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(9));
const workspaceUtils_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(5);
const child_process_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
const terminalUtils_1 = __webpack_require__(3);
const execPromise = (0, util_1.promisify)(child_process_1.exec);
// Helper function to find utils directory
const findUtilsDirectory = async (workspaceFolder) => {
    const possiblePaths = [
        'lib/utils',
        'lib/util',
        'lib/src/utils',
        'lib/src/util',
        'lib/core/utils',
        'lib/core/util',
        'lib/common/utils',
        'lib/shared/utils',
    ];
    for (const relativePath of possiblePaths) {
        const fullPath = path.join(workspaceFolder, relativePath);
        try {
            await vscode.workspace.fs.stat(vscode.Uri.file(fullPath));
            return fullPath;
        }
        catch (error) {
            // Directory doesn't exist, continue checking
        }
    }
    return null;
};
// Helper function to check if `intl` is already in pubspec.yaml
const checkForIntlInPubspec = async (workspaceFolder) => {
    const pubspecPath = path.join(workspaceFolder, 'pubspec.yaml');
    try {
        const pubspecFile = await vscode.workspace.fs.readFile(vscode.Uri.file(pubspecPath));
        const pubspecContent = pubspecFile.toString();
        return pubspecContent.includes('intl:');
    }
    catch (error) {
        // pubspec.yaml doesn't exist or can't be read
        return false;
    }
};
// Generate the utilities content
const generateUtilsContent = () => {
    return `
import 'package:intl/intl.dart';

extension StringExtension on String {
  /// Converts string to sentence case
  /// Example: "john doe".toSentenceCase() returns "John Doe"
  String toSentenceCase() {
    if (isEmpty) return this;
    return split(' ')
        .map((word) => word.isEmpty
            ? ''
            : "\${word[0].toUpperCase()}\${word.substring(1).toLowerCase()}")
        .join(' ');
  }

  /// Removes specified characters from the string
  /// Example: "hello@world".removeCharacters(['@']) returns "helloworld"
  String removeCharacters([List<String>? chars]) {
    final List<String> defaultChars = ['@', '#', r'$','%', '^', '&', '*', '(', ')', '!', '~','-', '=', '+', '{', '}', '[', ']', ':', ';', '<', '>'];
    final List < String > charactersToRemove = chars ?? defaultChars;

    String result = this;
    for (final char in charactersToRemove) {
      result = result.replaceAll(char, '');
    }
    return result;
  }

  /// Checks if the string is a valid email address
  /// Example: "test@example.com".isValidEmail returns true
  bool get isValidEmail {
    final emailRegExp = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    );
    return emailRegExp.hasMatch(this);
  }

  /// Formats amount with currency for different countries
  /// Example: "1000".formatAmount("USD") returns "\$1,000.00"
  String formatAmount([String currencyCode = 'USD']) {
    try {
      final amount = double.parse(replaceAll(RegExp(r'[^0-9.]'), ''));
      final format = NumberFormat.currency(
        locale: _getLocaleForCurrency(currencyCode),
        symbol: _getCurrencySymbol(currencyCode),
        decimalDigits: 2,
      );
      return format.format(amount);
    } catch (e) {
      return this;
    }
  }

  /// Formats date string according to specified format
  /// Example: "2024-03-14".formatDateTime("MMMM d, y") returns "March 14, 2024"
  String formatDateTime(String format, {String? inputFormat}) {
    try {
      DateTime dateTime;
      if (inputFormat != null) {
        dateTime = DateFormat(inputFormat).parse(this);
      } else {
        dateTime = DateTime.parse(this);
      }
      return DateFormat(format).format(dateTime);
    } catch (e) {
      return this;
    }
  }

  /// Formats date to ordinal format (1st, 2nd, 3rd, etc.)
  /// Example: "2024-03-14".toOrdinalDate() returns "14th March, 2024"
  String toOrdinalDate() {
    try {
      final dateTime = DateTime.parse(this);
      final day = dateTime.day;
      final suffix = _getOrdinalSuffix(day);
      return DateFormat("d'\$suffix' MMMM, y").format(dateTime);
    } catch (e) {
      return this;
    }
  }

  /// Capitalizes first letter of each word
  /// Example: "hello world".toTitleCase() returns "Hello World"
  String toTitleCase() {
    if (isEmpty) return this;
    return split(' ').map((word) => word.isEmpty ? '' : word[0].toUpperCase() + word.substring(1)).join(' ');
  }

  /// Extracts numbers from string
  /// Example: "Product123".extractNumbers() returns "123"
  String extractNumbers() {
    return replaceAll(RegExp(r'[^0-9]'), '');
  }

  /// Slugify string (URL-friendly version)
  /// Example: "Hello World! 123".toSlug() returns "hello-world-123"
  String toSlug() {
    return toLowerCase()
        .replaceAll(RegExp(r'[^a-z0-9]+'), '-')
        .replaceAll(RegExp(r'^-+|-+$'), '');
  }

  /// Validates password strength
  /// Returns a map with validation details
  /// Example: "Password123!".validatePassword()
  Map<String, bool> validatePassword({
    int minLength = 8,
    bool requireUppercase = true,
    bool requireLowercase = true,
    bool requireNumbers = true,
    bool requireSpecialChars = true,
  }) {
    return {
      'minLength': length >= minLength,
      'hasUppercase': !requireUppercase || contains(RegExp(r'[A-Z]')),
      'hasLowercase': !requireLowercase || contains(RegExp(r'[a-z]')),
      'hasNumbers': !requireNumbers || contains(RegExp(r'[0-9]')),
      'hasSpecialChars': !requireSpecialChars || 
          contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]')),
    };
  }
}

String _getOrdinalSuffix(int day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

String _getLocaleForCurrency(String currencyCode) {
  final currencyLocales = {
    'USD': 'en_US',
    'EUR': 'de_DE',
    'GBP': 'en_GB',
    'JPY': 'ja_JP',
    'CNY': 'zh_CN',
    'GHS': 'en_GH',
    'NGN': 'en_NG',
    'KES': 'en_KE',
    'ZAR': 'en_ZA',
    'EGP': 'ar_EG',
    // Add more currency codes and locales as needed
  };
  return currencyLocales[currencyCode] ?? 'en_US';
}

String _getCurrencySymbol(String currencyCode) {
  final currencySymbols = {
    'USD': r'$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CNY': '¥',
    'GHS': '₵',
    'NGN': '₦',
    'KES': 'KSh',
    'ZAR': 'R',
    'EGP': 'E£',
    // Add more currency symbols as needed
  };
  return currencySymbols[currencyCode] ?? currencyCode;
}

extension NumericExtension on num {
  /// Formats number as currency
  /// Example: 1000.formatAmount("USD") returns "\$1,000.00"
  String formatAmount([String currencyCode = 'USD']) {
    return toString().formatAmount(currencyCode);
  }

  /// Formats number in a compact form with K (thousand), M (million), B (billion), T (trillion) suffixes.
  ///
  /// Example:
  /// 999.formatCompact() returns "999"
  /// 1500.formatCompact() returns "1.5K"
  String formatCompact() {
    if (this < 1000) return toString();
    if (this < 1000000) return '\${(this / 1000).toStringAsFixed(1)}K';
    if (this < 1000000000) return '\${(this / 1000000).toStringAsFixed(1)}M';
    if (this < 1000000000000) return '\${(this / 1000000000).toStringAsFixed(1)}B';
    return '\${(this / 1000000000000).toStringAsFixed(1)}T';
  }

  /// Formats number as percentage
  /// Example: 0.156.toPercentage() returns "15.6%"
  String toPercentage([int decimals = 1]) {
    return '\${(this * 100).toStringAsFixed(decimals)}%';
  }
}

extension DateTimeExtension on DateTime {
  /// Formats DateTime to ordinal date format
  /// Example: DateTime.now().toOrdinalDate() returns "14th March, 2024"
  String toOrdinalDate() {
    final day = this.day;
    final suffix = _getOrdinalSuffix(day);
    return DateFormat("d'\$suffix' MMMM, y").format(this);
  }

  /// Formats DateTime according to specified format
  /// Example: DateTime.now().format("MMMM d, y") returns "March 14, 2024"
  String format(String format) {
    return DateFormat(format).format(this);
  }

  /// Returns true if date is today
  bool get isToday {
    final now = DateTime.now();
    return year == now.year && month == now.month && day == now.day;
  }

  /// Returns true if date is in the past
  bool get isPast => isBefore(DateTime.now());

  /// Returns true if date is in the future
  bool get isFuture => isAfter(DateTime.now());

  /// Returns true if date is within a weekend
  bool get isWeekend => weekday == DateTime.saturday || weekday == DateTime.sunday;

  /// Returns the date formatted as a relative time string
  /// Example: "2 hours ago", "in 3 days", "just now"
  String toRelative() {
    final now = DateTime.now();
    final difference = now.difference(this);

    if (difference.inDays > 365) {
      return format('MMMM d, y');
    } else if (difference.inDays > 30) {
      final months = (difference.inDays / 30).floor();
      return difference.isNegative
          ? 'in \$months \${months == 1 ? 'month' : 'months'}'
          : '\$months \${months == 1 ? 'month' : 'months'} ago';
    } else if (difference.inDays > 0) {
      return difference.isNegative
          ? 'in \${difference.inDays} \${difference.inDays == 1 ? 'day' : 'days'}'
          : '\${difference.inDays} \${difference.inDays == 1 ? 'day' : 'days'} ago';
    } else if (difference.inHours > 0) {
      return difference.isNegative
          ? 'in \${difference.inHours} \${difference.inHours == 1 ? 'hour' : 'hours'}'
          : '\${difference.inHours} \${difference.inHours == 1 ? 'hour' : 'hours'} ago';
    } else if (difference.inMinutes > 0) {
      return difference.isNegative
          ? 'in \${difference.inMinutes} \${difference.inMinutes == 1 ? 'minute' : 'minutes'}'
          : '\${difference.inMinutes} \${difference.inMinutes == 1 ? 'minute' : 'minutes'} ago';
    } else {
      return 'just now';
    }
  }

  /// Returns start of day (midnight)
  DateTime get startOfDay => DateTime(year, month, day);

  /// Returns end of day (23:59:59.999)
  DateTime get endOfDay => DateTime(year, month, day, 23, 59, 59, 999);

  /// Add or subtract business days (skipping weekends)
  DateTime addBusinessDays(int days) {
    DateTime date = this;
    int remainingDays = days.abs();
    final isAddition = days > 0;

    while (remainingDays > 0) {
      date = isAddition ? date.add(Duration(days: 1)) : date.subtract(Duration(days: 1));
      if (!date.isWeekend) remainingDays--;
    }
    return date;
  }

   /// Formats time in 12-hour format without seconds
  /// Example: DateTime.now().to12HourTime() returns "7:10 PM"
  String to12HourTime() {
    return DateFormat('h:mm a').format(this);
  }

  /// Formats time in 12-hour format with seconds
  /// Example: DateTime.now().to12HourTimeWithSeconds() returns "7:10:00 PM"
  String to12HourTimeWithSeconds() {
    return DateFormat('h:mm:ss a').format(this);
  }

  /// Formats time in 24-hour format without seconds
  /// Example: DateTime.now().to24HourTime() returns "19:10"
  String to24HourTime() {
    return DateFormat('HH:mm').format(this);
  }

  /// Formats time in 24-hour format with seconds
  /// Example: DateTime.now().to24HourTimeWithSeconds() returns "19:10:00"
  String to24HourTimeWithSeconds() {
    return DateFormat('HH:mm:ss').format(this);
  }

   /// Returns whether the time is in the morning (12:00 AM to 11:59 AM)
  bool get isMorning => hour >= 0 && hour < 12;

  /// Returns whether the time is in the afternoon (12:00 PM to 5:59 PM)
  bool get isAfternoon => hour >= 12 && hour < 18;

  /// Returns whether the time is in the evening (6:00 PM to 11:59 PM)
  bool get isEvening => hour >= 18;

  /// Returns the time of day (morning, afternoon, or evening)
  /// Returns greeting based on time of day
  /// Example: DateTime.now().greeting() returns "Good morning/afternoon/evening"
  String get timeOfDay {
    if (isMorning) return 'morning';
    if (isAfternoon) return 'afternoon';
    return 'evening';
  }
}
`;
};
const registerUtilsCommand = (context) => {
    const workspaceFolder = (0, workspaceUtils_1.getWorkspaceFolder)();
    let generateUtils = vscode.commands.registerCommand(constants_1.COMMANDS.FLUTTER_GENERATE_UTILS, async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_WORKSPACE);
            return;
        }
        try {
            // Find existing utils directory
            const utilsDir = await findUtilsDirectory(workspaceFolder);
            let targetDir;
            if (!utilsDir) {
                // Ask user where to create the utils directory
                const selectedFolder = await vscode.window.showQuickPick([
                    'lib/utils',
                    'lib/util',
                    'lib/src/utils',
                    'lib/core/utils',
                    'lib/common/utils',
                    'lib/shared/utils',
                    'Custom location...'
                ], {
                    placeHolder: 'Select where to create the utils directory'
                });
                if (!selectedFolder)
                    return;
                if (selectedFolder === 'Custom location...') {
                    const customPath = await vscode.window.showInputBox({
                        prompt: "Enter the path relative to the project root (e.g., lib/core/utils)",
                        placeHolder: 'lib/your/path/here'
                    });
                    if (!customPath)
                        return;
                    targetDir = path.join(workspaceFolder, customPath);
                }
                else {
                    targetDir = path.join(workspaceFolder, selectedFolder);
                }
                // Create directory recursively
                await vscode.workspace.fs.createDirectory(vscode.Uri.file(targetDir));
            }
            else {
                targetDir = utilsDir;
            }
            // Check if utils.dart already exists
            const utilsFile = vscode.Uri.file(path.join(targetDir, 'utils.dart'));
            try {
                await vscode.workspace.fs.stat(utilsFile);
                const overwrite = await vscode.window.showQuickPick(['Yes', 'No'], {
                    placeHolder: 'utils.dart already exists. Do you want to overwrite it?'
                });
                if (overwrite !== 'Yes')
                    return;
            }
            catch (error) {
                // File doesn't exist, continue
            }
            // Generate and write the file
            const fileContent = new TextEncoder().encode(generateUtilsContent());
            await vscode.workspace.fs.writeFile(utilsFile, fileContent);
            // Check if `intl` is in pubspec.yaml
            const intlExists = await checkForIntlInPubspec(workspaceFolder);
            if (!intlExists) {
                // Execute the command to add intl package
                const command = `flutter pub add intl`;
                try {
                    await (0, terminalUtils_1.runTerminalCommand)(command, workspaceFolder);
                    vscode.window.showInformationMessage('Successfully added intl package to your pubspec.yaml.');
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Failed to add intl package: ${error.message}`);
                }
            }
            else {
                vscode.window.showInformationMessage('intl package is already added.');
            }
            // Open the generated file
            const document = await vscode.workspace.openTextDocument(utilsFile);
            await vscode.window.showTextDocument(document);
            vscode.window.showInformationMessage(`Successfully generated utils.dart in ${utilsFile.fsPath}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to generate utils: ${error.message}`);
        }
    });
    context.subscriptions.push(generateUtils);
};
exports.registerUtilsCommand = registerUtilsCommand;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const buildCommands_1 = __webpack_require__(1);
const doctorCommands_1 = __webpack_require__(6);
const pubCommands_1 = __webpack_require__(7);
const podCommands_1 = __webpack_require__(8);
const flutterCommands_1 = __webpack_require__(10);
const createCommands_1 = __webpack_require__(11);
const emulatorCommands_1 = __webpack_require__(13);
const complexCommands_1 = __webpack_require__(16);
const utilCommands_1 = __webpack_require__(17);
function activate(context) {
    (0, buildCommands_1.registerBuildCommands)(context);
    (0, doctorCommands_1.registerDoctorCommand)(context);
    (0, pubCommands_1.registerPubCommands)(context);
    (0, podCommands_1.registerPodCommands)(context);
    (0, flutterCommands_1.registerFlutterCommands)(context);
    (0, createCommands_1.registerCreateCommands)(context);
    (0, emulatorCommands_1.registerDeviceManagementCommands)(context);
    (0, complexCommands_1.registerComplexCommands)(context);
    (0, utilCommands_1.registerUtilsCommand)(context);
}
function deactivate() { }

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map