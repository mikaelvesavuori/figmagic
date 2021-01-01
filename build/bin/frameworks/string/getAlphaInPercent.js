"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlphaInPercent = void 0;
const errors_1 = require("../../frameworks/errors/errors");
const getAlphaInPercent = (color) => {
    if (!color)
        throw new Error(errors_1.ErrorGetAlphaInPercent);
    const SECTIONED = color.split(',');
    return SECTIONED[SECTIONED.length - 1].replace(/ /gi, '').replace(')', '') * 100 + '%';
};
exports.getAlphaInPercent = getAlphaInPercent;
//# sourceMappingURL=getAlphaInPercent.js.map