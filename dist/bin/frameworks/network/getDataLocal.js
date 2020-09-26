"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataLocal = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const loadFile_1 = require("../filesystem/loadFile");
const messages_1 = require("../messages/messages");
const errors_1 = require("../errors/errors");
function getDataLocal(figmagicFolder, figmaData) {
    try {
        if (!figmagicFolder || !figmaData)
            throw new Error(errors_1.ErrorGetDataLocal);
        console.log(messages_1.MsgSetDataFromLocal);
        return loadFile_1.loadFile(path.join(`${figmagicFolder}`, `${figmaData}`));
    }
    catch (error) {
        throw new Error(errors_1.ErrorGetDataLocal);
    }
}
exports.getDataLocal = getDataLocal;
//# sourceMappingURL=getDataLocal.js.map