"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBackgroundColor = void 0;
const getTokenMatch_1 = require("../getTokenMatch");
const updateParsing_1 = require("./updateParsing");
const errors_1 = require("../../../../frameworks/errors/errors");
function parseBackgroundColor(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseBackgroundColor);
        const { colors, backgroundColor, remSize } = params;
        const PROPERTY = backgroundColor.includes('gradient') ? 'background' : 'background-color';
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(colors, 'colors', PROPERTY, backgroundColor, remSize);
        return updateParsing_1.updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseBackgroundColor);
    }
}
exports.parseBackgroundColor = parseBackgroundColor;
//# sourceMappingURL=parseBackgroundColor.js.map