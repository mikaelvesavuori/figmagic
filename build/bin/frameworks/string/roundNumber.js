"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundNumber = void 0;
function roundNumber(num, decimals = 6) {
    const n = num.toFixed(decimals);
    return parseFloat(n);
}
exports.roundNumber = roundNumber;
//# sourceMappingURL=roundNumber.js.map