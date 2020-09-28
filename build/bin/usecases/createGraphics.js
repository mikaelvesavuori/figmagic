"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphics = void 0;
const createPage_1 = require("./interactors/common/createPage");
const processGraphics_1 = require("./interactors/graphics/processGraphics");
const writeGraphics_1 = require("./interactors/graphics/writeGraphics");
const refresh_1 = require("../frameworks/filesystem/refresh");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
async function createGraphics(config, data) {
    try {
        if (!config || !data)
            throw new Error(errors_1.ErrorCreateGraphics);
        console.log(messages_1.MsgSyncGraphics);
        await refresh_1.refresh(config.outputFolderGraphics);
        const graphicsPage = createPage_1.createPage(data.document.children, 'Graphics');
        const fileList = await processGraphics_1.processGraphics(graphicsPage, config);
        await writeGraphics_1.writeGraphics(fileList, config);
    }
    catch (error) {
        throw new Error(errors_1.ErrorCreateGraphics);
    }
}
exports.createGraphics = createGraphics;
//# sourceMappingURL=createGraphics.js.map