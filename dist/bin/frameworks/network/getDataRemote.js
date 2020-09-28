"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataRemote = void 0;
const getFromApi_1 = require("./getFromApi");
const errors_1 = require("../errors/errors");
const messages_1 = require("../messages/messages");
async function getDataRemote(token, url) {
    try {
        if (!token || !url)
            throw new Error(errors_1.ErrorGetDataNoTokenOrUrl);
        console.log(messages_1.MsgSetDataFromApi);
        let data = null;
        data = await getFromApi_1.getFromApi(token, url);
        if (!data || data.status === 403)
            throw new Error(errors_1.ErrorGetData);
        return data;
    }
    catch (error) {
        throw new Error(errors_1.ErrorGetDataNoTokenOrUrl);
    }
}
exports.getDataRemote = getDataRemote;
//# sourceMappingURL=getDataRemote.js.map