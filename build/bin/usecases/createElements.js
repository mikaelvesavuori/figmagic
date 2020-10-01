"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElements = void 0;
const createPage_1 = require("./interactors/common/createPage");
const processElements_1 = require("./interactors/elements/processElements");
const writeElements_1 = require("./interactors/elements/writeElements");
const processGraphicElementsMap_1 = require("./interactors/elements/processGraphicElementsMap");
const writeGraphicElementsMap_1 = require("./interactors/elements/writeGraphicElementsMap");
const refresh_1 = require("../frameworks/filesystem/refresh");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
async function createElements(config, data) {
    try {
        if (!config || !data)
            throw new Error(errors_1.ErrorCreateElements);
        console.log(messages_1.MsgSyncElements);
    }
    catch (error) {
        throw new Error(error);
    }
    try {
        await refresh_1.refresh(config.outputFolderElements);
        const { components } = data;
        const ELEMENTS_PAGE = createPage_1.createPage(data.document.children, 'Elements');
        const ELEMENTS = processElements_1.processElements(ELEMENTS_PAGE, config, components);
        writeElements_1.writeElements(ELEMENTS, config);
        if (config.outputGraphicElements &&
            config.outputFormatGraphics === 'svg' &&
            config.syncGraphics) {
            const GRAPHICS_PAGE = createPage_1.createPage(data.document.children, 'Graphics');
            const GRAPHICS = processElements_1.processElements(GRAPHICS_PAGE, config, components);
            writeElements_1.writeElements(GRAPHICS, config, true);
            if (config.outputGraphicElementsMap) {
                const FOLDER = `${config.outputFolderElements}/Graphics`;
                const FILE_PATH = `${FOLDER}/index.${config.outputFormatElements}`;
                const FILE_CONTENT = processGraphicElementsMap_1.processGraphicElementsMap(GRAPHICS);
                writeGraphicElementsMap_1.writeGraphicElementsMap(FOLDER, FILE_PATH, FILE_CONTENT);
            }
        }
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createElements = createElements;
//# sourceMappingURL=createElements.js.map