import { Config } from '../../contracts/Config';

import { baseConfig } from './baseConfig';
import { createConfiguration } from './createConfiguration';

export class Configuration {
  userConfigPath: string;
  cliArgs: any[];
  config: Config;

  constructor(userConfigPath: string, ...cliArgs: any[]) {
    this.userConfigPath = userConfigPath;
    this.cliArgs = cliArgs;

    this.createConfig(baseConfig, userConfigPath, cliArgs);
  }

  private async createConfig(
    baseConfiguration: Config,
    userConfigPath: string,
    cliArgs: any[]
  ): Promise<void> {
    const config = await createConfiguration(baseConfiguration, userConfigPath, ...cliArgs);
    this.config = config;
  }

  getConfig(): Config {
    return this.config;
  }
}
