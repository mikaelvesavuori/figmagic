"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromApi = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const errors_1 = require("../errors/errors");
function getFromApi(figmaToken, figmaUrl, versionName, type = 'files') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            let endpoint = `https://api.figma.com/v1/${type}/${figmaUrl}`;
            if (versionName) {
                const versions = yield node_fetch_1.default(`https://api.figma.com/v1/${type}/${figmaUrl}/versions`, {
                    headers: {
                        'X-Figma-Token': figmaToken
                    }
                })
                    .then((res) => res.json())
                    .catch(() => {
                    throw new Error(errors_1.ErrorGetFromApi);
                });
                const requestedVersion = versions.versions.filter((_version) => _version.label === versionName);
                const requestedVersionId = (() => {
                    if (requestedVersion && requestedVersion.length > 0) {
                        if (requestedVersion[0].id) {
                            return requestedVersion[0].id;
                        }
                    }
                })();
                endpoint = `https://api.figma.com/v1/${type}/${figmaUrl}?version=${requestedVersionId}`;
            }
            return yield node_fetch_1.default(endpoint, {
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
    });
}
exports.getFromApi = getFromApi;
//# sourceMappingURL=getFromApi.js.map