import { config } from './../meta/config.mjs';
import {
	warnParseArgsOutputFormat,
	warnParseArgsFontUnit,
	warnParseArgsSpacingUnit
} from '../meta/warnings.mjs';

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
		url: process.env.FIGMA_URL ? process.env.FIGMA_URL : null,
		usePostscriptFontNames: config.defaultUsePostscriptFontNames
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
						settings.outputTokenFormat = argsArray[index + 1].toLowerCase();
					} else {
						console.warn(warnParseArgsOutputFormat);
					}
				}
				// Check and handle font unit switch
				else if (arg === '--fontUnit' || arg == '-f') {
					const FORMAT = argsArray[index + 1].toLowerCase();
					if (FORMAT === 'rem' || FORMAT === 'em') {
						settings.fontUnit = argsArray[index + 1].toLowerCase();
					} else {
						console.warn(warnParseArgsFontUnit);
					}
				}
				// Check and handle spacing unit switch
				else if (arg === '--spacingUnit' || arg == '-s') {
					const FORMAT = argsArray[index + 1].toLowerCase();
					if (FORMAT === 'rem' || FORMAT === 'em') {
						settings.spacingUnit = argsArray[index + 1].toLowerCase();
					} else {
						console.warn(warnParseArgsSpacingUnit);
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
				// Set font family name to be "common name" or Postscript name
				else if (arg === '--usePostscriptFontNames' || arg === '-ps') {
					settings.usePostscriptFontNames = true;
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
