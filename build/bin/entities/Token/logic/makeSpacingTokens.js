"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSpacingTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const normalizeUnits_1 = require("../../../frameworks/string/normalizeUnits");
const errors_1 = require("../../../frameworks/errors/errors");
function makeSpacingTokens(spacingFrame, spacingUnit, remSize) {
    if (!spacingFrame)
        throw new Error(errors_1.ErrorMakeSpacingTokensNoFrame);
    if (!spacingFrame.children)
        throw new Error(errors_1.ErrorMakeSpacingTokensNoChildren);
    if (!spacingUnit || !remSize)
        throw new Error(errors_1.ErrorMakeSpacingTokensNoUnits);
    const spacings = {};
    const TOKENS = spacingFrame.children;
    TOKENS.forEach((item) => {
        const NAME = camelize_1.camelize(item.name);
        if (!item.absoluteBoundingBox || !item.absoluteBoundingBox.width)
            throw new Error(errors_1.ErrorMakeSpacingTokensNoFrame);
        const WIDTH = item.absoluteBoundingBox.width;
        const NORMALIZED_UNIT = normalizeUnits_1.normalizeUnits(WIDTH, 'px', spacingUnit, remSize);
        spacings[NAME] = NORMALIZED_UNIT;
    });
    return spacings;
}
exports.makeSpacingTokens = makeSpacingTokens;
//# sourceMappingURL=makeSpacingTokens.js.map