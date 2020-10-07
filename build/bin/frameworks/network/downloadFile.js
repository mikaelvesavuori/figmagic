"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const fs = tslib_1.__importStar(require("fs"));
const messages_1 = require("../messages/messages");
const errors_1 = require("../errors/errors");
function downloadFile(url, path) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!url || !path)
                throw new Error(errors_1.ErrorDownloadFile);
            const RESPONSE = yield node_fetch_1.default(url);
            if (RESPONSE.status !== 200)
                return;
            return new Promise((resolve, reject) => {
                console.log(messages_1.MsgDownloadFileWritingFile(path));
                const FILE = fs.createWriteStream(path);
                RESPONSE.body.pipe(FILE);
                FILE.on('error', () => reject('Error when downloading file!'));
                FILE.on('finish', () => resolve());
            });
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.downloadFile = downloadFile;
//# sourceMappingURL=downloadFile.js.map