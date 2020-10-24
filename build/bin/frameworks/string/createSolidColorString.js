"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSolidColorString = void 0;
const roundColorValue_1 = require("../../frameworks/string/roundColorValue");
const errors_1 = require("../../frameworks/errors/errors");
function createSolidColorString(fills) {
    var _a, _b, _c, _d;
    if (!fills)
        throw new Error(errors_1.ErrorCreateSolidColorString);
    const R = roundColorValue_1.roundColorValue((_a = fills.color) === null || _a === void 0 ? void 0 : _a.r, 255);
    const G = roundColorValue_1.roundColorValue((_b = fills.color) === null || _b === void 0 ? void 0 : _b.g, 255);
    const B = roundColorValue_1.roundColorValue((_c = fills.color) === null || _c === void 0 ? void 0 : _c.b, 255);
    const A = roundColorValue_1.roundColorValue(fills.opacity ? fills.opacity : (_d = fills.color) === null || _d === void 0 ? void 0 : _d.a, 1);
    return `rgba(${R}, ${G}, ${B}, ${A})`;
}
exports.createSolidColorString = createSolidColorString;
//# sourceMappingURL=createSolidColorString.js.map