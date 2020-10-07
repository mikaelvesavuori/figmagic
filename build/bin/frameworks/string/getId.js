"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
function getId(str) {
    const MATCH = str.match(/__#(.*?) /gi);
    if (MATCH)
        return MATCH[0].replace('__#', '');
    return null;
}
exports.getId = getId;
//# sourceMappingURL=getId.js.map