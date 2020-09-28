"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHexToRgba = void 0;
const roundColorValue_1 = require("./roundColorValue");
const errors_1 = require("../errors/errors");
function convertHexToRgba(r, g, b, a) {
    if (!r || !g || !b || !a)
        throw new Error(errors_1.ErrorConvertHexToRgba);
    const R = roundColorValue_1.roundColorValue(r, 255);
    const G = roundColorValue_1.roundColorValue(g, 255);
    const B = roundColorValue_1.roundColorValue(b, 255);
    const A = roundColorValue_1.roundColorValue(a, 1);
    return `rgba(${R}, ${G}, ${B}, ${A})`;
}
exports.convertHexToRgba = convertHexToRgba;
//# sourceMappingURL=convertHexToRgba.js.map