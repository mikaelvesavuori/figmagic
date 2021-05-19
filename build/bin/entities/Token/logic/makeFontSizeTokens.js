"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFontSizeTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeFontSizeTokens(fontSizeFrame, fontUnit, remSize) {
    if (!fontSizeFrame)
        throw new Error(errors_1.ErrorMakeFontSizeTokensNoFrame);
    if (!fontSizeFrame.children)
        throw new Error(errors_1.ErrorMakeFontSizeTokensNoChildren);
    if (!fontUnit || !remSize)
        throw new Error(errors_1.ErrorMakeFontSizeTokensNoSizing);
    const fontSizes = {};
    const TOKENS = fontSizeFrame.children;
    TOKENS.forEach((item) => makeFontSizeToken(item, fontSizes, remSize, fontUnit));
    return fontSizes;
}
exports.makeFontSizeTokens = makeFontSizeTokens;
function makeFontSizeToken(item, fontSizes, remSize, fontUnit) {
    if (!item.name || !item.style)
        throw new Error(errors_1.ErrorMakeFontSizeTokensMissingProps);
    if (!item.style.fontSize)
        throw new Error(errors_1.ErrorMakeFontSizeTokensMissingSize);
    const NAME = camelize_1.camelize(item.name);
    const FONT_SIZE = (() => {
        if (fontUnit === 'px')
            return item.style.fontSize + fontUnit;
        else
            return item.style.fontSize / remSize + fontUnit;
    })();
    fontSizes[NAME] = FONT_SIZE;
}
//# sourceMappingURL=makeFontSizeTokens.js.map