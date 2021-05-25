"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfiguration = void 0;
const tslib_1 = require("tslib");
const parseCliArgs_1 = require("./parseCliArgs");
const loadFile_1 = require("../../../frameworks/filesystem/loadFile");
const getFigmaDocumentId_1 = require("../../../frameworks/string/getFigmaDocumentId");
const messages_1 = require("../../../frameworks/messages/messages");
const errors_1 = require("../../../frameworks/errors/errors");
function createConfiguration(baseConfig, userConfigPath, cliArgs) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!baseConfig)
            throw new Error(errors_1.ErrorCreateConfigurationNoDefault);
        const DEFAULT_CONFIG = baseConfig;
        let RC_CONFIG = {};
        if (userConfigPath && userConfigPath !== '') {
            try {
                const _RC_CONFIG = loadFile_1.loadFile(userConfigPath);
                RC_CONFIG = _RC_CONFIG;
            }
            catch (e) { }
        }
        const ENV_CONFIG = {
            token: process.env.FIGMA_TOKEN || RC_CONFIG.token || '',
            url: getEnvUrl(process.env.FIGMA_URL, RC_CONFIG.url)
        };
        const CLI_CONFIG = parseCliArgs_1.parseCliArgs(cliArgs);
        const CONFIG = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, DEFAULT_CONFIG), RC_CONFIG), ENV_CONFIG), CLI_CONFIG), { templates: Object.assign(Object.assign(Object.assign({}, DEFAULT_CONFIG.templates), RC_CONFIG.templates), CLI_CONFIG.templates), skipFileGeneration: Object.assign(Object.assign(Object.assign({}, DEFAULT_CONFIG.skipFileGeneration), RC_CONFIG.skipFileGeneration), CLI_CONFIG.skipFileGeneration) });
        if (CONFIG.debugMode === true)
            printConfigs(ENV_CONFIG, CLI_CONFIG, RC_CONFIG, CONFIG);
        return CONFIG;
    });
}
exports.createConfiguration = createConfiguration;
function printConfigs(envConfig, cliConfig, rcConfig, config) {
    console.log(messages_1.MsgConfigDebugEnv);
    console.log(envConfig);
    console.log(messages_1.MsgConfigDebugCli);
    console.log(cliConfig);
    console.log(messages_1.MsgConfigDebugRc);
    console.log(rcConfig);
    console.log(messages_1.MsgConfigDebugFinal);
    console.log(config);
}
const getEnvUrl = (processEnvUrl, rcConfigUrl) => {
    return processEnvUrl
        ? getFigmaDocumentId_1.getFigmaDocumentId(processEnvUrl)
        : rcConfigUrl
            ? getFigmaDocumentId_1.getFigmaDocumentId(rcConfigUrl)
            : '';
};
//# sourceMappingURL=createConfiguration.js.map