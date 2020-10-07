"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphics = void 0;
const tslib_1 = require("tslib");
const createPage_1 = require("./interactors/common/createPage");
const processGraphics_1 = require("./interactors/graphics/processGraphics");
const writeGraphics_1 = require("./interactors/graphics/writeGraphics");
const refresh_1 = require("../frameworks/filesystem/refresh");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
function createGraphics(config, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!config || !data)
                throw new Error(errors_1.ErrorCreateGraphics);
            console.log(messages_1.MsgSyncGraphics);
            yield refresh_1.refresh(config.outputFolderGraphics);
            const graphicsPage = createPage_1.createPage(data.document.children, 'Graphics');
            const fileList = yield processGraphics_1.processGraphics(graphicsPage, config);
            yield writeGraphics_1.writeGraphics(fileList, config);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createGraphics = createGraphics;
//# sourceMappingURL=createGraphics.js.map