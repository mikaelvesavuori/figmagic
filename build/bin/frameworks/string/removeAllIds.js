"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllIds = void 0;
function removeAllIds(str) {
    return str.replace(/__#(.*?) /gi, ' ');
}
exports.removeAllIds = removeAllIds;
//# sourceMappingURL=removeAllIds.js.map