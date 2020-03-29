//import fs from 'fs';
import { loadFile } from '../filesystem/loadFile.mjs';
import { parseCliArgs } from './parseCliArgs.mjs';

import { errorCreateConfiguration } from '../../meta/errors.mjs';

import { config } from '../../meta/config.mjs';

/**
 * Create configuration object
 *
 * Prioritization:
 * 1. User-provided configuration through `.figmagicrc`
 * 2. Command-line arguments and flags
 * 3. Environment variables from `.env`
 * Non-provided values should fall back to defaults outlined in `meta/config.mjs`
 *
 * @exports
 * @async
 * @function
 * @param {string} userConfigPath - Path to user configuration file, based out of user's current working directory
 * @param {array} cliArgs - Array of any user-provided command line arguments and flags
 * @returns {object} - The final, validated and collated configuration object
 */
export async function createConfiguration(userConfigPath, ...cliArgs) {
  if (!userConfigPath) throw new Error(errorCreateConfiguration);

  // Set default values first
  const DEFAULT_CONFIG = {
    debugMode: false,
    fontUnit: config.defaultFontUnit,
    remSize: config.defaultRemSize,
    outputFileName: config.defaultOutputFileName,
    outputFolderBaseFile: config.defaultOutputFolderBaseFile,
    outputFolderTokens: config.defaultOutputFolderTokens,
    outputTokenFormat: config.defaultOutputTokenFormat,
    outputFolderElements: config.defaultOutputFolderElements,
    //outputFolderComponents: config.defaultOutputFolderComponents,
    outputFolderGraphics: config.defaultOutputFolderGraphics,
    outputFormatGraphics: config.defaultOutputFormatGraphics,
    outputScaleGraphics: config.defaultOutputScaleGraphics,
    recompileLocal: config.recompileLocal,
    spacingUnit: config.defaultSpacingUnit,
    syncElements: config.defaultSyncElements,
    syncGraphics: config.defaultSyncGraphics,
    templates: {
      templatePathReact: config.templates.defaultTemplatePathReact,
      templatePathStyled: config.templates.defaultTemplatePathStyled,
      templatePathStorybook: config.templates.defaultTemplatePathStorybook
    },
    token: process.env.FIGMA_TOKEN ? process.env.FIGMA_TOKEN : null,
    url: process.env.FIGMA_URL ? process.env.FIGMA_URL : null,
    usePostscriptFontNames: config.defaultUsePostscriptFontNames
  };

  // Env var configuration
  // Lowest priority
  const ENV_CONFIG = {
    token: DEFAULT_CONFIG.token,
    url: DEFAULT_CONFIG.url
  };

  // CLI arguments configuration
  // Medium priority
  const CLI_CONFIG = parseCliArgs(cliArgs);

  // RC file configuration is loaded below
  // Highest priority
  const RC_CONFIG = await loadFile(userConfigPath);

  // Merge configurations in order of prioritization
  const CONFIG = { ...DEFAULT_CONFIG, ...ENV_CONFIG, ...CLI_CONFIG, ...RC_CONFIG };

  /*
  // Set debug mode to correct setting
  process.env.FIGMA_DEBUG = CONFIG.debugMode;

  if (process.env.FIGMA_DEBUG === 'true') {
    console.log('USER: ENV_CONFIG');
    console.log(ENV_CONFIG);
    console.log('USER: CLI_CONFIG');
    console.log(CLI_CONFIG);
    //console.log('USER: RC_CONFIG');
    //console.log(RC_CONFIG);
    console.log('SYSTEM: FINAL CONFIG');
    console.log(CONFIG);
  }

  console.log('CONFIG');
	console.log(CONFIG);
	*/

  return CONFIG;
}
