import * as vscode from "vscode";
import { registerBuildCommands } from "./commands/buildCommands";
import { registerDoctorCommand } from "./commands/doctorCommands";
import { registerPubCommands } from "./commands/pubCommands";
import { registerPodCommands } from "./commands/podCommands";
import { registerFlutterCommands } from "./commands/flutterCommands";
import { registerCreateCommands } from "./commands/createCommands";
import { registerDeviceManagementCommands } from "./commands/emulatorCommands";
import { registerComplexCommands } from "./commands/complexCommands";
import { registerUtilsCommand } from "./commands/utilCommands";
import { registerSetupCommands } from "./commands/stateManagementCommand";

export function activate(context: vscode.ExtensionContext) {
  registerBuildCommands(context);
  registerDoctorCommand(context);
  registerPubCommands(context);
  registerPodCommands(context);
  registerFlutterCommands(context);
  registerCreateCommands(context);
  registerDeviceManagementCommands(context);
  registerComplexCommands(context);
  registerUtilsCommand(context);
  registerSetupCommands(context);
}

export function deactivate() { }
