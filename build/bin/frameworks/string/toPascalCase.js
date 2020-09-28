"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascalCase = void 0;
const errors_1 = require("../errors/errors");
function toPascalCase(str) {
    if (!str)
        throw new Error(errors_1.ErrorToPascalCase);
    return str
        .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .replace(/\s+/g, '');
}
exports.toPascalCase = toPascalCase;
//# sourceMappingURL=toPascalCase.js.map