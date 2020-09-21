import { Config } from '../../contracts/Config';

import { baseConfig } from './baseConfig';
import { createConfiguration } from './logic/createConfiguration';

export const makeConfiguration = async (
  userConfigPath: string,
  ...cliArgs: string[]
): Promise<Config> => {
  const CONFIGURATION = new Configuration(userConfigPath, cliArgs);
  await CONFIGURATION.createConfig();
  return CONFIGURATION.getConfig();
};

class Configuration {
  baseConfiguration: Config;
  userConfigPath: string;
  cliArgs: string[];
  config: Config = baseConfig;

  constructor(userConfigPath: string, cliArgs: string[]) {
    this.baseConfiguration = baseConfig;
    this.userConfigPath = userConfigPath;
    this.cliArgs = cliArgs;
  }

  async createConfig(): Promise<Config> {
    const config = await createConfiguration(
      this.baseConfiguration,
      this.userConfigPath,
      this.cliArgs
    );

    this.config = config;
    return this.getConfig();
  }

  getConfig(): Config {
    return this.config;
  }
}
