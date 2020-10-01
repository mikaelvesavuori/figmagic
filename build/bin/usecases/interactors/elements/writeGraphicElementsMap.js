"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeGraphicElementsMap = void 0;
const createFolder_1 = require("../../../frameworks/filesystem/createFolder");
const write_1 = require("../../../frameworks/filesystem/write");
const errors_1 = require("../../../frameworks/errors/errors");
function writeGraphicElementsMap(folder, filePath, fileContent) {
    try {
        if (!folder || !filePath || !fileContent)
            throw new Error(errors_1.ErrorWriteGraphicElementsMap);
        createFolder_1.createFolder(folder);
        write_1.write(filePath, fileContent);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.writeGraphicElementsMap = writeGraphicElementsMap;
//# sourceMappingURL=writeGraphicElementsMap.js.map