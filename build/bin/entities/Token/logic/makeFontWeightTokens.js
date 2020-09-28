"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFontWeightTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeFontWeightTokens(fontWeightFrame) {
    if (!fontWeightFrame)
        throw new Error(errors_1.ErrorMakeFontWeightTokensNoFrame);
    if (!fontWeightFrame.children)
        throw new Error(errors_1.ErrorMakeFontWeightTokensNoChildren);
    const fontWeights = {};
    const TOKENS = fontWeightFrame.children;
    TOKENS.forEach((item) => {
        if (!item.name || !item.style)
            throw new Error(errors_1.ErrorMakeFontWeightTokensMissingProps);
        if (!item.style.fontWeight)
            throw new Error(errors_1.ErrorMakeFontWeightTokensMissingWeight);
        const NAME = camelize_1.camelize(item.name);
        fontWeights[NAME] = item.style.fontWeight;
    });
    return fontWeights;
}
exports.makeFontWeightTokens = makeFontWeightTokens;
//# sourceMappingURL=makeFontWeightTokens.js.map