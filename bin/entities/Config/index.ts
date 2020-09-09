import { Config } from '../../contracts/Config';

import { baseConfig } from './baseConfig';
import { createConfiguration } from './logic/createConfiguration';

export class Configuration {
  baseConfiguration: Config;
  userConfigPath: string;
  cliArgs: any[];
  config: Config;

  constructor(userConfigPath: string, ...cliArgs: any[]) {
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
