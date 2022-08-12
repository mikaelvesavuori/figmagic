import { Config } from '../../contracts/Config';

import { baseConfig } from './baseConfig';
import { createConfiguration } from './logic/createConfiguration';
import { validateConfig } from './logic/validateConfig';

export const makeConfiguration = async (
  userConfigPath: string,
  ...cliArgs: string[]
): Promise<Config> => {
  const config = new Configuration(userConfigPath, cliArgs);
  await config.createConfig();
  return config.getConfig();
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
    let config = null;

    config = await createConfiguration(this.baseConfiguration, this.userConfigPath, this.cliArgs);
    validateConfig(config);

    this.config = config;
    return this.getConfig();
  }

  getConfig(): Config {
    return this.config;
  }
}
