"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileList = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
const getFileList = (imageResponse, ids, outputFormatGraphics) => {
    if (!imageResponse || !ids || !outputFormatGraphics)
        throw new Error(errors_1.ErrorGetFileList);
    return Object.entries(imageResponse.images).map((image) => {
        const MATCH = ids.filter((id) => id.id === image[0]);
        return {
            url: image[1],
            file: `${camelize_1.camelize(MATCH[0].name)}.${outputFormatGraphics}`
        };
    });
};
exports.getFileList = getFileList;
//# sourceMappingURL=getFileList.js.map