import * as vscode from "vscode";
import { registerBuildCommands } from "./commands/buildCommands";
import { registerDoctorCommand } from "./commands/doctorCommands";
import { registerPubCommands } from "./commands/pubCommands";
import { registerPodCommands } from "./commands/podCommands";
import { registerFlutterCommands } from "./commands/flutterCommands";
import { registerCreateCommands } from "./commands/createCommands";

export function activate(context: vscode.ExtensionContext) {
  registerBuildCommands(context);
  registerDoctorCommand(context);
  registerPubCommands(context);
  registerPodCommands(context);
  registerFlutterCommands(context);
  registerCreateCommands(context);
}

export function deactivate() { }
