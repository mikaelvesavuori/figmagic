"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnumStringOutOfObject = void 0;
const errors_1 = require("../errors/errors");
function createEnumStringOutOfObject(obj) {
    if (!obj)
        throw new Error(errors_1.ErrorCreateEnumStringOutOfObject);
    return Object.entries(obj).reduce((acc, [key, value]) => {
        return `${acc}\n  '${key}' = '${value}',`;
    }, '');
}
exports.createEnumStringOutOfObject = createEnumStringOutOfObject;
//# sourceMappingURL=createEnumStringOutOfObject.js.map