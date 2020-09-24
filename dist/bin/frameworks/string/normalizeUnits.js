"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUnits = void 0;
const errors_1 = require("../errors/errors");
function normalizeUnits(value, currentUnit, newUnit, remSize) {
    if (!value || !currentUnit || !newUnit)
        throw new Error(errors_1.ErrorNormalizeUnits);
    let rootSize = undefined;
    let unitSize = undefined;
    if (currentUnit === 'px')
        rootSize = 1;
    if (currentUnit === 'percent')
        rootSize = 1;
    if (newUnit === 'rem' || newUnit === 'em') {
        if (!remSize)
            throw new Error(errors_1.ErrorNormalizeUnitsNoRemSize);
        unitSize = remSize;
    }
    if (newUnit === 'unitless')
        unitSize = value / 100;
    if (currentUnit === 'cornerRadius' && newUnit === 'adjustedRadius')
        return `${value}px`;
    if (rootSize === undefined || unitSize === undefined)
        throw new Error(errors_1.ErrorNormalizeUnitsUndefined);
    if (newUnit === 'unitless')
        return `${unitSize}`;
    else {
        const ADJUSTED_VALUE = value * (rootSize / unitSize);
        return `${ADJUSTED_VALUE}${newUnit}`;
    }
}
exports.normalizeUnits = normalizeUnits;
//# sourceMappingURL=normalizeUnits.js.map