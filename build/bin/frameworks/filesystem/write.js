"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const errors_1 = require("../errors/errors");
function write(filePath, fileContent) {
    try {
        if (!filePath || !fileContent)
            throw new Error(errors_1.ErrorWrite);
        fs.writeFileSync(filePath, fileContent, 'utf-8');
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.write = write;
//# sourceMappingURL=write.js.map