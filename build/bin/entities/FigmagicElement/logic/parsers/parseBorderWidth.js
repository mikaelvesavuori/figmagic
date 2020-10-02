"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBorderWidth = void 0;
const getTokenMatch_1 = require("../getTokenMatch");
const updateParsing_1 = require("./updateParsing");
const errors_1 = require("../../../../frameworks/errors/errors");
function parseBorderWidth(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseBorderWidth);
        const { borderWidths, borderWidth, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(borderWidths, 'borderWidths', 'border-width', borderWidth, remSize);
        return updateParsing_1.updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.parseBorderWidth = parseBorderWidth;
//# sourceMappingURL=parseBorderWidth.js.map