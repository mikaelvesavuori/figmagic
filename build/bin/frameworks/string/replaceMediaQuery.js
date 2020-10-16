"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceMediaQuery = void 0;
const errors_1 = require("../errors/errors");
function replaceMediaQuery(str, match) {
    if (!str || !match)
        throw new Error(errors_1.ErrorReplaceMediaQuery);
    const INDEX = str.indexOf(match);
    if (INDEX === -1)
        return str;
    const QUERY_TYPE = match === '@upto' ? 'max' : 'min';
    const SLICE_START = match.length + 1;
    const SLICE_LENGTH = SLICE_START + 6;
    const QUERY = str.slice(INDEX, INDEX + SLICE_LENGTH);
    let size = QUERY.slice(SLICE_START, SLICE_LENGTH);
    const REMAINDER = QUERY.replace(match, '');
    size = size.replace(/![0-9]/gi, '').trim();
    return str
        .replace(match, `@media query and (${QUERY_TYPE}-width: ${size}px) {`)
        .replace(REMAINDER, '');
}
exports.replaceMediaQuery = replaceMediaQuery;
//# sourceMappingURL=replaceMediaQuery.js.map