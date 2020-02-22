import { config } from './../meta/config.mjs';

/**
 * Parse CLI arguments and return settings object
 *
 * @exports
 * @function
 * @param {array} argsArray - Array of string arguments
 * @returns {object} - Returns settings object
 */
export function parseArgs(argsArray) {
	let settings = {
		debugMode: false,
		fontUnit: config.defaultFontUnit,
		outputFileName: config.outputOutputFileName,
		outputFolderBaseFile: config.defaultOutputFolderBaseFile,
		outputFolderTokens: config.defaultOutputFolderTokens,
		outputTokenFormat: config.defaultOutputTokenFormat,
		spacingUnit: config.defaultSpacingUnit,
		token: process.env.FIGMA_TOKEN ? process.env.FIGMA_TOKEN : null,
		url: process.env.FIGMA_URL ? process.env.FIGMA_URL : null
	};

	if (argsArray) {
		if (argsArray.length > 0) {
			argsArray.forEach((arg, index) => {
				// Toggle debug mode if requested
				if (arg === '--debug') {
					settings.debugMode = true;
				}
				// Check and handle token format switch
				else if (arg === '--tokenFormat' || arg == '-tf') {
					const FORMAT = argsArray[index + 1].toLowerCase();
					if (FORMAT === 'mjs' || FORMAT === 'js') {
						settings.outputFormat = argsArray[index + 1].toLowerCase();
					} else {
						console.warn(
							'Received unrecognized "outputFormat" argument, it must be "mjs" (default) or "js". Setting to default value...'
						);
					}
				}
				// Check and handle font unit switch
				else if (arg === '--fontUnit' || arg == '-f') {
					const FORMAT = argsArray[index + 1].toLowerCase();
					if (FORMAT === 'rem' || FORMAT === 'em') {
						settings.fontUnit = argsArray[index + 1].toLowerCase();
					} else {
						console.warn(
							'Received unrecognized "fontUnit" argument, it must be "rem" (default) or "em". Setting to default value...'
						);
					}
				}
				// Check and handle spacing unit switch
				else if (arg === '--spacingUnit' || arg == '-s') {
					const FORMAT = argsArray[index + 1].toLowerCase();
					if (FORMAT === 'rem' || FORMAT === 'em') {
						settings.spacingUnit = argsArray[index + 1].toLowerCase();
					} else {
						console.warn(
							'Received unrecognized "spacingUnit" argument, it must be "rem" (default) or "em". Setting to default value...'
						);
					}
				}
				// Handle input: Figma API token
				else if (arg === '--token' || arg == '-t') {
					settings.token = argsArray[index + 1];
				}
				// Handle input: Figma URL
				else if (arg === '--url' || arg == '-u') {
					settings.url = argsArray[index + 1];
				}
				// Handle input: Figma base file output folder
				else if (arg === '--outputFolderBaseFile' || arg == '-base') {
					settings.outputFolderBaseFile = argsArray[index + 1];
				}
				// Handle input: token output folder
				else if (arg === '--outputFolderTokens' || arg == '-tokens') {
					settings.outputFolderTokens = argsArray[index + 1];
				}
				// Handle input: output file name
				else if (arg === '--outputFileName' || arg == '-file') {
					settings.outputFileName = argsArray[index + 1];
				}
			});
		}
	}

	if (settings.debugMode) {
		console.log('USER CONFIGURATION');
		console.log(settings);
	}

	return settings;
}
