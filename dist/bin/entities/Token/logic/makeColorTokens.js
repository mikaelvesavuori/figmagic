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
    TOKENS.forEach((item) => makeColorToken(item, colors));
    return colors;
}
exports.makeColorTokens = makeColorTokens;
function makeColorToken(item, colors) {
    if (!item.fills)
        throw new Error(errors_1.ErrorMakeColorTokensNoFills);
    if (!item.fills[0].color)
        throw new Error(errors_1.ErrorMakeColorTokensNoFills);
    const R = roundColorValue_1.roundColorValue(item.fills[0].color.r, 255);
    const G = roundColorValue_1.roundColorValue(item.fills[0].color.g, 255);
    const B = roundColorValue_1.roundColorValue(item.fills[0].color.b, 255);
    const A = roundColorValue_1.roundColorValue(item.opacity ? item.opacity : item.fills[0].color.a, 1);
    const NAME = camelize_1.camelize(item.name);
    colors[NAME] = `rgba(${R}, ${G}, ${B}, ${A})`;
}
//# sourceMappingURL=makeColorTokens.js.map