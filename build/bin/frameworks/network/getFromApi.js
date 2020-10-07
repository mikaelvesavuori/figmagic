"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromApi = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const errors_1 = require("../errors/errors");
async function getFromApi(figmaToken, figmaUrl, type = 'files') {
    try {
        if (!figmaToken || !figmaUrl)
            throw new Error(errors_1.ErrorGetFromApi);
        return await node_fetch_1.default(`https://api.figma.com/v1/${type}/${figmaUrl}`, {
            headers: {
                'X-Figma-Token': figmaToken
            }
        })
            .then((res) => res.json())
            .catch(() => {
            throw new Error(errors_1.ErrorGetFromApi);
        });
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getFromApi = getFromApi;
//# sourceMappingURL=getFromApi.js.map