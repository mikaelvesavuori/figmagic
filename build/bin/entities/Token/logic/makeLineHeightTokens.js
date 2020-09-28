"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLineHeightTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const normalizeUnits_1 = require("../../../frameworks/string/normalizeUnits");
const errors_1 = require("../../../frameworks/errors/errors");
function makeLineHeightTokens(lineHeightFrame, remSize) {
    if (!lineHeightFrame)
        throw new Error(errors_1.ErrorMakeLineHeightTokensNoFrame);
    if (!lineHeightFrame.children)
        throw new Error(errors_1.ErrorMakeLineHeightTokensNoChildren);
    const lineHeights = {};
    const TOKENS = lineHeightFrame.children;
    TOKENS.forEach((item) => {
        if (!item.name || !item.style)
            throw new Error(errors_1.ErrorMakeLineHeightTokensMissingProps);
        if (!item.style.lineHeightPercentFontSize)
            throw new Error(errors_1.ErrorMakeLineHeightTokensMissingPercent);
        const NAME = camelize_1.camelize(item.name);
        const LINE_HEIGHT = normalizeUnits_1.normalizeUnits(item.style.lineHeightPercentFontSize, 'percent', 'unitless', remSize);
        const lineHeight = parseFloat(LINE_HEIGHT).toFixed(2);
        lineHeights[NAME] = lineHeight;
    });
    return lineHeights;
}
exports.makeLineHeightTokens = makeLineHeightTokens;
//# sourceMappingURL=makeLineHeightTokens.js.map