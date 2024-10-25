import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { runTerminalCommandWithTimeout } from "../utils/terminalUtils";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { COMMANDS, MESSAGES } from "../constants";

export const registerSetupCommands = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    let flutterSetupCodeLytical = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_SET_UP,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(MESSAGES.NO_WORKSPACE);
                return;
            }

            // Check if there's an existing Flutter project
            if (!fs.existsSync(path.join(workspaceFolder, "pubspec.yaml"))) {
                vscode.window.showErrorMessage("No Flutter project found in the workspace.");
                return;
            }

            // Prompt for State Management choice
            const stateManagement = await vscode.window.showQuickPick(["provider", "riverpod"], {
                placeHolder: "Select State Management Library",
            });

            if (!stateManagement) {
                vscode.window.showErrorMessage("State management selection is required.");
                return;
            }

            // Define project paths
            const libPath = path.join(workspaceFolder, "lib");
            const folders = stateManagement === "provider"
                ? ["app/routes", "app/theme", "mixins", "services/local", "services/network", "utils", "controllers/sample", "models", "ui/screens", "ui/widgets"]
                : ["core", "core/router", "core/theme", "features/home", "features/home/view", "features/home/viewmodel", "features/home/model", "services/local", "services/network"];

            // Create folder structure
            folders.forEach(folder => fs.mkdirSync(path.join(libPath, folder), { recursive: true }));

            // Populate main.dart file based on selected state management
            const mainFile = path.join(libPath, "main.dart");
            const mainContent = stateManagement === "provider"
                ? `import 'app/launcher.dart' as launcher;\n\nvoid main() {\n  launcher.main();\n}\n`
                : `import 'package:flutter/material.dart';\nimport 'package:flutter_riverpod/flutter_riverpod.dart';\nimport 'core/router/app_router.dart';\n\nvoid main() {\n  runApp(const ProviderScope(child: MyApp()));\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n @override\n  Widget build(BuildContext context) {\n    return MaterialApp.router(\n      title: 'Flutter Demo',\n      theme: ThemeData(\n        primarySwatch: Colors.blue,\n      ),\n      routerConfig: AppRouter.router,\n    );\n  }\n}\n`;
            fs.writeFileSync(mainFile, mainContent);

            // Add dependencies and create additional files
            try {
                if (stateManagement === "provider") {
                    await runTerminalCommandWithTimeout(`flutter pub add provider`, workspaceFolder);
                    await createProviderFiles(workspaceFolder);
                } else {
                    await runTerminalCommandWithTimeout(`flutter pub add flutter_riverpod go_router`, workspaceFolder);
                    await createRiverpodFiles(workspaceFolder);
                }
                vscode.window.showInformationMessage(`${stateManagement} setup completed successfully.`);
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to setup ${stateManagement}: ${error.message}`);
            }
        }
    );

    // Function to create additional provider-specific files
    const createProviderFiles = async (projectPath: string) => {
        const providerRegistryPath = path.join(projectPath, "lib", "app", "provider_registry.dart");
        fs.writeFileSync(providerRegistryPath, `import 'package:provider/provider.dart';\nimport 'package:provider/single_child_widget.dart';\nimport 'provider_registry_export.dart';\n\nclass ProviderRegistry {\n  static List<SingleChildWidget> get registeredProviders => [\n    ChangeNotifierProvider(create: (_) => SampleController()),\n  ];\n}\n`);

        const sampleControllerPath = path.join(projectPath, "lib", "controllers", "sample", "sample_controller.dart");
        fs.writeFileSync(sampleControllerPath, `import 'package:flutter/material.dart';\n\nclass SampleController extends ChangeNotifier {\n  String _message = 'CodeLytical Provider State';\n  String get message => _message;\n\n  void updateMessage(String newMessage) {\n    _message = newMessage;\n    notifyListeners();\n  }\n}\n`);
    };

    // Function to create additional Riverpod-specific files
    const createRiverpodFiles = async (projectPath: string) => {
        const appRouterPath = path.join(projectPath, "lib", "core", "router", "app_router.dart");
        fs.writeFileSync(appRouterPath, `import 'package:go_router/go_router.dart';\nimport '../../features/home/view/home_view.dart';\n\nclass AppRouter {\n  static final router = GoRouter(\n    routes: [\n      GoRoute(\n        path: '/',\n        builder: (context, state) => const HomeView(),\n      ),\n    ],\n  );\n}\n`);

        const homeViewModelPath = path.join(projectPath, "lib", "features", "home", "viewmodel", "home_viewmodel.dart");
        fs.writeFileSync(homeViewModelPath, `import 'package:flutter/material.dart';\nimport 'package:flutter_riverpod/flutter_riverpod.dart';\n\nclass HomeViewModel extends ChangeNotifier {\n  String _message = 'Hello from Riverpod!';\n  String get message => _message;\n\n  void updateMessage(String newMessage) {\n    _message = newMessage;\n    notifyListeners();\n  }\n}\n\nfinal homeViewModelProvider = ChangeNotifierProvider((ref) => HomeViewModel());\n`);
    };

    context.subscriptions.push(flutterSetupCodeLytical);
};
