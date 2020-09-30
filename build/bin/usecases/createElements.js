"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElements = void 0;
const createPage_1 = require("./interactors/common/createPage");
const processElements_1 = require("./interactors/elements/processElements");
const writeElements_1 = require("./interactors/elements/writeElements");
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
        if (config.outputFormatGraphics === 'svg' && config.syncGraphics) {
            const GRAPHICS_PAGE = createPage_1.createPage(data.document.children, 'Graphics');
            const GRAPHICS = processElements_1.processElements(GRAPHICS_PAGE, config, components);
            writeElements_1.writeElements(GRAPHICS, config, true);
        }
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createElements = createElements;
//# sourceMappingURL=createElements.js.map