"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBaseJson = void 0;
const refresh_1 = require("./refresh");
const write_1 = require("./write");
const messages_1 = require("../messages/messages");
const errors_1 = require("../errors/errors");
async function writeBaseJson(figmagicFolder, figmaData, data) {
    if (!figmagicFolder || !figmaData || !data)
        throw new Error(errors_1.ErrorWriteBaseJson);
    console.log(messages_1.MsgWriteBaseFile);
    try {
        await refresh_1.refresh(figmagicFolder);
        write_1.write(`${figmagicFolder}/${figmaData}`, JSON.stringify(data));
    }
    catch (error) {
        throw new Error(errors_1.ErrorWriteBaseJson);
    }
}
exports.writeBaseJson = writeBaseJson;
//# sourceMappingURL=writeBaseJson.js.map