#!/bin/sh
"use strict";
':';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const dotenv = tslib_1.__importStar(require("dotenv"));
const index_1 = require("./bin/entities/Config/index");
const FigmagicController_1 = require("./bin/controllers/FigmagicController");
const getData_1 = require("./bin/frameworks/network/getData");
const writeBaseJson_1 = require("./bin/frameworks/filesystem/writeBaseJson");
const colors_1 = require("./bin/frameworks/system/colors");
async function main() {
    try {
        dotenv.config();
        const [, , ...CLI_ARGS] = process.argv;
        const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `.figmagicrc`);
        const CONFIG = await index_1.makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
        const { recompileLocal, outputFolderBaseFile, outputFileName, token, url } = CONFIG;
        const DATA = await getData_1.getData(recompileLocal, outputFolderBaseFile, outputFileName, token, url);
        if (!recompileLocal)
            await writeBaseJson_1.writeBaseJson(outputFolderBaseFile, outputFileName, DATA);
        await FigmagicController_1.FigmagicController(CONFIG, DATA);
    }
    catch (error) {
        console.error(`${colors_1.colors.FgRed}${error}`);
    }
}
main();
//# sourceMappingURL=index.js.map