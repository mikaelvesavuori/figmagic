"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGraphics = void 0;
const tslib_1 = require("tslib");
const getIds_1 = require("./getIds");
const getIdString_1 = require("./getIdString");
const getFileList_1 = require("./getFileList");
const getFromApi_1 = require("../../../frameworks/network/getFromApi");
const errors_1 = require("../../../frameworks/errors/errors");
function processGraphics(graphicsPage, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!graphicsPage)
            throw new Error(errors_1.ErrorProcessGraphics);
        const { token, url, outputFormatGraphics, outputScaleGraphics, versionName } = config;
        if (!token)
            throw new Error(errors_1.ErrorProcessGraphics);
        if (graphicsPage.length === 0 || !graphicsPage[0].children)
            throw new Error(errors_1.ErrorProcessGraphics);
        const IDS = getIds_1.getIds(graphicsPage);
        const SETTINGS = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
        const URL = `${url}?ids=${getIdString_1.getIdString(IDS)}${SETTINGS}`;
        const IMAGE_RESPONSE = yield getFromApi_1.getFromApi(token, URL, versionName, 'images');
        if (IMAGE_RESPONSE.err)
            throw new Error(errors_1.ErrorProcessGraphicsImageError);
        if (!IMAGE_RESPONSE.images)
            throw new Error(errors_1.ErrorProcessGraphicsNoImages);
        return getFileList_1.getFileList(IMAGE_RESPONSE, IDS, outputFormatGraphics);
    });
}
exports.processGraphics = processGraphics;
//# sourceMappingURL=processGraphics.js.map