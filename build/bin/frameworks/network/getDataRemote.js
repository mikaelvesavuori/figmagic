"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataRemote = void 0;
const tslib_1 = require("tslib");
const getFromApi_1 = require("./getFromApi");
const errors_1 = require("../errors/errors");
const messages_1 = require("../messages/messages");
function getDataRemote(token, url, versionName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!token || !url)
                throw new Error(errors_1.ErrorGetDataNoTokenOrUrl);
            console.log(messages_1.MsgSetDataFromApi);
            let data = null;
            data = yield getFromApi_1.getFromApi(token, url, versionName);
            if (!data || data.status === 403)
                throw new Error(errors_1.ErrorGetData);
            return data;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getDataRemote = getDataRemote;
//# sourceMappingURL=getDataRemote.js.map