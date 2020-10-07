"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBaseJson = void 0;
const tslib_1 = require("tslib");
const refresh_1 = require("./refresh");
const write_1 = require("./write");
const messages_1 = require("../messages/messages");
const errors_1 = require("../errors/errors");
function writeBaseJson(figmagicFolder, figmaData, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!figmagicFolder || !figmaData || !data)
            throw new Error(errors_1.ErrorWriteBaseJson);
        console.log(messages_1.MsgWriteBaseFile);
        try {
            yield refresh_1.refresh(figmagicFolder);
            write_1.write(`${figmagicFolder}/${figmaData}`, JSON.stringify(data));
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.writeBaseJson = writeBaseJson;
//# sourceMappingURL=writeBaseJson.js.map