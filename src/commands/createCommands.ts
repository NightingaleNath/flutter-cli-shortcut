import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { runTerminalCommand, runTerminalCommandWithTimeout } from "../utils/terminalUtils";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { COMMANDS, MESSAGES } from "../constants";

export const registerCreateCommands = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    let flutterCreate = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_CREATE,
        async () => {
            const projectName = await vscode.window.showInputBox({
                prompt:
                    "Enter the name of the new Flutter project (e.g., methodist_ndwom)",
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
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            try {
                await runTerminalCommand(
                    `flutter create --org ${organization} ${projectName}`,
                    workspaceFolder
                );
                vscode.window.showInformationMessage(
                    `Successfully ran flutter create --org ${organization} ${projectName}`
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to run flutter create--org ${organization} ${projectName}: ${error.message}`
                );
            }
        }
    );

    let flutterCreateCodeLytical = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_CREATE_CODELYTICAL,
        async () => {
            const projectName = await vscode.window.showInputBox({
                prompt:
                    "Enter the name of the new Flutter project (e.g., methodist_ndwom)",
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
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            // Create the Flutter project
            try {
                await runTerminalCommandWithTimeout(
                    `flutter create --org ${organization} ${projectName}`,
                    workspaceFolder
                );

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
                fs.writeFileSync(
                    mainFile,
                    `import 'app/launcher.dart' as launcher;\n\nvoid main() {\n  launcher.main();\n}\n`
                );

                // Create additional files
                await createProjectFiles(projectPath, projectName);

                // Add provider dependency using flutter pub add
                await runTerminalCommandWithTimeout(
                    `flutter pub add provider`,
                    projectPath
                );

                // Remove the default test file
                const defaultTestFile = path.join(
                    projectPath,
                    "test",
                    "widget_test.dart"
                );
                if (fs.existsSync(defaultTestFile)) {
                    fs.unlinkSync(defaultTestFile);
                }

                // Add custom test for SampleController
                const sampleControllerTestFile = path.join(
                    projectPath,
                    "test",
                    "sample_controller_test.dart"
                );
                fs.writeFileSync(
                    sampleControllerTestFile,
                    getSampleControllerTestTemplate(projectName)
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to create project: ${error.message}`
                );
                return;
            }
        }
    );

    let flutterCreateCodeLyticalRiverpod = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_CREATE_CODELYTICAL_RIVERPOD,
        async () => {
            const projectName = await vscode.window.showInputBox({
                prompt:
                    "Enter the name of the new Flutter project (e.g., methodist_ndwom)",
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
                vscode.window.showErrorMessage(
                    MESSAGES.NO_WORKSPACE
                );
                return;
            }

            // Create the Flutter project
            try {
                await runTerminalCommandWithTimeout(
                    `flutter create --org ${organization} ${projectName}`,
                    workspaceFolder
                );

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
                fs.writeFileSync(
                    mainFile,
                    `import 'package:flutter/material.dart';\nimport 'package:flutter_riverpod/flutter_riverpod.dart';\nimport 'core/router/app_router.dart';\n\nvoid main() {\n  runApp(const ProviderScope(child: MyApp()));\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n @override\n  Widget build(BuildContext context) {\n    return MaterialApp.router(\n      title: 'Flutter Demo',\n      theme: ThemeData(\n        primarySwatch: Colors.blue,\n      ),\n      routerConfig: AppRouter.router,\n    );\n  }\n}\n`
                );

                // Create additional files
                await createRiverPodProjectFiles(projectPath, projectName);

                // Add riverpod and go_router dependencies using flutter pub add
                await runTerminalCommandWithTimeout(
                    `flutter pub add flutter_riverpod go_router`,
                    projectPath
                );

                // Remove the default test file
                const defaultTestFile = path.join(
                    projectPath,
                    "test",
                    "widget_test.dart"
                );
                if (fs.existsSync(defaultTestFile)) {
                    fs.unlinkSync(defaultTestFile); // Delete the default widget_test.dart
                }

                // Add custom test for HomeViewModel
                const homeViewModelTestFile = path.join(
                    projectPath,
                    "test",
                    "home_viewmodel_test.dart"
                );
                fs.writeFileSync(
                    homeViewModelTestFile,
                    getHomeViewModelTestTemplate(projectName)
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to create project: ${error.message}`
                );
                return;
            }
        }
    );

    // Helper function to create necessary project files
    const createRiverPodProjectFiles = async (
        projectPath: string,
        projectName: string
    ) => {
        const appClassName = projectName
            .replace(/_/g, " ")
            .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1))
            .replace(/\s/g, "");

        // Create core/router/app_router.dart
        const appRouterFile = path.join(
            projectPath,
            "lib",
            "core",
            "router",
            "app_router.dart"
        );
        fs.writeFileSync(
            appRouterFile,
            `import 'package:go_router/go_router.dart';\nimport '../../features/home/view/home_view.dart';\n\nclass AppRouter {\n  static final router = GoRouter(\n    routes: [\n      GoRoute(\n        path: '/',\n        builder: (context, state) => const HomeView(),\n      ),\n    ],\n  );\n}\n`
        );

        // Create features/home/view/home_view.dart
        const homeViewFile = path.join(
            projectPath,
            "lib",
            "features",
            "home",
            "view",
            "home_view.dart"
        );
        fs.writeFileSync(
            homeViewFile,
            `import 'package:flutter/material.dart';\nimport 'package:flutter_riverpod/flutter_riverpod.dart';\nimport '../viewmodel/home_viewmodel.dart';\n\nclass HomeView extends ConsumerWidget {\n  const HomeView({super.key});\n\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final viewModel = ref.watch(homeViewModelProvider);\n\n    return Scaffold(\n      appBar: AppBar(\n        title: const Text('Home View'),\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            Text(viewModel.message, style: const TextStyle(fontSize: 20)),\n            const SizedBox(height: 20),\n            Padding(\n              padding: const EdgeInsets.symmetric(horizontal: 50.0),\n              child: TextField(\n                controller: viewModel.textController,\n                decoration: const InputDecoration(\n                  border: OutlineInputBorder(),\n                  labelText: 'Enter new message',\n                ),\n              ),\n            ),\n            const SizedBox(height: 20),\n            ElevatedButton(\n              onPressed: () {\n                if (viewModel.textController.text.isNotEmpty) {\n                  viewModel.updateMessage(viewModel.textController.text);\n                  viewModel.textController.clear(); // Clear the TextField after updating\n                }\n              },\n              child: const Text('Update Message'),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}\n`
        );

        // Create features/home/viewmodel/home_viewmodel.dart
        const homeViewModelFile = path.join(
            projectPath,
            "lib",
            "features",
            "home",
            "viewmodel",
            "home_viewmodel.dart"
        );
        fs.writeFileSync(
            homeViewModelFile,
            `import 'package:flutter/material.dart';\nimport 'package:flutter_riverpod/flutter_riverpod.dart';\n\nclass HomeViewModel extends ChangeNotifier {\n  final TextEditingController textController = TextEditingController();\n  String _message = 'Hello, Riverpod!';\n\n  String get message => _message;\n\n  void updateMessage(String newMessage) {\n    _message = newMessage;\n    notifyListeners();\n  }\n}\n\nfinal homeViewModelProvider = ChangeNotifierProvider((ref) => HomeViewModel());\n`
        );

        // Create features/home/model/sample_model.dart
        const sampleModelFile = path.join(
            projectPath,
            "lib",
            "features",
            "home",
            "model",
            "sample_model.dart"
        );
        fs.writeFileSync(
            sampleModelFile,
            `class SampleModel {\n  final String message;\n  SampleModel(this.message);\n}\n`
        );
    };

    // Helper function to create HomeViewModel test
    const getHomeViewModelTestTemplate = (projectName: string) => {
        return (
            `import 'package:flutter_test/flutter_test.dart';\n` +
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
            `}\n`
        );
    };

    // Helper function to create necessary project files
    const createProjectFiles = async (
        projectPath: string,
        projectName: string
    ) => {
        const appClassName = projectName
            .replace(/_/g, " ")
            .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1))
            .replace(/\s/g, "");

        const launcherFile = path.join(projectPath, "lib", "app", "launcher.dart");
        fs.writeFileSync(
            launcherFile,
            `import 'package:flutter/material.dart';\nimport 'package:provider/provider.dart';\nimport 'provider_registry.dart';\nimport 'app.dart';\n\nvoid main() async {\n  WidgetsFlutterBinding.ensureInitialized();\n  runApp(\n    MultiProvider(\n      providers: ProviderRegistry.registeredProviders,\n      child: const ${appClassName}(),\n    ),\n  );\n}\n`
        );

        const appFile = path.join(projectPath, "lib", "app", "app.dart");
        fs.writeFileSync(
            appFile,
            `import 'package:flutter/material.dart';\nimport 'package:flutter/services.dart';\nimport 'codelytical_context_helper.dart';\nimport '../ui/screens/welcome_screen.dart';\n\nclass ${appClassName} extends StatelessWidget {\n  const ${appClassName}({super.key});\n  @override\n  Widget build(BuildContext context) {\n    var isDark = MediaQuery.of(context).platformBrightness == Brightness.dark;\n    return AnnotatedRegion<SystemUiOverlayStyle>(\n      value: SystemUiOverlayStyle(\n          statusBarBrightness: !isDark ? Brightness.light : Brightness.dark,\n          statusBarColor: Colors.transparent,\n          statusBarIconBrightness: isDark ? Brightness.light : Brightness.dark),\n      child: MaterialApp(\n          navigatorKey: CodeLyticalContextHelper.mainNavigatorKey,\n          debugShowCheckedModeBanner: false,\n          title: "CodeLytical Sample",\n          themeMode: ThemeMode.light,\n          home: const WelcomeScreen(),\n      ),\n    );\n  }\n}\n`
        );

        // Create app/provider_registry.dart
        const providersFile = path.join(
            projectPath,
            "lib",
            "app",
            "provider_registry.dart"
        );
        fs.writeFileSync(
            providersFile,
            `import 'package:provider/provider.dart';\nimport 'package:provider/single_child_widget.dart';\nimport 'provider_registry_export.dart';\n\nclass ProviderRegistry {\n  static List<SingleChildWidget> get registeredProviders => [\n    ChangeNotifierProvider(create: (_) => SampleController()),\n    // Add more providers here as needed\n  ];\n}\n`
        );

        // Create app/provider_registry_export.dart
        const providersExportFile = path.join(
            projectPath,
            "lib",
            "app",
            "provider_registry_export.dart"
        );
        fs.writeFileSync(
            providersExportFile,
            `// Exports for your controllers\nexport '../controllers/sample/sample_controller.dart';\n`
        );

        // Create controllers/sample/sample_controller.dart
        const sampleControllerFile = path.join(
            projectPath,
            "lib",
            "controllers",
            "sample",
            "sample_controller.dart"
        );
        fs.writeFileSync(
            sampleControllerFile,
            `import 'package:flutter/material.dart';\n\nclass SampleController extends ChangeNotifier {\n  String _message = 'CodeLytical is a YouTube channel';\n\n  String get message => _message;\n\n  void updateMessage(String newMessage) {\n    _message = newMessage;\n    notifyListeners();\n  }\n}\n`
        );

        // Create ui/screens/welcome_screen.dart
        const welcomeScreenFile = path.join(
            projectPath,
            "lib",
            "ui",
            "screens",
            "welcome_screen.dart"
        );
        fs.writeFileSync(
            welcomeScreenFile,
            `import 'package:flutter/material.dart';\nimport 'package:provider/provider.dart';\nimport '../../app/provider_registry_export.dart';\n\nclass WelcomeScreen extends StatelessWidget {\n  const WelcomeScreen({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    final sampleController = context.watch<SampleController>();\n    final TextEditingController textController = TextEditingController();\n\n    return Scaffold(\n      appBar: AppBar(\n        title: const Text('Welcome Screen'),\n      ),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            Text(sampleController.message,\n                style: const TextStyle(fontSize: 20)),\n            const SizedBox(height: 20),\n            Padding(\n              padding: const EdgeInsets.symmetric(horizontal: 50.0),\n              child: TextField(\n                controller: textController,\n                decoration: const InputDecoration(\n                  border: OutlineInputBorder(),\n                  labelText: 'Enter new message',\n                ),\n              ),\n            ),\n            const SizedBox(height: 20),\n            ElevatedButton(\n              onPressed: () {\n                if (textController.text.isNotEmpty) {\n                  sampleController.updateMessage(textController.text);\n                  textController.clear(); // Clear the TextField after updating\n                }\n              },\n              child: const Text('Update Message'),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}\n`
        );

        // Create app/codelytical_context_helper.dart
        const contextHelperFile = path.join(
            projectPath,
            "lib",
            "app",
            "codelytical_context_helper.dart"
        );
        fs.writeFileSync(
            contextHelperFile,
            `import 'package:flutter/material.dart';\n\nclass CodeLyticalContextHelper {\n  CodeLyticalContextHelper._();  // Private constructor to prevent instantiation\n\n  static final GlobalKey<NavigatorState> mainNavigatorKey = GlobalKey<NavigatorState>();\n\n  static BuildContext get currentBuildContext {\n    final context = mainNavigatorKey.currentContext;\n    if (context == null) {\n      throw StateError("Navigator key is not associated with any context.");\n    }\n    return context;\n  }\n}\n`
        );
    };

    // Helper function to create sample controller test
    const getSampleControllerTestTemplate = (projectName: string) => {
        return (
            `import 'package:${projectName}/controllers/sample/sample_controller.dart';\n` +
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
            `}\n`
        );
    };

    context.subscriptions.push(flutterCreate,
        flutterCreateCodeLytical,
        flutterCreateCodeLyticalRiverpod);
};

