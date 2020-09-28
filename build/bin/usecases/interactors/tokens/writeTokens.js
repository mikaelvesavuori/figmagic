"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTokens = void 0;
const writeFile_1 = require("../../../frameworks/filesystem/writeFile");
const errors_1 = require("../../../frameworks/errors/errors");
function writeTokens(processedTokens) {
    try {
        if (!processedTokens)
            throw new Error(errors_1.ErrorWriteTokens);
        processedTokens.forEach((token) => writeFile_1.writeFile(token));
    }
    catch (error) {
        throw new Error(errors_1.ErrorWriteTokens);
    }
}
exports.writeTokens = writeTokens;
//# sourceMappingURL=writeTokens.js.map