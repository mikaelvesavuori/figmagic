"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeGraphics = void 0;
const createFolder_1 = require("../../../frameworks/filesystem/createFolder");
const downloadFile_1 = require("../../../frameworks/network/downloadFile");
const errors_1 = require("../../../frameworks/errors/errors");
async function writeGraphics(fileList, config) {
    try {
        if (!fileList || !config)
            throw new Error(errors_1.ErrorWriteGraphics);
        const { outputFolderGraphics } = config;
        createFolder_1.createFolder(outputFolderGraphics);
        await Promise.all(fileList.map(async (file) => await downloadFile_1.downloadFile(file.url, `${outputFolderGraphics}/${file.file}`)));
    }
    catch (error) {
        throw new Error(errors_1.ErrorWriteGraphics);
    }
}
exports.writeGraphics = writeGraphics;
//# sourceMappingURL=writeGraphics.js.map