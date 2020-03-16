import { errorParseCliArgs } from '../meta/errors.mjs';

import {
  warnparseCliArgsOutputFormat,
  warnparseCliArgsFontUnit,
  warnparseCliArgsSpacingUnit
} from '../meta/warnings.mjs';

import { config } from '../meta/config.mjs';

/**
 * Parse CLI arguments and return settings object
 *
 * @exports
 * @function
 * @param {array} argsArray - Array of string arguments
 * @returns {object} - Returns settings object
 */
export function parseCliArgs(argsArray) {
  if (!argsArray) throw new Error(errorParseCliArgs);

  let settings = {};

  if (argsArray.length > 0) {
    argsArray.forEach((arg, index) => {
      // Toggle debug mode if requested
      if (arg === '--debug') {
        settings.debugMode = true;
      }
      // Toggle debug mode if requested
      else if (arg === '--recompileLocal') {
        settings.recompileLocal = true;
      }
      // Check and handle token format switch
      else if (arg === '--outputTokenFormat' || arg == '-tf') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'mjs' || FORMAT === 'js') {
          settings.outputTokenFormat = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnparseCliArgsOutputFormat);
          settings.outputTokenFormat = config.defaultOutputTokenFormat;
        }
      }
      // Check and handle font unit switch
      else if (arg === '--fontUnit' || arg == '-f') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'rem' || FORMAT === 'em') {
          settings.fontUnit = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnparseCliArgsFontUnit);
          settings.fontUnit = config.defaultFontUnit;
        }
      }
      // Check and handle spacing unit switch
      else if (arg === '--spacingUnit' || arg == '-s') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'rem' || FORMAT === 'em') {
          settings.spacingUnit = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnparseCliArgsSpacingUnit);
          settings.spacingUnit = config.defaultSpacingUnit;
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

  return settings;
}
