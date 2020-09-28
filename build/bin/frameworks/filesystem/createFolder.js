"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const errors_1 = require("../errors/errors");
function createFolder(dir) {
    try {
        if (!dir)
            throw new Error(errors_1.ErrorCreateFolder);
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, { recursive: true });
    }
    catch (error) {
        throw new Error(errors_1.ErrorCreateFolder);
    }
}
exports.createFolder = createFolder;
//# sourceMappingURL=createFolder.js.map