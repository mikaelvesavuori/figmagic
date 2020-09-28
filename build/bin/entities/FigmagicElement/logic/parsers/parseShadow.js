"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseShadow = void 0;
const getTokenMatch_1 = require("../getTokenMatch");
const updateParsing_1 = require("./updateParsing");
const errors_1 = require("../../../../frameworks/errors/errors");
function parseShadow(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseShadow);
        const { shadows, shadow, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(shadows, 'shadows', 'box-shadow', shadow, remSize);
        return updateParsing_1.updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseShadow);
    }
}
exports.parseShadow = parseShadow;
//# sourceMappingURL=parseShadow.js.map