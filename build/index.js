#! node
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
const messages_1 = require("./bin/frameworks/messages/messages");
const BASE_CONFIG = {
    templates: {
        templatePathReact: '/node_modules/figmagic/templates/react',
        templatePathStorybook: '/node_modules/figmagic/templates/story',
        templatePathStyled: '/node_modules/figmagic/templates/styled'
    }
};
const RC_FILE = '.figmagicrc';
async function main() {
    try {
        dotenv.config();
        const [, , ...CLI_ARGS] = process.argv;
        if (CLI_ARGS[0]?.toLowerCase() === 'init')
            initConfig(BASE_CONFIG);
        else {
            const USER_CONFIG_PATH = path.join(`${process.cwd()}`, RC_FILE);
            const CONFIG = await index_1.makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
            const { recompileLocal, figmagicFolder, figmaData, token, url } = CONFIG;
            const DATA = await getData_1.getData(recompileLocal, figmagicFolder, figmaData, token, url);
            if (!recompileLocal)
                await writeBaseJson_1.writeBaseJson(figmagicFolder, figmaData, DATA);
            await FigmagicController_1.FigmagicController(CONFIG, DATA);
        }
    }
    catch (error) {
        console.error(`${colors_1.colors.FgRed}${error}`);
    }
}
function initConfig(file) {
    const FILE_EXISTS = checkIfExists_1.checkIfExists(RC_FILE);
    if (!FILE_EXISTS) {
        write_1.write(RC_FILE, JSON.stringify(file, null, ' '));
        console.log(messages_1.MsgJobCompleteInit);
        return;
    }
    console.log(messages_1.MsgJobCompleteInitStopped);
}
main();
//# sourceMappingURL=index.js.map