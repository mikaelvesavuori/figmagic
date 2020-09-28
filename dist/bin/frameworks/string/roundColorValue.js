"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundColorValue = void 0;
const errors_1 = require("../errors/errors");
function roundColorValue(quantity = 0.0, scale = 255) {
    if (scale < 0 || scale > 255)
        throw new Error(errors_1.ErrorRoundColorValue);
    const MIN_VALUE = 0.0;
    const MAX_VALUE = 1.0;
    if (quantity < MIN_VALUE)
        quantity = MIN_VALUE;
    if (quantity > MAX_VALUE)
        quantity = MAX_VALUE;
    if (scale <= 1.0)
        return parseFloat(quantity.toFixed(2));
    return parseFloat((quantity * scale).toFixed(0));
}
exports.roundColorValue = roundColorValue;
//# sourceMappingURL=roundColorValue.js.map