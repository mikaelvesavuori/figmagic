"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfiguration = void 0;
const parseCliArgs_1 = require("./parseCliArgs");
const loadFile_1 = require("../../../frameworks/filesystem/loadFile");
const messages_1 = require("../../../frameworks/messages/messages");
const errors_1 = require("../../../frameworks/errors/errors");
async function createConfiguration(baseConfig, userConfigPath, cliArgs) {
    if (!baseConfig)
        throw new Error(errors_1.ErrorCreateConfigurationNoDefault);
    if (!userConfigPath)
        throw new Error(errors_1.ErrorCreateConfiguration);
    const DEFAULT_CONFIG = baseConfig;
    let RC_CONFIG = {};
    try {
        const _RC_CONFIG = loadFile_1.loadFile(userConfigPath);
        RC_CONFIG = _RC_CONFIG;
    }
    catch (e) { }
    const ENV_CONFIG = {
        token: process.env.FIGMA_TOKEN || null,
        url: process.env.FIGMA_URL || null
    };
    const CLI_CONFIG = parseCliArgs_1.parseCliArgs(cliArgs);
    const CONFIG = {
        ...DEFAULT_CONFIG,
        ...RC_CONFIG,
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
    if (CONFIG.debugMode === true)
        printConfigs(ENV_CONFIG, CLI_CONFIG, RC_CONFIG, CONFIG);
    return CONFIG;
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
//# sourceMappingURL=createConfiguration.js.map