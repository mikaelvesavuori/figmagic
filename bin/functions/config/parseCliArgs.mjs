import { errorParseCliArgs } from '../../meta/errors.mjs';

import {
  warnParseCliArgsOutputFormat,
  warnParseCliArgsFontUnit,
  warnParseCliArgsOpacitiesUnit,
  warnParseCliArgsSpacingUnit
} from '../../meta/warnings.mjs';

import { defaultConfig } from '../../meta/config.mjs';

/**
 * Parse CLI arguments and return config object
 *
 * @exports
 * @function
 * @param {array} argsArray - Array of string arguments
 * @returns {object} - Returns config object
 * @throws {errorParseCliArgs} - Throws error if no arguments array is provided
 */
export function parseCliArgs(argsArray) {
  if (!argsArray) throw new Error(errorParseCliArgs);

  let config = {
    templates: {
      templatePathReact: defaultConfig.templates.defaultTemplatePathReact,
      templatePathStyled: defaultConfig.templates.defaultTemplatePathStyled,
      templatePathStorybook: defaultConfig.templates.defaultTemplatePathStorybook
    },
    skipFileGeneration: {
      react: defaultConfig.skipFileGeneration.defaultSkipReact,
      styled: defaultConfig.skipFileGeneration.defaultSkipStyled,
      css: defaultConfig.skipFileGeneration.defaultSkipCss,
      storybook: defaultConfig.skipFileGeneration.defaultSkipStorybook,
      description: defaultConfig.skipFileGeneration.defaultSkipDescription,
      forceUpdate: defaultConfig.skipFileGeneration.defaultForceUpdate
    }
  };

  if (argsArray.length > 0) {
    argsArray.forEach((arg, index) => {
      // Toggle debug mode if requested
      if (arg === '--debug') {
        config.debugMode = true;
      }
      // Recompile tokens from local Figma JSON file
      else if (arg === '--recompileLocal') {
        config.recompileLocal = true;
      }
      // Sync graphics from "Graphics" page in Figma
      else if (arg === '--syncGraphics') {
        config.syncGraphics = true;
      }
      // Sync elements from "Elements" page in Figma
      else if (arg === '--syncElements') {
        config.syncElements = true;
      }
      // Skip file generation: React
      else if (arg === '--skipReact') {
        config.skipFileGeneration.react = true;
      }
      // Skip file generation: Styled Components
      else if (arg === '--skipStyled') {
        config.skipFileGeneration.styled = true;
      }
      // Skip file generation: CSS
      else if (arg === '--skipCss') {
        config.skipFileGeneration.css = true;
      }
      // Skip file generation: Storybook
      else if (arg === '--skipStorybook') {
        config.skipFileGeneration.storybook = true;
      }
      // Skip file generation: Markdown description
      else if (arg === '--skipDescription') {
        config.skipFileGeneration.description = true;
      }
      // Force update all elements
      else if (arg === '--forceUpdate') {
        config.skipFileGeneration.forceUpdate = true;
      }
      // Check and handle token format switch
      else if (arg === '--outputTokenFormat' || arg == '-tf') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'mjs' || FORMAT === 'js') {
          config.outputTokenFormat = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnParseCliArgsOutputFormat);
          config.outputTokenFormat = defaultConfig.outputTokenFormat;
        }
      }
      // Check and handle font unit switch
      else if (arg === '--fontUnit' || arg == '-f') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'rem' || FORMAT === 'em') {
          config.fontUnit = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnParseCliArgsFontUnit);
          config.fontUnit = defaultConfig.fontUnit;
        }
      }
      // Check and handle opacities unit switch
      else if (arg === '--opacitiesUnit' || arg == '-ou') {
        let FORMAT = argsArray[index + 1].toLowerCase();
        if (!['float', 'percent'].includes(FORMAT)) {
          console.warn(warnParseCliArgsOpacitiesUnit);
          FORMAT = defaultConfig.opacitiesUnit;
        }
        config.opacitiesUnit = FORMAT;
      }
      // Check and handle spacing unit switch
      else if (arg === '--spacingUnit' || arg == '-s') {
        const FORMAT = argsArray[index + 1].toLowerCase();
        if (FORMAT === 'rem' || FORMAT === 'em') {
          config.spacingUnit = argsArray[index + 1].toLowerCase();
        } else {
          console.warn(warnParseCliArgsSpacingUnit);
          config.spacingUnit = defaultConfig.spacingUnit;
        }
      }
      // Handle input: Figma API token
      else if (arg === '--token' || arg == '-t') {
        config.token = argsArray[index + 1];
      }
      // Handle input: Figma URL
      else if (arg === '--url' || arg == '-u') {
        config.url = argsArray[index + 1];
      }
      // Handle input: Figma base file output folder
      else if (arg === '--outputFolderBaseFile' || arg == '-base') {
        config.outputFolderBaseFile = argsArray[index + 1];
      }
      // Handle input: token output folder
      else if (arg === '--outputFolderTokens' || arg == '-tokens') {
        config.outputFolderTokens = argsArray[index + 1];
      }
      // Handle input: element output folder
      else if (arg === '--outputFolderElements' || arg == '-elements') {
        config.outputFolderElements = argsArray[index + 1];
      }
      // Handle input: component output folder
      /*
      else if (arg === '--outputFolderComponents' || arg == '-components') {
        config.outputFolderComponents = argsArray[index + 1];
			}
			*/
      // Handle input: output file name
      else if (arg === '--outputFileName' || arg == '-file') {
        config.outputFileName = argsArray[index + 1];
      }
      // Handle input: output token data type
      else if (arg === '--outputTokenDataType' || arg == '-tokentype') {
        config.outputTokenDataType = argsArray[index + 1];
      }
      // Set font family name to be "common name" or Postscript name
      else if (arg === '--usePostscriptFontNames' || arg === '-ps') {
        config.usePostscriptFontNames = true;
      }
      // Set custom template path for React
      else if (arg === '--templatePathReact') {
        config.templates.templatePathReact = argsArray[index + 1];
      }
      // Set custom template path for Styled Components
      else if (arg === '--templatePathStyled') {
        config.templates.templatePathStyled = argsArray[index + 1];
      }
      // Set custom template path for Storybook
      else if (arg === '--templatePathStorybook') {
        config.templates.templatePathStorybook = argsArray[index + 1];
      }
    });
  }

  return config;
}
