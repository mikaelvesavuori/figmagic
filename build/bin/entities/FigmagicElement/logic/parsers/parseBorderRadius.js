"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBorderRadius = void 0;
const getTokenMatch_1 = require("../getTokenMatch");
const errors_1 = require("../../../../frameworks/errors/errors");
const updateParsing_1 = require("./updateParsing");
function parseBorderRadius(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseBorderRadius);
        const { radii, borderRadius, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(radii, 'radii', 'border-radius', borderRadius, remSize);
        return updateParsing_1.updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseBorderRadius);
    }
}
exports.parseBorderRadius = parseBorderRadius;
//# sourceMappingURL=parseBorderRadius.js.map