"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfiguration = void 0;
const baseConfig_1 = require("./baseConfig");
const createConfiguration_1 = require("./logic/createConfiguration");
exports.makeConfiguration = async (userConfigPath, ...cliArgs) => {
    const CONFIGURATION = new Configuration(userConfigPath, cliArgs);
    await CONFIGURATION.createConfig();
    return CONFIGURATION.getConfig();
};
class Configuration {
    constructor(userConfigPath, cliArgs) {
        this.config = baseConfig_1.baseConfig;
        this.baseConfiguration = baseConfig_1.baseConfig;
        this.userConfigPath = userConfigPath;
        this.cliArgs = cliArgs;
    }
    async createConfig() {
        const config = await createConfiguration_1.createConfiguration(this.baseConfiguration, this.userConfigPath, this.cliArgs);
        this.config = config;
        return this.getConfig();
    }
    getConfig() {
        return this.config;
    }
}
//# sourceMappingURL=index.js.map