"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRgbaToHex = void 0;
const errors_1 = require("../../frameworks/errors/errors");
function convertRgbaToHex(color) {
    if (!color)
        throw new Error(errors_1.ErrorConvertRgbaToHex);
    const VALUES = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',');
    const A = parseFloat(VALUES[3] || 1), R = Math.floor(A * parseInt(VALUES[0]) + (1 - A) * 255), G = Math.floor(A * parseInt(VALUES[1]) + (1 - A) * 255), B = Math.floor(A * parseInt(VALUES[2]) + (1 - A) * 255);
    return ('#' +
        ('0' + R.toString(16)).slice(-2) +
        ('0' + G.toString(16)).slice(-2) +
        ('0' + B.toString(16)).slice(-2));
}
exports.convertRgbaToHex = convertRgbaToHex;
//# sourceMappingURL=convertRgbaToHex.js.map