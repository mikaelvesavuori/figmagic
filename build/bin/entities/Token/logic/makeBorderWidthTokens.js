"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBorderWidthTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeBorderWidthTokens(borderWidthFrame) {
    if (!borderWidthFrame)
        throw new Error(errors_1.ErrorMakeBorderWidthTokensNoFrame);
    if (!borderWidthFrame.children)
        throw new Error(errors_1.ErrorMakeBorderWidthTokensNoChildren);
    const borderWidths = {};
    const TOKENS = borderWidthFrame.children;
    TOKENS.forEach((item) => makeBorderWidthToken(item, borderWidths));
    return borderWidths;
}
exports.makeBorderWidthTokens = makeBorderWidthTokens;
function makeBorderWidthToken(item, borderWidths) {
    if (!item.name || item.strokeWeight === undefined)
        throw new Error(errors_1.ErrorMakeBorderWidthTokensMissingProps);
    const NAME = camelize_1.camelize(item.name);
    borderWidths[NAME] = `${item.strokeWeight}px`;
}
//# sourceMappingURL=makeBorderWidthTokens.js.map