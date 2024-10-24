export const COMMANDS = {
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

export const MESSAGES = {
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

export const PLATFORMS = ["Android", "iOS", "Web"];
export const ANDROID_BUILD_OPTIONS = ["APK", "App Bundle"];
export const APK_BUILD_TYPES = ["Debug", "Release"];
