import { loadFile } from '../../frameworks/filesystem/loadFile';
import { parseCliArgs } from './parseCliArgs';

import {
  MsgConfigDebugEnv,
  MsgConfigDebugCli,
  MsgConfigDebugRc,
  MsgConfigDebugFinal
} from '../../app/messages/messages';
import {
  ErrorCreateConfiguration,
  ErrorCreateConfigurationNoDefault
} from '../../app/errors/errors';

import { Config } from './Config';

/**
 * @description Create configuration object
 *
 * Prioritization:
 * 1. User-provided configuration through `.figmagicrc`
 * 2. Command-line arguments and flags
 * 3. Environment variables from `.env`
 * Non-provided values should fall back to defaults outlined in `meta/config.ts`
 *
 * @param defaultConfig Default configuration object
 * @param userConfigPath Path to user configuration file, based out of user's current working directory
 * @param cliArgs Array of any user-provided command line arguments and flags
 */
export async function createConfiguration(
  defaultConfig: Config,
  userConfigPath: string,
  ...cliArgs: any[]
): Promise<Config> {
  if (!defaultConfig) throw new Error(ErrorCreateConfigurationNoDefault);
  if (!userConfigPath) throw new Error(ErrorCreateConfiguration);

  // Set default values first
  const { outputFolderComponents, ...DEFAULT_CONFIG } = defaultConfig;

  // RC file configuration
  let RC_CONFIG: any = {};

  try {
    const rcConfig: Config = await loadFile(userConfigPath);
    RC_CONFIG = rcConfig;
  } catch (e) {} // eslint-disable-line no-empty

  // Env var configuration
  const ENV_CONFIG = {
    token: process.env.FIGMA_TOKEN || null,
    url: process.env.FIGMA_URL || null
  };

  // CLI arguments configuration
  const CLI_CONFIG = parseCliArgs(cliArgs) as Config;

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

  if (CONFIG.debugMode === true) printConfigs(ENV_CONFIG, CLI_CONFIG, RC_CONFIG, CONFIG);

  return CONFIG;
}

/**
 * @description TODO
 *
 * @param envConfig
 * @param cliConfig
 * @param rcConfig
 * @param config
 */
function printConfigs(
  envConfig: object,
  cliConfig: object,
  rcConfig: object,
  config: object
): void {
  console.log(MsgConfigDebugEnv);
  console.log(envConfig);
  console.log(MsgConfigDebugCli);
  console.log(cliConfig);
  console.log(MsgConfigDebugRc);
  console.log(rcConfig);
  console.log(MsgConfigDebugFinal);
  console.log(config);
}
