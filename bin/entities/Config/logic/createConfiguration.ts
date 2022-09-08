import { parseCliArgs } from './parseCliArgs';

import { loadFile } from '../../../frameworks/filesystem/loadFile';
import { getFigmaDocumentId } from '../../../frameworks/string/getFigmaDocumentId';

import {
  MsgConfigDebugEnv,
  MsgConfigDebugCli,
  MsgConfigDebugRc,
  MsgConfigDebugFinal
} from '../../../frameworks/messages/messages';

import { ErrorCreateConfigurationNoDefault } from '../../../frameworks/errors/errors';

import { Config } from '../../../contracts/Config';

/**
 * @description Create Figmagic configuration object.
 *
 * Prioritization:
 * 1. User-provided configuration through `figmagic.json` or `.figmagicrc`
 * 2. Command-line arguments and flags
 * 3. Environment variables from `.env`
 * Non-provided values should fall back to defaults outlined in `bin/entities/Config/baseConfig.ts`
 */
export async function createConfiguration(
  baseConfig: Config,
  userConfigPath: string,
  cliArgs: string[]
): Promise<Config> {
  if (!baseConfig) throw Error(ErrorCreateConfigurationNoDefault);

  const defaultConfig: Config = baseConfig;

  // RC file configuration
  // @ts-ignore
  const rcConfig: Config = (() => {
    if (userConfigPath && userConfigPath !== '') {
      try {
        return loadFile(userConfigPath) as Config;
      } catch (e) {
        //
      }
    }
    return {};
  })();

  // Env var configuration
  const envConfig = {
    token: process.env.FIGMA_TOKEN || rcConfig.token || '',
    url: getEnvUrl(process.env.FIGMA_URL, rcConfig.url || '')
  };

  // CLI arguments configuration
  const cliConfig = parseCliArgs(cliArgs);

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
    ...defaultConfig,
    ...rcConfig,
    ...envConfig,
    ...cliConfig,
    templates: {
      ...defaultConfig.templates,
      ...rcConfig.templates,
      ...cliConfig.templates
    },
    skipFileGeneration: {
      ...defaultConfig.skipFileGeneration,
      ...rcConfig.skipFileGeneration,
      ...cliConfig.skipFileGeneration
    }
  };

  if (CONFIG.debugMode === true) printConfigs(envConfig, cliConfig, rcConfig, CONFIG);

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

const getEnvUrl = (processEnvUrl: string | undefined, rcConfigUrl: string | undefined) => {
  if (processEnvUrl) return getFigmaDocumentId(processEnvUrl);
  if (rcConfigUrl) return getFigmaDocumentId(rcConfigUrl);
  return '';
};
