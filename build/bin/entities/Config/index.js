"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfiguration = void 0;
const tslib_1 = require("tslib");
const baseConfig_1 = require("./baseConfig");
const createConfiguration_1 = require("./logic/createConfiguration");
const validateConfig_1 = require("./logic/validateConfig");
exports.makeConfiguration = (userConfigPath, ...cliArgs) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const CONFIGURATION = new Configuration(userConfigPath, cliArgs);
    yield CONFIGURATION.createConfig();
    return CONFIGURATION.getConfig();
});
class Configuration {
    constructor(userConfigPath, cliArgs) {
        this.config = baseConfig_1.baseConfig;
        this.baseConfiguration = baseConfig_1.baseConfig;
        this.userConfigPath = userConfigPath;
        this.cliArgs = cliArgs;
    }
    createConfig() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let config = null;
            try {
                config = yield createConfiguration_1.createConfiguration(this.baseConfiguration, this.userConfigPath, this.cliArgs);
            }
            catch (error) {
                throw new Error(error);
            }
            try {
                validateConfig_1.validateConfig(config);
            }
            catch (error) {
                throw new Error(error);
            }
            this.config = config;
            return this.getConfig();
        });
    }
    getConfig() {
        return this.config;
    }
}
//# sourceMappingURL=index.js.map