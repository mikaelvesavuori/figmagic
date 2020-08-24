import { ErrorParseCliArgs } from '../../../app/errors/errors';

import {
  WarnParseCliArgsOutputFormat,
  WarnParseCliArgsFontUnit,
  WarnParseCliArgsOpacitiesUnit,
  WarnParseCliArgsLetterSpacingUnit,
  WarnParseCliArgsSpacingUnit
} from '../../frameworks/warnings/warnings';

import { defaultConfig } from './config';

/**
 * @description Parse CLI arguments and return config object
 *
 * @param argsArray Array of string arguments
 */
export function parseCliArgs(argsArray: any[]): any {
  if (!argsArray) throw new Error(ErrorParseCliArgs);

  let config = {};

  if (argsArray.length > 0) {
    config = argsArray.reduce(
      // Reducer: Add specific keys to the accumulated config when known arguments match
      (accumulatedConfig, arg, index) => {
        switch (arg) {
          // Toggle debug mode if requested
          case '--debug':
            accumulatedConfig.debugMode = true;
            break;
          // Recompile tokens from local Figma JSON file
          case '--recompileLocal':
            accumulatedConfig.recompileLocal = true;
            break;
          // Sync graphics from "Graphics" page in Figma
          case '--syncGraphics':
            accumulatedConfig.syncGraphics = true;
            break;
          // Sync elements from "Elements" page in Figma
          case '--syncElements':
            accumulatedConfig.syncElements = true;
            break;
          // Skip file generation: React
          case '--skipReact':
            accumulatedConfig.skipFileGeneration = {
              ...accumulatedConfig.skipFileGeneration,
              skipReact: true
            };
            break;
          // Skip file generation: Styled Components
          case '--skipStyled':
            accumulatedConfig.skipFileGeneration = {
              ...accumulatedConfig.skipFileGeneration,
              skipStyled: true
            };
            break;
          // Skip file generation: CSS
          case '--skipCss':
            accumulatedConfig.skipFileGeneration = {
              ...accumulatedConfig.skipFileGeneration,
              skipCss: true
            };
            break;
          // Skip file generation: Storybook
          case '--skipStorybook':
            accumulatedConfig.skipFileGeneration = {
              ...accumulatedConfig.skipFileGeneration,
              skipStorybook: true
            };
            break;
          // Skip file generation: Markdown description
          case '--skipDescription':
            accumulatedConfig.skipFileGeneration = {
              ...accumulatedConfig.skipFileGeneration,
              skipDescription: true
            };
            break;
          // Force update all elements
          case '--forceUpdate':
            accumulatedConfig.skipFileGeneration = {
              ...accumulatedConfig.skipFileGeneration,
              forceUpdate: true
            };
            break;
          // Check and handle token format switch
          case '--outputTokenFormat':
          case '-tf': {
            let outputTokenFormat = argsArray[index + 1].toLowerCase();
            if (!['mjs', 'js'].includes(outputTokenFormat)) {
              console.warn(WarnParseCliArgsOutputFormat);
              outputTokenFormat = defaultConfig.outputTokenFormat;
            }
            accumulatedConfig.outputTokenFormat = outputTokenFormat;
            break;
          }
          // Check and handle font unit switch
          case '--fontUnit':
          case '-f': {
            let fontUnit = argsArray[index + 1].toLowerCase();
            if (!['rem', 'em'].includes(fontUnit)) {
              console.warn(WarnParseCliArgsFontUnit);
              fontUnit = defaultConfig.fontUnit;
            }
            accumulatedConfig.fontUnit = fontUnit;
            break;
          }
          // Check and handle letter-spacing unit switch
          case '--letterSpacingUnit':
          case '-lsu': {
            let letterSpacingUnit = argsArray[index + 1].toLowerCase();
            if (!['em', 'px'].includes(letterSpacingUnit)) {
              console.warn(WarnParseCliArgsLetterSpacingUnit);
              letterSpacingUnit = defaultConfig.letterSpacingUnit;
            }
            accumulatedConfig.letterSpacingUnit = letterSpacingUnit;
            break;
          }
          // Check and handle opacities unit switch
          case '--opacitiesUnit':
          case '-ou': {
            let opacitiesUnit = argsArray[index + 1].toLowerCase();
            if (!['float', 'percent'].includes(opacitiesUnit)) {
              console.warn(WarnParseCliArgsOpacitiesUnit);
              opacitiesUnit = defaultConfig.opacitiesUnit;
            }
            accumulatedConfig.opacitiesUnit = opacitiesUnit;
            break;
          }
          // Check and handle spacing unit switch
          case '--spacingUnit':
          case '-s': {
            let spacingUnit = argsArray[index + 1].toLowerCase();
            if (!['rem', 'em'].includes(spacingUnit)) {
              console.warn(WarnParseCliArgsSpacingUnit);
              spacingUnit = defaultConfig.spacingUnit;
            }
            accumulatedConfig.spacingUnit = spacingUnit;
            break;
          }
          // Handle input: Figma API token
          case '--token':
          case '-t':
            accumulatedConfig.token = argsArray[index + 1];
            break;
          // Handle input: Figma URL
          case '--url':
          case '-u':
            accumulatedConfig.url = argsArray[index + 1];
            break;
          // Handle input: Figma base file output folder
          case '--outputFolderBaseFile':
          case '-base':
            accumulatedConfig.outputFolderBaseFile = argsArray[index + 1];
            break;
          // Handle input: token output folder
          case '--outputFolderTokens':
          case '-tokens':
            accumulatedConfig.outputFolderTokens = argsArray[index + 1];
            break;
          // Handle input: element output folder
          case '--outputFolderElements':
          case '-elements':
            accumulatedConfig.outputFolderElements = argsArray[index + 1];
            break;
          // Handle input: output file name
          case '--outputFileName':
          case '-file':
            accumulatedConfig.outputFileName = argsArray[index + 1];
            break;
          // Handle input: output token data type
          case '--outputTokenDataType':
          case '-tokentype':
            accumulatedConfig.outputTokenDataType = argsArray[index + 1];
            break;
          // Set font family name to be "common name" or Postscript name
          case '--usePostscriptFontNames':
          case '-ps':
            accumulatedConfig.usePostscriptFontNames = true;
            break;
          // Set custom template path for React
          case '--templatePathReact':
            accumulatedConfig.templates = {
              ...accumulatedConfig.templates,
              templatePathReact: argsArray[index + 1]
            };
            break;
          // Set custom template path for Styled Components
          case '--templatePathStyled':
            accumulatedConfig.templates = {
              ...accumulatedConfig.templates,
              templatePathStyled: argsArray[index + 1]
            };
            break;
          // Set custom template path for Storybook
          case '--templatePathStorybook':
            accumulatedConfig.templates = {
              ...accumulatedConfig.templates,
              templatePathStorybook: argsArray[index + 1]
            };
            break;
        }

        return accumulatedConfig;
      },
      // initial object: empty config
      {}
    );
  }

  return config;
}
