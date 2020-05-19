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
  // eslint-disable-next-line no-unused-vars
  const { outputFolderComponents, ...DEFAULT_CONFIG } = defaultConfig;

  // RC file configuration
  let RC_CONFIG = {};

  try {
    RC_CONFIG = await loadFile(userConfigPath);
  } catch (e) {} // eslint-disable-line no-empty

  // Env var configuration
  const ENV_CONFIG = {
    token: process.env.FIGMA_TOKEN || null,
    url: process.env.FIGMA_URL || null
  };

  // CLI arguments configuration
  const CLI_CONFIG = parseCliArgs(cliArgs);

  // Merge configurations in order of prioritization
  // 1. Base required config
  // 2. Config file: lowest priority
  // Versioned, "main" local config
  // NOTE: config is not deep-merged
  // 3. Environment config: medium priority
  // Specifically for credentials
  // 4. CLI arguments: highest priority
  // Allow to override on specific commands such as: "figmagic --debug --syncGraphics"
  const CONFIG = {
    ...DEFAULT_CONFIG,
    ...RC_CONFIG,
    ...ENV_CONFIG,
    ...CLI_CONFIG,
    templates: {
      ...DEFAULT_CONFIG.templates,
      ...RC_CONFIG.templates,
      ...CLI_CONFIG.templates
    },
    skipFileGeneration: {
      ...DEFAULT_CONFIG.skipFileGeneration,
      ...RC_CONFIG.skipFileGeneration,
      ...CLI_CONFIG.skipFileGeneration
    }
  };

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
