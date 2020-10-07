"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfStringOnlyContainsReturnsOrSpaces = void 0;
function checkIfStringOnlyContainsReturnsOrSpaces(str) {
    const HAS_RETURNS = str.match(/\n/gi);
    const HAS_SPACES = str.match(/ /gi);
    if (HAS_RETURNS && HAS_SPACES)
        return false;
    str = str.replace(/\n/gi, '').replace(/ /gi, '');
    if (str.length > 0)
        return false;
    return true;
}
exports.checkIfStringOnlyContainsReturnsOrSpaces = checkIfStringOnlyContainsReturnsOrSpaces;
//# sourceMappingURL=checkIfStringOnlyContainsReturnsOrSpaces.js.map