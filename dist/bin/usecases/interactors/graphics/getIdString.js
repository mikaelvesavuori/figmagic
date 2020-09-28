"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdString = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
exports.getIdString = (ids) => {
    if (!ids)
        throw new Error(errors_1.ErrorGetIdstring);
    let idString = '';
    ids.forEach((item) => (idString += `${item.id},`));
    return idString.slice(0, idString.length - 1);
};
//# sourceMappingURL=getIdString.js.map