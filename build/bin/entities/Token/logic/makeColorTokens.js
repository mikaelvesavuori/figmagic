"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeColorTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const createSolidColorString_1 = require("../../../frameworks/string/createSolidColorString");
const createLinearGradientString_1 = require("../../../frameworks/string/createLinearGradientString");
const createRadialGradientString_1 = require("../../../frameworks/string/createRadialGradientString");
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
    if (!item.fills[0])
        throw new Error(errors_1.ErrorMakeColorTokensNoFills);
    const NAME = camelize_1.camelize(item.name);
    const FILLS = item.fills[0];
    if (FILLS.type === 'SOLID')
        colors[NAME] = createSolidColorString_1.createSolidColorString(FILLS);
    else if (FILLS.type === 'GRADIENT_LINEAR')
        colors[NAME] = createLinearGradientString_1.createLinearGradientString(FILLS);
    else if (FILLS.type === 'GRADIENT_RADIAL')
        colors[NAME] = createRadialGradientString_1.createRadialGradientString(FILLS);
}
//# sourceMappingURL=makeColorTokens.js.map