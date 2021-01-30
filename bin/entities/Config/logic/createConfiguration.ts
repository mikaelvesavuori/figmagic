import { parseCliArgs } from './parseCliArgs';

import { loadFile } from '../../../frameworks/filesystem/loadFile';
import { getFigmaDocumentId } from '../../../frameworks/string/getFigmaDocumentId';

import {
  MsgConfigDebugEnv,
  MsgConfigDebugCli,
  MsgConfigDebugRc,
  MsgConfigDebugFinal
} from '../../../frameworks/messages/messages';

import {
  ErrorCreateConfiguration,
  ErrorCreateConfigurationNoDefault
} from '../../../frameworks/errors/errors';

import { Config } from '../../../contracts/Config';

/**
 * @description Create Figmagic configuration object.
 *
 * Prioritization:
 * 1. User-provided configuration through `.figmagicrc`
 * 2. Command-line arguments and flags
 * 3. Environment variables from `.env`
 * Non-provided values should fall back to defaults outlined in `bin/entities/Config/baseConfig.ts`
 */
export async function createConfiguration(
  baseConfig: Config,
  userConfigPath: string,
  cliArgs: string[]
): Promise<Config> {
  if (!baseConfig) throw new Error(ErrorCreateConfigurationNoDefault);
  if (!userConfigPath) throw new Error(ErrorCreateConfiguration);

  const DEFAULT_CONFIG: Config = baseConfig;

  // RC file configuration
  let RC_CONFIG: any = {};

  try {
    const _RC_CONFIG = loadFile(userConfigPath);
    RC_CONFIG = _RC_CONFIG as Config;
  } catch (e) {} // eslint-disable-line no-empty

  // Env var configuration
  const ENV_CONFIG = {
    token: process.env.FIGMA_TOKEN || RC_CONFIG.token || '',
    url: process.env.FIGMA_URL
      ? getFigmaDocumentId(process.env.FIGMA_URL)
      : RC_CONFIG.url
      ? getFigmaDocumentId(RC_CONFIG.url)
      : ''
  };

  // CLI arguments configuration
  const CLI_CONFIG = parseCliArgs(cliArgs) as Config;

  // Merge configurations in order of prioritization
  // 1. Default config
  // 2. Config file: next highest priority
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

function printConfigs(
  envConfig: Record<string, unknown>,
  cliConfig: Record<string, unknown>,
  rcConfig: Record<string, unknown>,
  config: Record<string, unknown>
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
