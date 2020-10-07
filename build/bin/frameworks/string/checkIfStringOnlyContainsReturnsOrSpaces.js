"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfStringOnlyContainsReturnsOrSpaces = void 0;
const errors_1 = require("../../../bin/frameworks/errors/errors");
function checkIfStringOnlyContainsReturnsOrSpaces(str) {
    if (!str)
        throw new Error(errors_1.ErrorCheckIfStringOnlyContainsReturnsOrSpaces);
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