import { errorParseCliArgs } from '../../meta/errors.mjs';

import {
  warnParseCliArgsOutputFormat,
  warnParseCliArgsFontUnit,
  warnParseCliArgsSpacingUnit
} from '../../meta/warnings.mjs';

import { config } from '../../meta/config.mjs';

/**
 * Parse CLI arguments and return settings object
 *
 * @exports
 * @function
 * @param {array} argsArray - Array of string arguments
 * @returns {object} - Returns settings object
 * @throws {errorParseCliArgs} - Throws error if no arguments array is provided
 */
export function parseCliArgs(argsArray) {
  if (!argsArray) throw new Error(errorParseCliArgs);

  let settings = {};
  settings.templates = {};
  settings.skipFileGeneration = {};

  if (argsArray.length > 0) {
    argsArray.forEach((arg, index) => {
      // Toggle debug mode if requested
      if (arg === '--debug') {
        settings.debugMode = true;
      }
      // Recompile tokens from local Figma JSON file
      else if (arg === '--recompileLocal') {
        settings.recompileLocal = true;
      }
      // Sync graphics from "Graphics" page in Figma
      else if (arg === '--syncGraphics') {
        settings.syncGraphics = true;
      }
      // Sync elements from "Elements" page in Figma
      else if (arg === '--syncElements') {
        settings.syncElements = true;
      }
      // Skip file generation: React
      else if (arg === '--skipReact') {
        settings.skipFileGeneration.react = true;
      }
      // Skip file generation: Styled Components
      else if (arg === '--skipStyled') {
        settings.skipFileGeneration.styled = true;
      }
      // Skip file generation: CSS
      else if (arg === '--skipCss') {
        settings.skipFileGeneration.css = true;
      }
      // Skip file generation: Storybook
      else if (arg === '--skipStorybook') {
        settings.skipFileGeneration.storybook = true;
      }
      // Skip file generation: Markdown description
      else if (arg === '--skipDescription') {
        settings.skipFileGeneration.description = true;
      }
      // Check and handle token format switch
      else if (arg === '--outputTokenFormat' || arg == '-tf') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'mjs' || FORMAT === 'js') {
          settings.outputTokenFormat = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnParseCliArgsOutputFormat);
          settings.outputTokenFormat = config.defaultOutputTokenFormat;
        }
      }
      // Check and handle font unit switch
      else if (arg === '--fontUnit' || arg == '-f') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'rem' || FORMAT === 'em') {
          settings.fontUnit = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnParseCliArgsFontUnit);
          settings.fontUnit = config.defaultFontUnit;
        }
      }
      // Check and handle spacing unit switch
      else if (arg === '--spacingUnit' || arg == '-s') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'rem' || FORMAT === 'em') {
          settings.spacingUnit = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnParseCliArgsSpacingUnit);
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
      // Handle input: element output folder
      else if (arg === '--outputFolderElements' || arg == '-elements') {
        settings.outputFolderElements = argsArray[index + 1];
      }
      // Handle input: component output folder
      /*
      else if (arg === '--outputFolderComponents' || arg == '-components') {
        settings.outputFolderComponents = argsArray[index + 1];
			}
			*/
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
