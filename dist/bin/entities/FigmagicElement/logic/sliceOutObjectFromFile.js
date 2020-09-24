"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliceOutObjectFromFile = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const errors_1 = require("../../../frameworks/errors/errors");
exports.sliceOutObjectFromFile = (path) => {
    try {
        if (!path)
            throw new Error(errors_1.ErrorSliceOutObjectFromFile);
        const _DATA = fs.readFileSync(path, 'utf8');
        const DATA = _DATA.slice(_DATA.indexOf('{'), _DATA.indexOf('}') + 1);
        return JSON.parse(DATA);
    }
    catch (error) {
        throw new Error(errors_1.ErrorSliceOutObjectFromFile);
    }
};
//# sourceMappingURL=sliceOutObjectFromFile.js.map