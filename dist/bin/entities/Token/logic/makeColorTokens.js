"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeColorTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const roundColorValue_1 = require("../../../frameworks/string/roundColorValue");
const errors_1 = require("../../../frameworks/errors/errors");
function makeColorTokens(colorFrame) {
    if (!colorFrame)
        throw new Error(errors_1.ErrorMakeColorTokensNoFrame);
    if (!colorFrame.children)
        throw new Error(errors_1.ErrorMakeColorTokensNoChildren);
    const colors = {};
    const TOKENS = colorFrame.children;
    TOKENS.forEach((item) => {
        if (!item.fills)
            throw new Error(errors_1.ErrorMakeColorTokensNoFills);
        if (!item.fills[0].color)
            throw new Error(errors_1.ErrorMakeColorTokensNoFills);
        const ALPHA = item.opacity ? item.opacity : item.fills[0].color.a;
        const _R = item.fills[0].color.r;
        const _G = item.fills[0].color.g;
        const _B = item.fills[0].color.b;
        const COLOR_STRING = `rgba(${roundColorValue_1.roundColorValue(_R, 255)}, ${roundColorValue_1.roundColorValue(_G, 255)}, ${roundColorValue_1.roundColorValue(_B, 255)}, ${roundColorValue_1.roundColorValue(ALPHA, 1)})`;
        const NAME = camelize_1.camelize(item.name);
        colors[NAME] = COLOR_STRING;
    });
    return colors;
}
exports.makeColorTokens = makeColorTokens;
//# sourceMappingURL=makeColorTokens.js.map