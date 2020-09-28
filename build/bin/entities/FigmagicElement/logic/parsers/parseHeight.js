"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHeight = void 0;
const getTokenMatch_1 = require("../getTokenMatch");
const errors_1 = require("../../../../frameworks/errors/errors");
const updateParsing_1 = require("./updateParsing");
function parseHeight(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseHeight);
        const { spacing, height, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(spacing, 'spacing', 'height', height, remSize);
        return updateParsing_1.updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseHeight);
    }
}
exports.parseHeight = parseHeight;
//# sourceMappingURL=parseHeight.js.map