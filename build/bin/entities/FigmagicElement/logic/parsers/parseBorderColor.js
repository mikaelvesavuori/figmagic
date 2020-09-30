"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBorderColor = void 0;
const getTokenMatch_1 = require("../getTokenMatch");
const updateParsing_1 = require("./updateParsing");
const errors_1 = require("../../../../frameworks/errors/errors");
function parseBorderColor(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseBorderColor);
        const { colors, borderColor, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(colors, 'colors', 'border-color', borderColor, remSize);
        return updateParsing_1.updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseBorderColor);
    }
}
exports.parseBorderColor = parseBorderColor;
//# sourceMappingURL=parseBorderColor.js.map