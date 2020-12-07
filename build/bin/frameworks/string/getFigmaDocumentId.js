"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFigmaDocumentId = void 0;
const errors_1 = require("../../frameworks/errors/errors");
function getFigmaDocumentId(url) {
    if (!url)
        throw new Error(errors_1.ErrorGetFigmaDocumentId);
    if (!url.includes('https://www.figma.com/file/'))
        return url;
    return url.split('https://www.figma.com/file/')[1].split('/')[0];
}
exports.getFigmaDocumentId = getFigmaDocumentId;
//# sourceMappingURL=getFigmaDocumentId.js.map