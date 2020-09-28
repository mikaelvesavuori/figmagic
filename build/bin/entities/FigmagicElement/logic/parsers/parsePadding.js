"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePadding = void 0;
const getTokenMatch_1 = require("../getTokenMatch");
const errors_1 = require("../../../../frameworks/errors/errors");
const updateParsing_1 = require("./updateParsing");
function parsePadding(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParsePadding);
        const { padding, spacing, remSize } = params;
        if (!(padding && Object.keys(padding).length > 0))
            return { css, imports };
        const PADDINGS = Object.values(padding).map((p) => p);
        if (PADDINGS.every((item) => item === 0))
            return updateParsing_1.updateParsing(css, null, imports, null);
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(spacing, 'spacing', 'padding', padding, remSize);
        return updateParsing_1.updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParsePadding);
    }
}
exports.parsePadding = parsePadding;
//# sourceMappingURL=parsePadding.js.map