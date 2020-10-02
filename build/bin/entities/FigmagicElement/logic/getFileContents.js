"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileContents = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const sliceOutObjectFromFile_1 = require("./sliceOutObjectFromFile");
const errors_1 = require("../../../frameworks/errors/errors");
function getFileContents(filepath, filename, format) {
    try {
        if (!filepath || !filename || !format)
            throw new Error(errors_1.ErrorGetFileContents);
        const FILE = path.join(`${process.cwd()}`, filepath, `${filename}.${format}`);
        return sliceOutObjectFromFile_1.sliceOutObjectFromFile(FILE);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getFileContents = getFileContents;
//# sourceMappingURL=getFileContents.js.map