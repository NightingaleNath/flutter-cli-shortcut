(()=>{"use strict";var e={265:function(e,o,r){var t=this&&this.__createBinding||(Object.create?function(e,o,r,t){void 0===t&&(t=r);var n=Object.getOwnPropertyDescriptor(o,r);n&&!("get"in n?!o.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(e,t,n)}:function(e,o,r,t){void 0===t&&(t=r),e[t]=o[r]}),n=this&&this.__setModuleDefault||(Object.create?function(e,o){Object.defineProperty(e,"default",{enumerable:!0,value:o})}:function(e,o){e.default=o}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&t(o,e,r);return n(o,e),o};Object.defineProperty(o,"__esModule",{value:!0}),o.activate=function(e){const o=(e,o,r)=>{(0,l.exec)(e,{cwd:r},((e,r,t)=>{e?(a.window.showErrorMessage(`Error: ${t}`),console.error(`Error: ${t}`)):(a.window.showInformationMessage(o),console.log(`Output: ${r}`))}))},r=a.workspace.workspaceFolders?.[0]?.uri.fsPath;let t=a.commands.registerCommand("flutter-helper.flutterRun",(()=>{r?(0,l.exec)("flutter devices",{cwd:r},((e,t,n)=>{if(e)return a.window.showErrorMessage(`Error getting devices: ${n}`),void console.error(`Error: ${n}`);const s=t.split("\n").filter((e=>e.includes("•"))).map((e=>{const o=e.match(/• (.*?) \[(.*?)\]/);return o?{label:o[1],id:o[2]}:null})).filter((e=>null!==e));0!==s.length?a.window.showQuickPick(s.map((e=>e.label)),{placeHolder:"Select a device to run the app on"}).then((e=>{if(!e)return;const t=s.find((o=>o.label===e));t&&(a.window.showInformationMessage(`Running on ${t.label}...`),o(`flutter run -d ${t.id}`,`Flutter App Running on ${t.label}!`,r))})):a.window.showErrorMessage("No devices found. Please connect a device or start an emulator.")})):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),n=a.commands.registerCommand("flutter-helper.flutterPubGet",(()=>{r?(a.window.showInformationMessage('Running "flutter pub get"...'),o("flutter pub get","Flutter Pub Get Completed!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),s=a.commands.registerCommand("flutter-helper.flutterPubUpgrade",(()=>{r?(a.window.showInformationMessage('Running "flutter pub upgrade"...'),o("flutter pub upgrade","Flutter Pub Upgrade Completed!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),d=a.commands.registerCommand("flutter-helper.flutterClean",(()=>{r?(a.window.showInformationMessage('Running "flutter clean"...'),o("flutter clean","Flutter Clean Completed!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),u=a.commands.registerCommand("flutter-helper.flutterTest",(()=>{r?(a.window.showInformationMessage('Running "flutter test"...'),o("flutter test","Flutter Test Completed!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),c=a.commands.registerCommand("flutter-helper.flutterAnalyze",(()=>{r?(a.window.showInformationMessage('Running "flutter analyze"...'),o("flutter analyze","Flutter Analysis Completed!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),w=a.commands.registerCommand("flutter-helper.flutterCreate",(async()=>{const e=await a.window.showInputBox({prompt:"Enter the name of the new Flutter project"});e?r?(a.window.showInformationMessage(`Creating project "${e}"...`),o(`flutter create ${e}`,`Flutter Project "${e}" Created!`,r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder."):a.window.showErrorMessage("Project name is required.")})),p=a.commands.registerCommand("flutter-helper.flutterRunRelease",(()=>{r?(0,l.exec)("flutter devices",{cwd:r},((e,t,n)=>{if(e)return a.window.showErrorMessage(`Error getting devices: ${n}`),void console.error(`Error: ${n}`);const s=t.split("\n").filter((e=>e.includes("•"))).map((e=>{const o=e.match(/• (.*?) \[(.*?)\]/);return o?{label:o[1],id:o[2]}:null})).filter((e=>null!==e));0!==s.length?a.window.showQuickPick(s.map((e=>e.label)),{placeHolder:"Select a device to run the app on"}).then((e=>{if(!e)return;const t=s.find((o=>o.label===e));t&&(a.window.showInformationMessage(`Running on ${t.label} in release mode...`),o(`flutter run -d ${t.id} --release`,`Flutter App Running on ${t.label} in Release Mode!`,r))})):a.window.showErrorMessage("No devices found. Please connect a device or start an emulator.")})):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),f=a.commands.registerCommand("flutter-helper.flutterBuildApk",(()=>{r?(a.window.showInformationMessage("Building APK..."),o("flutter build apk","APK Built Successfully!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),m=a.commands.registerCommand("flutter-helper.flutterBuildIos",(()=>{r?(a.window.showInformationMessage("Building iOS app..."),o("flutter build ios","iOS App Built Successfully!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),h=a.commands.registerCommand("flutter-helper.flutterBuildAppBundle",(()=>{r?(a.window.showInformationMessage("Building App Bundle..."),o("flutter build appbundle","App Bundle Built Successfully!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),g=a.commands.registerCommand("flutter-helper.podInstall",(async()=>{if(!r)return void a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");const e=i.join(r,"ios");try{if((await a.workspace.fs.stat(a.Uri.file(e))).type!==a.FileType.Directory)return void a.window.showErrorMessage("No ios directory found. Please check your Flutter project.");a.window.showInformationMessage('Running "pod install"...'),o("pod install","Pod Install Completed!",e)}catch{a.window.showErrorMessage("No ios directory found. Please check your Flutter project.")}})),M=a.commands.registerCommand("flutter-helper.podInstallWithRepoUpdate",(async()=>{if(!r)return void a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");const e=i.join(r,"ios");try{if((await a.workspace.fs.stat(a.Uri.file(e))).type!==a.FileType.Directory)return void a.window.showErrorMessage("No ios directory found. Please check your Flutter project.");a.window.showInformationMessage('Running "pod install --repo-update"...'),o("pod install --repo-update","Pod Install with Repo Update Completed!",e)}catch{a.window.showErrorMessage("No ios directory found. Please check your Flutter project.")}})),P=a.commands.registerCommand("flutter-helper.podUpdate",(async()=>{if(!r)return void a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");const e=i.join(r,"ios");try{if((await a.workspace.fs.stat(a.Uri.file(e))).type!==a.FileType.Directory)return void a.window.showErrorMessage("No ios directory found. Please check your Flutter project.");a.window.showInformationMessage('Running "pod update"...'),o("pod update","Pod Update Completed!",e)}catch{a.window.showErrorMessage("No ios directory found. Please check your Flutter project.")}})),y=a.commands.registerCommand("flutter-helper.podRepoUpdate",(()=>{r?(a.window.showInformationMessage('Running "pod repo update"...'),o("pod repo update","Pod Repo Update Completed!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")})),b=a.commands.registerCommand("flutter-helper.flutterPubGlobalActivate",(async()=>{const e=await a.window.showInputBox({prompt:"Enter the name of the package to activate globally"});e?(a.window.showInformationMessage(`Activating package "${e}" globally...`),o(`flutter pub global activate ${e}`,`Package "${e}" Activated Globally!`,r)):a.window.showErrorMessage("Package name is required.")})),v=a.commands.registerCommand("flutter-helper.flutterChannel",(async()=>{if(!r)return void a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.");const e=await a.window.showQuickPick(["stable","beta","dev","master"],{placeHolder:"Select a Flutter channel to switch to"});e&&(a.window.showInformationMessage(`Switching to "${e}" channel...`),o(`flutter channel ${e}`,`Switched to "${e}" channel!`,r))})),k=a.commands.registerCommand("flutter-helper.flutterVersion",(()=>{r?(a.window.showInformationMessage("Getting current Flutter version..."),o("flutter --version","Flutter Version Retrieved!",r)):a.window.showErrorMessage("No workspace folder found. Please open a Flutter project folder.")}));e.subscriptions.push(t,n,s,d,u,c,w,p,f,m,h,g,M,P,y,b,v,k)},o.deactivate=function(){};const a=s(r(398)),l=r(317),i=s(r(928))},398:e=>{e.exports=require("vscode")},317:e=>{e.exports=require("child_process")},928:e=>{e.exports=require("path")}},o={},r=function r(t){var n=o[t];if(void 0!==n)return n.exports;var s=o[t]={exports:{}};return e[t].call(s.exports,s,s.exports,r),s.exports}(265);module.exports=r})();