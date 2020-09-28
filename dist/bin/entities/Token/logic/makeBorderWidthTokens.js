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
    TOKENS.forEach((item) => {
        if (!item.name || item.strokeWeight === undefined)
            throw new Error(errors_1.ErrorMakeBorderWidthTokensMissingProps);
        const NAME = camelize_1.camelize(item.name);
        borderWidths[NAME] = `${item.strokeWeight}px`;
    });
    return borderWidths;
}
exports.makeBorderWidthTokens = makeBorderWidthTokens;
//# sourceMappingURL=makeBorderWidthTokens.js.map