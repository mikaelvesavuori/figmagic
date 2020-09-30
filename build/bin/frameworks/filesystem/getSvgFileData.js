"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSvgFileData = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const errors_1 = require("../../frameworks/errors/errors");
function getSvgFileData(filePath) {
    if (!filePath)
        throw new Error(errors_1.ErrorGetSvgFileData);
    if (!fs_1.default.existsSync(filePath))
        return '';
    return fs_1.default.readFileSync(filePath, 'utf8');
}
exports.getSvgFileData = getSvgFileData;
//# sourceMappingURL=getSvgFileData.js.map