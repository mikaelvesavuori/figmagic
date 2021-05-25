#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const dotenv = tslib_1.__importStar(require("dotenv"));
const index_1 = require("./bin/entities/Config/index");
const FigmagicController_1 = require("./bin/controllers/FigmagicController");
const write_1 = require("./bin/frameworks/filesystem/write");
const getData_1 = require("./bin/frameworks/network/getData");
const writeBaseJson_1 = require("./bin/frameworks/filesystem/writeBaseJson");
const colors_1 = require("./bin/frameworks/system/colors");
const checkIfExists_1 = require("./bin/frameworks/filesystem/checkIfExists");
const configToInit_1 = require("./bin/frameworks/system/configToInit");
const messages_1 = require("./bin/frameworks/messages/messages");
const errors_1 = require("./bin/frameworks/errors/errors");
const RC_FILES = ['figmagic.json', '.figmagicrc'];
function main() {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            dotenv.config();
            const configFilePath = RC_FILES.filter((configFile) => {
                if (checkIfExists_1.checkIfExists(configFile))
                    return configFile;
            })[0];
            const [, , ...CLI_ARGS] = process.argv;
            if (((_a = CLI_ARGS[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'init')
                initConfig(configToInit_1.configToInit, RC_FILES[0]);
            else {
                if (!configFilePath)
                    throw new Error(errors_1.ErrorNoConfigFound);
                const USER_CONFIG_PATH = path.join(`${process.cwd()}`, configFilePath);
                const CONFIG = yield index_1.makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
                const { recompileLocal, figmagicFolder, figmaData, token, url, versionName } = CONFIG;
                const DATA = yield getData_1.getData(recompileLocal, figmagicFolder, figmaData, token, url, versionName);
                if (!recompileLocal)
                    yield writeBaseJson_1.writeBaseJson(figmagicFolder, figmaData, DATA);
                yield FigmagicController_1.FigmagicController(CONFIG, DATA);
            }
        }
        catch (error) {
            console.error(`${colors_1.colors.FgRed}${error}`);
        }
    });
}
function initConfig(file, configFilePath) {
    const FILE_EXISTS = checkIfExists_1.checkIfExists(configFilePath);
    if (!FILE_EXISTS) {
        write_1.write(configFilePath, JSON.stringify(file, null, ' '));
        console.log(messages_1.MsgJobCompleteInit);
        return;
    }
    console.log(messages_1.MsgJobCompleteInitStopped);
}
main();
//# sourceMappingURL=index.js.map