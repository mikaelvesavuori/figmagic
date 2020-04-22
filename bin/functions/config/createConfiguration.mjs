//import fs from 'fs';
import { loadFile } from '../filesystem/loadFile.mjs';
import { parseCliArgs } from './parseCliArgs.mjs';

import {
  msgConfigDebugEnv,
  msgConfigDebugCli,
  msgConfigDebugRc,
  msgConfigDebugFinal
} from '../../meta/messages.mjs';
import { errorCreateConfiguration } from '../../meta/errors.mjs';

import { defaultConfig } from '../../meta/config.mjs';

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
 * @throws {errorCreateConfiguration} - Throws error when missing configuration
 */
export async function createConfiguration(userConfigPath, ...cliArgs) {
  if (!userConfigPath) throw new Error(errorCreateConfiguration);

  // Set default values first
  const DEFAULT_CONFIG = {
    debugMode: defaultConfig.debugMode,
    fontUnit: defaultConfig.fontUnit,
    remSize: defaultConfig.remSize,
    outputFileName: defaultConfig.outputFileName,
    outputFolderBaseFile: defaultConfig.outputFolderBaseFile,
    outputFolderTokens: defaultConfig.outputFolderTokens,
    outputTokenFormat: defaultConfig.outputTokenFormat,
    outputTokenDataType: defaultConfig.outputTokenDataType,
    outputFolderElements: defaultConfig.outputFolderElements,
    //outputFolderComponents: defaultConfig.outputFolderComponents,
    outputFolderGraphics: defaultConfig.outputFolderGraphics,
    outputFormatGraphics: defaultConfig.outputFormatGraphics,
    outputScaleGraphics: defaultConfig.outputScaleGraphics,
    recompileLocal: defaultConfig.recompileLocal,
    spacingUnit: defaultConfig.spacingUnit,
    syncElements: defaultConfig.syncElements,
    syncGraphics: defaultConfig.syncGraphics,
    // > NOTE: Import "templates" and "skipFileGeneration" in parseCliArgs.mjs so they don't get squashed if inserted here
    token: process.env.FIGMA_TOKEN ? process.env.FIGMA_TOKEN : null,
    url: process.env.FIGMA_URL ? process.env.FIGMA_URL : null,
    usePostscriptFontNames: defaultConfig.usePostscriptFontNames
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

  // RC file configuration
  // Highest priority
  const RC_CONFIG = await (async () => {
    try {
      return await loadFile(userConfigPath);
    } catch (error) {
      return null;
    }
  })();

  // Merge configurations in order of prioritization
  const CONFIG = { ...DEFAULT_CONFIG, ...ENV_CONFIG, ...CLI_CONFIG, ...RC_CONFIG };

  if (CONFIG.debugMode === true) {
    console.log(msgConfigDebugEnv);
    console.log(ENV_CONFIG);
    console.log(msgConfigDebugCli);
    console.log(CLI_CONFIG);
    console.log(msgConfigDebugRc);
    console.log(RC_CONFIG);
    console.log(msgConfigDebugFinal);
    console.log(CONFIG);
  }

  return CONFIG;
}
