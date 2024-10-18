/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
function activate(context) {
    const runTerminalCommand = (command, cwd) => {
        return new Promise((resolve, reject) => {
            const terminal = vscode.window.createTerminal({
                name: `Flutter: ${command}`,
                cwd,
                shellPath: '/bin/zsh',
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
    const runTerminalCommandWithTimeout = (command, cwd) => {
        return new Promise((resolve, reject) => {
            const terminal = vscode.window.createTerminal({
                name: `Flutter: ${command}`,
                cwd,
                shellPath: '/bin/zsh',
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
    // Get the workspace folder (assuming there's only one for simplicity)
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    // Flutter commands
    let flutterPubGet = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubGet", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter pub get", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub get'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub get': ${error.message}`);
        }
    });
    let flutterPubUpgrade = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubUpgrade", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter pub upgrade", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub upgrade'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub upgrade': ${error.message}`);
        }
    });
    let flutterPubUpgradeMajorVersions = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubUpgradeMajorVersions", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter pub upgrade --major-versions", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub upgrade --major-versions'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub upgrade --major-versions': ${error.message}`);
        }
    });
    let flutterPubOutdated = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubOutdated", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter pub outdated", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub outdated'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub outdated': ${error.message}`);
        }
    });
    let flutterPubCacheRepair = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubCacheRepair", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter pub cache repair", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub cache repair'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub cache repair': ${error.message}`);
        }
    });
    let flutterPubUpgradeDryRun = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubUpgradeDryRun", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter pub upgrade --dry-run", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub upgrade --dry-run'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub upgrade --dry-run': ${error.message}`);
        }
    });
    let flutterPubDowngrade = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubDowngrade", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter pub downgrade", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter pub downgrade'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter pub downgrade': ${error.message}`);
        }
    });
    let flutterPubVersion = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubVersion", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter --version && flutter pub version", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter --version && flutter pub version'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter --version && flutter pub version': ${error.message}`);
        }
    });
    let flutterPubAdd = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubAdd", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
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
            await runTerminalCommand(`flutter pub add ${packageName}`, workspaceFolder);
            vscode.window.showInformationMessage(`Successfully ran flutter pub add ${packageName}.`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run flutter pub add ${packageName}: ${error.message}`);
        }
    });
    let flutterPubRemove = vscode.commands.registerCommand("flutter-cli-shortcut.flutterPubRemove", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
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
            await runTerminalCommand(`flutter pub remove ${packageName}`, workspaceFolder);
            vscode.window.showInformationMessage(`Successfully ran flutter pub remove ${packageName}.`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run flutter pub remove ${packageName}: ${error.message}`);
        }
    });
    let flutterClean = vscode.commands.registerCommand("flutter-cli-shortcut.flutterClean", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter clean", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter clean'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter clean': ${error.message}`);
        }
    });
    let flutterTest = vscode.commands.registerCommand("flutter-cli-shortcut.flutterTest", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter test", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter test'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter test': ${error.message}`);
        }
    });
    let flutterAnalyze = vscode.commands.registerCommand("flutter-cli-shortcut.flutterAnalyze", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter analyze", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter analyze'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter analyze': ${error.message}`);
        }
    });
    let flutterCreate = vscode.commands.registerCommand("flutter-cli-shortcut.flutterCreate", async () => {
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
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand(`flutter create --org ${organization} ${projectName}`, workspaceFolder);
            vscode.window.showInformationMessage(`Successfully ran flutter create --org ${organization} ${projectName}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run flutter create--org ${organization} ${projectName}: ${error.message}`);
        }
    });
    let flutterCreateCodeLytical = vscode.commands.registerCommand("flutter-cli-shortcut.flutterCreateCodeLytical", async () => {
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
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
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
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to create project: ${error.message}`);
            return;
        }
    });
    let flutterBuildApk = vscode.commands.registerCommand("flutter-cli-shortcut.flutterBuildApk", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter build apk", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter build apk'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter build apk': ${error.message}`);
        }
    });
    let flutterBuildIos = vscode.commands.registerCommand("flutter-cli-shortcut.flutterBuildIos", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter build ios", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter build ios'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter build ios': ${error.message}`);
        }
    });
    let flutterBuildAppBundle = vscode.commands.registerCommand("flutter-cli-shortcut.flutterBuildAppBundle", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        try {
            await runTerminalCommand("flutter build appbundle", workspaceFolder);
            vscode.window.showInformationMessage("Successfully ran 'flutter build appbundle'.");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run 'flutter build appbundle': ${error.message}`);
        }
    });
    let podInstall = vscode.commands.registerCommand("flutter-cli-shortcut.podInstall", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        const iosPath = path.join(workspaceFolder, "ios");
        const podfilePath = path.join(iosPath, "Podfile");
        // Check if ios directory and Podfile exist
        try {
            const iosStat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
            if (iosStat.type !== vscode.FileType.Directory) {
                vscode.window.showErrorMessage("No ios directory found. Please check your Flutter project.");
                return;
            }
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                // Podfile exists, so just install
                try {
                    await runTerminalCommand("cd ios && pod install", workspaceFolder);
                    vscode.window.showInformationMessage("Pods installed successfully!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
            catch {
                // Podfile doesn't exist, initialize pods first
                try {
                    await runTerminalCommand("cd ios && pod init && pod install", workspaceFolder);
                    vscode.window.showInformationMessage("Pods initialized and installed!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
        }
        catch {
            vscode.window.showErrorMessage("No ios directory found. Please check your Flutter project.");
        }
    });
    let podInstallWithRepoUpdate = vscode.commands.registerCommand("flutter-cli-shortcut.podInstallWithRepoUpdate", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        const iosPath = path.join(workspaceFolder, "ios");
        const podfilePath = path.join(iosPath, "Podfile");
        // Check if ios directory and Podfile exist
        try {
            const iosStat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
            if (iosStat.type !== vscode.FileType.Directory) {
                vscode.window.showErrorMessage("No ios directory found. Please check your Flutter project.");
                return;
            }
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                // Podfile exists, so just install with repo update
                try {
                    await runTerminalCommand("cd ios && pod install --repo-update", workspaceFolder);
                    vscode.window.showInformationMessage("Pods installed with repo update!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
            catch {
                // Podfile doesn't exist, initialize pods first
                try {
                    await runTerminalCommand("cd ios && pod init && pod install --repo-update", workspaceFolder);
                    vscode.window.showInformationMessage("Pods initialized and installed with repo update!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
        }
        catch {
            vscode.window.showErrorMessage("No ios directory found. Please check your Flutter project.");
        }
    });
    let podUpdate = vscode.commands.registerCommand("flutter-cli-shortcut.podUpdate", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        const iosPath = path.join(workspaceFolder, "ios");
        const podfilePath = path.join(iosPath, "Podfile");
        // Check if ios directory and Podfile exist
        try {
            const iosStat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
            if (iosStat.type !== vscode.FileType.Directory) {
                vscode.window.showErrorMessage("No ios directory found. Please check your Flutter project.");
                return;
            }
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                // Podfile exists, so just update pods
                try {
                    await runTerminalCommand("cd ios && pod update", workspaceFolder);
                    vscode.window.showInformationMessage("Pods updated successfully!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
            catch {
                // Podfile doesn't exist, initialize pods first
                try {
                    await runTerminalCommand("cd ios && pod init && pod update", workspaceFolder);
                    vscode.window.showInformationMessage("Pods initialized and updated!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
        }
        catch {
            vscode.window.showErrorMessage("No ios directory found. Please check your Flutter project.");
        }
    });
    let podRepoUpdate = vscode.commands.registerCommand("flutter-cli-shortcut.podRepoUpdate", async () => {
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");
            return;
        }
        const iosPath = path.join(workspaceFolder, "ios");
        const podfilePath = path.join(iosPath, "Podfile");
        // Check if ios directory and Podfile exist
        try {
            const iosStat = await vscode.workspace.fs.stat(vscode.Uri.file(iosPath));
            if (iosStat.type !== vscode.FileType.Directory) {
                vscode.window.showErrorMessage("No ios directory found. Please check your Flutter project.");
                return;
            }
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(podfilePath));
                // Podfile exists, so just run the repo update
                try {
                    await runTerminalCommand("cd ios && pod repo update", workspaceFolder);
                    vscode.window.showInformationMessage("Repo updated successfully!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
            catch {
                // Podfile doesn't exist, initialize pods first
                try {
                    await runTerminalCommand("cd ios && pod init && pod repo update", workspaceFolder);
                    vscode.window.showInformationMessage("Repo initialized and updated!");
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            }
        }
        catch {
            vscode.window.showErrorMessage("No ios directory found. Please check your Flutter project.");
        }
    });
    // Helper function to create necessary project files
    const createProjectFiles = async (projectPath, projectName) => {
        const appClassName = projectName
            .replace(/_/g, ' ')
            .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1))
            .replace(/\s/g, '');
        const launcherFile = path.join(projectPath, "lib", "app", "launcher.dart");
        fs.writeFileSync(launcherFile, `import 'package:flutter/material.dart';\nimport 'package:provider/provider.dart';\nimport 'providers.dart';\nimport 'app.dart';\n\nvoid main() async {\n  WidgetsFlutterBinding.ensureInitialized();\n  runApp(\n    MultiProvider(\n      providers: Providers.providers,\n      child: const ${appClassName}(),\n    ),\n  );\n}\n`);
        const appFile = path.join(projectPath, "lib", "app", "app.dart");
        fs.writeFileSync(appFile, `import 'package:flutter/material.dart';\nimport 'package:flutter/services.dart';\nimport 'codelytical_context_helper.dart';\nimport '../ui/screens/welcome_screen.dart';\n\nclass ${appClassName} extends StatelessWidget {\n  const ${appClassName}({super.key});\n  @override\n  Widget build(BuildContext context) {\n    var isDark = MediaQuery.of(context).platformBrightness == Brightness.dark;\n    return AnnotatedRegion<SystemUiOverlayStyle>(\n      value: SystemUiOverlayStyle(\n          statusBarBrightness: !isDark ? Brightness.light : Brightness.dark,\n          statusBarColor: Colors.transparent,\n          statusBarIconBrightness: isDark ? Brightness.light : Brightness.dark),\n      child: Builder(\n        builder: (context) => MaterialApp(\n          navigatorKey: CodeLyticalContextHelper.mainNavigatorKey,\n          debugShowCheckedModeBanner: false,\n          title: "CodeLytical Sample",\n          themeMode: ThemeMode.light,\n          home: const WelcomeScreen(),\n        ),\n      ),\n    );\n  }\n}\n`);
        // Create app/providers.dart
        const providersFile = path.join(projectPath, "lib", "app", "providers.dart");
        fs.writeFileSync(providersFile, `import 'package:provider/provider.dart';\nimport 'package:provider/single_child_widget.dart';\nimport 'providers_export.dart';\n\nclass Providers {\n  static List<SingleChildWidget> get providers {\n    return [\n      ChangeNotifierProvider<SampleController>(\n        create: (context) => SampleController()),\n    ];\n  }\n}\n`);
        // Create app/providers_export.dart
        const providersExportFile = path.join(projectPath, "lib", "app", "providers_export.dart");
        fs.writeFileSync(providersExportFile, `// Exports for your controllers\nexport '../controllers/sample/sample_controller.dart';\n`);
        // Create controllers/sample/sample_controller.dart
        const sampleControllerFile = path.join(projectPath, "lib", "controllers", "sample", "sample_controller.dart");
        fs.writeFileSync(sampleControllerFile, `import 'package:flutter/material.dart';\n\nclass SampleController extends ChangeNotifier {\n  String _message = 'CodeLytical is a YouTube channel';\n\n  String get message => _message;\n\n  void updateMessage(String newMessage) {\n    _message = newMessage;\n    notifyListeners();\n  }\n}\n`);
        // Create ui/screens/welcome_screen.dart
        const welcomeScreenFile = path.join(projectPath, "lib", "ui", "screens", "welcome_screen.dart");
        fs.writeFileSync(welcomeScreenFile, `import 'package:flutter/material.dart';\n\nclass WelcomeScreen extends StatelessWidget {\n  const WelcomeScreen({Key? key}) : super(key: key);\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: const Text('Welcome Screen'),\n      ),\n      body: Center(\n        child: const Text('Welcome to the app!'),\n      ),\n    );\n  }\n}\n`);
        // Create app/codelytical_context_helper.dart
        const contextHelperFile = path.join(projectPath, "lib", "app", "codelytical_context_helper.dart");
        fs.writeFileSync(contextHelperFile, `import 'package:flutter/material.dart';\n\nclass CodeLyticalContextHelper {\n  CodeLyticalContextHelper._();  // Private constructor to prevent instantiation\n\n  static final GlobalKey<NavigatorState> mainNavigatorKey = GlobalKey<NavigatorState>();\n\n  static BuildContext get currentBuildContext {\n    final context = mainNavigatorKey.currentContext;\n    if (context == null) {\n      throw StateError("Navigator key is not associated with any context.");\n    }\n    return context;\n  }\n}\n`);
    };
    context.subscriptions.push(flutterPubGet, flutterPubUpgrade, flutterPubUpgradeMajorVersions, flutterPubOutdated, flutterPubCacheRepair, flutterPubUpgradeDryRun, flutterPubDowngrade, flutterPubVersion, flutterPubAdd, flutterPubRemove, flutterClean, flutterTest, flutterAnalyze, flutterCreate, flutterCreateCodeLytical, flutterBuildApk, flutterBuildIos, flutterBuildAppBundle, podInstall, podInstallWithRepoUpdate, podUpdate, podRepoUpdate);
}
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map