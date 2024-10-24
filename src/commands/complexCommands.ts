import * as vscode from "vscode";
import * as path from "path";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { COMMANDS, MESSAGES } from "../constants";

// Helper function to convert snake_case to PascalCase
const toPascalCase = (str: string): string => {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
};

// Helper function to convert class name to snake_case file name
const classNameToFileName = (className: string): string => {
    const fileName = className
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toLowerCase();

    return `${fileName}.dart`;
};

// Helper function to convert snake_case to camelCase
const toCamelCase = (str: string): string => {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

// Helper function to generate model property with dynamic handling
const generateModelProperty = (key: string, value: any): string => {
    let type = 'dynamic'; // Default is dynamic
    if (typeof value === 'string') type = 'String';
    else if (typeof value === 'number') {
        type = Number.isInteger(value) ? 'int' : 'double';
    }
    else if (typeof value === 'boolean') type = 'bool';
    else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
            type = `List<${toPascalCase(key.slice(0, -1))}Model>`;
        } else {
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
const generateFromJson = (className: string, json: any): string => {
    let fromJsonContent = `  factory ${className}.fromJson(Map<String, dynamic> json) {\n    return ${className}(\n`;

    for (const [key, value] of Object.entries(json)) {
        const camelCaseKey = toCamelCase(key);

        // Check if the type is dynamic (no null checks for dynamic types)
        if (typeof value === 'string') {
            fromJsonContent += `      ${camelCaseKey}: json['${key}'] ?? "",\n`;
        } else if (typeof value === 'number') {
            fromJsonContent += `      ${camelCaseKey}: json['${key}'] ?? ${Number.isInteger(value) ? 0 : 0.0},\n`;
        } else if (typeof value === 'boolean') {
            fromJsonContent += `      ${camelCaseKey}: json['${key}'] ?? false,\n`;
        } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            const subClassName = `${toPascalCase(key.slice(0, -1))}Model`;
            fromJsonContent += `      ${camelCaseKey}: json.containsKey('${key}') && json['${key}'] != null\n` +
                `          ? List<${subClassName}>.from(json['${key}'].map((x) => ${subClassName}.fromJson(x as Map<String, dynamic>)))\n` +
                `          : [],\n`;
        } else if (typeof value === 'object' && value !== null) {
            const subClassName = `${toPascalCase(key)}Model`;
            fromJsonContent += `      ${camelCaseKey}: ${subClassName}.fromJson(json['${key}'] ?? {}),\n`;
        } else if (typeof value === 'object' || typeof value === 'undefined') {
            fromJsonContent += `      ${camelCaseKey}: json['${key}'],\n`; // No null check for dynamic
        }
    }

    fromJsonContent += '    );\n  }';
    return fromJsonContent;
};

// Helper function to generate nested models
const generateNestedModels = (json: any): string[] => {
    const models: string[] = [];

    for (const [key, value] of Object.entries(json)) {
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            const className = `${toPascalCase(key.slice(0, -1))}Model`;
            models.push(generateModel(className, value[0]));
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const className = `${toPascalCase(key)}Model`;
            models.push(generateModel(className, value));
        }
    }

    return models;
};

// Helper function to generate complete model
const generateModel = (className: string, json: any): string => {
    let modelContent = `class ${className} {\n`;

    // Properties
    for (const [key, value] of Object.entries(json)) {
        modelContent += generateModelProperty(key, value) + '\n';
    }

    // Constructor - Fixed to use actual class name instead of string interpolation
    modelContent += `\n  ${className}({\n`;  // Remove the $ and {}
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
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            modelContent += `        '${key}': ${camelCaseKey}?.toJson(),\n`;
        } else {
            modelContent += `        '${key}': ${camelCaseKey},\n`;
        }
    }
    modelContent += '      };\n';

    modelContent += '}\n';
    return modelContent;
};

// Helper function to find models directory
const findModelsDirectory = async (workspaceFolder: string): Promise<string | null> => {
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
        } catch (error) {
            // Directory doesn't exist, continue checking
        }
    }
    return null;
};

export const registerComplexCommands = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    // Generate JSON serialization code command
    let generateJsonModel = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_GENERATE_JSON_MODEL,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(MESSAGES.NO_WORKSPACE);
                return;
            }

            try {
                // Show input box for JSON
                const jsonInput = await vscode.window.showInputBox({
                    prompt: "Paste your JSON structure",
                    placeHolder: '{"key": "value"}',
                    ignoreFocusOut: true
                });

                if (!jsonInput) return;

                let jsonObject;
                try {
                    jsonObject = JSON.parse(jsonInput);
                } catch (parseError) {
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

                if (!className) return;

                // Find existing models directory
                const modelsDir = await findModelsDirectory(workspaceFolder);
                let targetDir: string;

                if (!modelsDir) {
                    // Ask user where to create the models directory
                    const selectedFolder = await vscode.window.showQuickPick(
                        [
                            'lib/models',
                            'lib/model',
                            'lib/src/models',
                            'lib/core/models',
                            'lib/data/models',
                            'Custom location...'
                        ],
                        {
                            placeHolder: 'Select where to create the models directory'
                        }
                    );

                    if (!selectedFolder) return;

                    if (selectedFolder === 'Custom location...') {
                        const customPath = await vscode.window.showInputBox({
                            prompt: "Enter the path relative to the project root (e.g., lib/core/models)",
                            placeHolder: 'lib/your/path/here'
                        });
                        if (!customPath) return;
                        targetDir = path.join(workspaceFolder, customPath);
                    } else {
                        targetDir = path.join(workspaceFolder, selectedFolder);
                    }

                    // Create directory recursively
                    await vscode.workspace.fs.createDirectory(vscode.Uri.file(targetDir));
                } else {
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
                const fileContent = new TextEncoder().encode(
                    `// Generated using Flux JSON Model Generator\n\n${modelContent}`
                );

                await vscode.workspace.fs.writeFile(newFile, fileContent);

                // Open the generated file
                const document = await vscode.workspace.openTextDocument(newFile);
                await vscode.window.showTextDocument(document);

                vscode.window.showInformationMessage(
                    `Successfully generated model in ${newFile.fsPath}`
                );

            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to generate model: ${error.message}`
                );
            }
        }
    );

    context.subscriptions.push(generateJsonModel);
};