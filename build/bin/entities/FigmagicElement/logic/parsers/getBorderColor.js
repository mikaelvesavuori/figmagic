"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorderColor = void 0;
const roundColorValue_1 = require("../../../../frameworks/string/roundColorValue");
const errors_1 = require("../../../../frameworks/errors/errors");
function getBorderColor(element) {
    if (!element)
        throw new Error(errors_1.ErrorGetBorderColor);
    if (!(element.strokes && element.strokes.length > 0 && element.strokes[0].type === 'SOLID'))
        return null;
    if (!element.strokes[0].color)
        throw new Error('asdf');
    const R = roundColorValue_1.roundColorValue(element.strokes[0].color.r);
    const G = roundColorValue_1.roundColorValue(element.strokes[0].color.g);
    const B = roundColorValue_1.roundColorValue(element.strokes[0].color.b);
    const A = roundColorValue_1.roundColorValue(element.strokes[0].color.a, 1);
    return `rgba(${R}, ${G}, ${B}, ${A})`;
}
exports.getBorderColor = getBorderColor;
//# sourceMappingURL=getBorderColor.js.map