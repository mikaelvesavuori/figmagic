"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFile = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const errors_1 = require("../errors/errors");
function loadFile(path) {
    try {
        if (!path)
            throw new Error(errors_1.ErrorLoadFile(path));
        if (!fs.existsSync(path))
            throw new Error(errors_1.ErrorLoadFile(path));
        const DATA = fs.readFileSync(path, 'utf8');
        return isJsonString(DATA) ? JSON.parse(DATA) : DATA;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.loadFile = loadFile;
const isJsonString = (str) => {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
};
//# sourceMappingURL=loadFile.js.map