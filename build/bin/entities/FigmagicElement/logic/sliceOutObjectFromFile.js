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
        const DATA = fs.readFileSync(path, 'utf8');
        if (!DATA)
            throw new Error(errors_1.ErrorSliceOutObjectFromFile);
        const SLICED_DATA = DATA.slice(DATA.indexOf('{'), DATA.indexOf('}') + 1);
        return JSON.parse(SLICED_DATA);
    }
    catch (error) {
        throw new Error(error);
    }
};
//# sourceMappingURL=sliceOutObjectFromFile.js.map