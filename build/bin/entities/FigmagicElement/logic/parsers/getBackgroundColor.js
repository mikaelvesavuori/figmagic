"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBackgroundColor = void 0;
const createSolidColorString_1 = require("../../../../frameworks/string/createSolidColorString");
const createLinearGradientString_1 = require("../../../../frameworks/string/createLinearGradientString");
const errors_1 = require("../../../../frameworks/errors/errors");
function getBackgroundColor(element) {
    if (!element)
        throw new Error(errors_1.ErrorGetBackgroundColor);
    if (!element.fills || !element.fills[0] || !element.fills[0].type || element.type === 'TEXT')
        return null;
    const FILLS = element.fills[0];
    if (FILLS.type === 'SOLID')
        return createSolidColorString_1.createSolidColorString(FILLS);
    if (FILLS.type === 'GRADIENT_LINEAR')
        return createLinearGradientString_1.createLinearGradientString(FILLS);
    return null;
}
exports.getBackgroundColor = getBackgroundColor;
//# sourceMappingURL=getBackgroundColor.js.map