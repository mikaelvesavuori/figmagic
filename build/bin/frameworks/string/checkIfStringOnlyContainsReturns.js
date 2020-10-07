"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfStringOnlyContainsReturns = void 0;
function checkIfStringOnlyContainsReturns(str) {
    const HAS_RETURNS = str.match(/\n/gi);
    if (HAS_RETURNS)
        return false;
    str = str.replace(/\n/gi, '').replace(/ /gi, '');
    if (str.length > 0)
        return false;
    return true;
}
exports.checkIfStringOnlyContainsReturns = checkIfStringOnlyContainsReturns;
//# sourceMappingURL=checkIfStringOnlyContainsReturns.js.map