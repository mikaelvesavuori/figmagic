"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanSvgData = void 0;
const errors_1 = require("../../frameworks/errors/errors");
function cleanSvgData(svgData) {
    if (!svgData)
        throw new Error(errors_1.ErrorCleanSvgData);
    return svgData.replace(/width="\w." /gi, '').replace(/height="\w." /gi, '');
}
exports.cleanSvgData = cleanSvgData;
//# sourceMappingURL=cleanSvgData.js.map