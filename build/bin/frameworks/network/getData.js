"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const tslib_1 = require("tslib");
const getDataLocal_1 = require("./getDataLocal");
const getDataRemote_1 = require("./getDataRemote");
const errors_1 = require("../errors/errors");
function getData(recompileLocal, figmagicFolder, figmaData, token, url) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!recompileLocal && (!token || !url))
                throw new Error(errors_1.ErrorGetData);
            if (recompileLocal && (!figmagicFolder || !figmaData))
                throw new Error(errors_1.ErrorGetDataNoTokenOrUrl);
            const DATA = (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (recompileLocal)
                    return getDataLocal_1.getDataLocal(figmagicFolder, figmaData);
                else if (token && url)
                    return yield getDataRemote_1.getDataRemote(token, url);
                throw new Error(errors_1.ErrorGetDataFailedLocalAndRemote);
            }))();
            if (!DATA)
                throw new Error(errors_1.ErrorGetDataNoData);
            return DATA;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getData = getData;
//# sourceMappingURL=getData.js.map