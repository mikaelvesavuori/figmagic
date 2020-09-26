"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const getDataLocal_1 = require("./getDataLocal");
const getDataRemote_1 = require("./getDataRemote");
const errors_1 = require("../errors/errors");
async function getData(recompileLocal, figmagicFolder, figmaData, token, url) {
    try {
        if (!recompileLocal && (!token || !url))
            throw new Error(errors_1.ErrorGetData);
        if (recompileLocal && (!figmagicFolder || !figmaData))
            throw new Error(errors_1.ErrorGetDataNoTokenOrUrl);
        const DATA = (async () => {
            if (recompileLocal)
                return getDataLocal_1.getDataLocal(figmagicFolder, figmaData);
            else {
                if (token && url)
                    return await getDataRemote_1.getDataRemote(token, url);
            }
            throw new Error(errors_1.ErrorGetDataFailedLocalAndRemote);
        })();
        if (!DATA)
            throw new Error(errors_1.ErrorGetDataNoData);
        return DATA;
    }
    catch (error) {
        throw new Error(errors_1.ErrorGetData);
    }
}
exports.getData = getData;
//# sourceMappingURL=getData.js.map