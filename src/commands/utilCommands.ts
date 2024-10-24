import * as vscode from "vscode";
import * as path from "path";
import { getWorkspaceFolder } from "../utils/workspaceUtils";
import { COMMANDS, MESSAGES } from "../constants";
import { exec } from 'child_process';
import { promisify } from 'util';
import { runTerminalCommand } from "../utils/terminalUtils";

const execPromise = promisify(exec);

// Helper function to find utils directory
const findUtilsDirectory = async (workspaceFolder: string): Promise<string | null> => {
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
        } catch (error) {
            // Directory doesn't exist, continue checking
        }
    }
    return null;
};

// Helper function to check if `intl` is already in pubspec.yaml
const checkForIntlInPubspec = async (workspaceFolder: string): Promise<boolean> => {
    const pubspecPath = path.join(workspaceFolder, 'pubspec.yaml');
    try {
        const pubspecFile = await vscode.workspace.fs.readFile(vscode.Uri.file(pubspecPath));
        const pubspecContent = pubspecFile.toString();
        return pubspecContent.includes('intl:');
    } catch (error) {
        // pubspec.yaml doesn't exist or can't be read
        return false;
    }
};

// Generate the utilities content
const generateUtilsContent = (): string => {
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

export const registerUtilsCommand = (context: vscode.ExtensionContext) => {
    const workspaceFolder = getWorkspaceFolder();

    let generateUtils = vscode.commands.registerCommand(
        COMMANDS.FLUTTER_GENERATE_UTILS,
        async () => {
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(MESSAGES.NO_WORKSPACE);
                return;
            }

            try {
                // Find existing utils directory
                const utilsDir = await findUtilsDirectory(workspaceFolder);
                let targetDir: string;

                if (!utilsDir) {
                    // Ask user where to create the utils directory
                    const selectedFolder = await vscode.window.showQuickPick(
                        [
                            'lib/utils',
                            'lib/util',
                            'lib/src/utils',
                            'lib/core/utils',
                            'lib/common/utils',
                            'lib/shared/utils',
                            'Custom location...'
                        ],
                        {
                            placeHolder: 'Select where to create the utils directory'
                        }
                    );

                    if (!selectedFolder) return;

                    if (selectedFolder === 'Custom location...') {
                        const customPath = await vscode.window.showInputBox({
                            prompt: "Enter the path relative to the project root (e.g., lib/core/utils)",
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
                    targetDir = utilsDir;
                }

                // Check if utils.dart already exists
                const utilsFile = vscode.Uri.file(path.join(targetDir, 'utils.dart'));
                try {
                    await vscode.workspace.fs.stat(utilsFile);
                    const overwrite = await vscode.window.showQuickPick(
                        ['Yes', 'No'],
                        {
                            placeHolder: 'utils.dart already exists. Do you want to overwrite it?'
                        }
                    );
                    if (overwrite !== 'Yes') return;
                } catch (error) {
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
                        await runTerminalCommand(command, workspaceFolder);
                        vscode.window.showInformationMessage('Successfully added intl package to your pubspec.yaml.');
                    } catch (error: any) {
                        vscode.window.showErrorMessage(`Failed to add intl package: ${error.message}`);
                    }
                } else {
                    vscode.window.showInformationMessage('intl package is already added.');
                }

                // Open the generated file
                const document = await vscode.workspace.openTextDocument(utilsFile);
                await vscode.window.showTextDocument(document);

                vscode.window.showInformationMessage(
                    `Successfully generated utils.dart in ${utilsFile.fsPath}`
                );

            } catch (error: any) {
                vscode.window.showErrorMessage(
                    `Failed to generate utils: ${error.message}`
                );
            }
        }
    );

    context.subscriptions.push(generateUtils);
};
