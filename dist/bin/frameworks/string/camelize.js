"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelize = void 0;
const errors_1 = require("../errors/errors");
function camelize(str) {
    if (!str)
        throw new Error(errors_1.ErrorCamelize);
    return (str
        .replace(/[A-Z]+/g, (word) => ' ' + word)
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .replace(/[a-zA-Z0-9]+/g, (word, index) => index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase())
        .replace(/ /g, ''));
}
exports.camelize = camelize;
//# sourceMappingURL=camelize.js.map