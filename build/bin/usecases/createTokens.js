"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = void 0;
const tslib_1 = require("tslib");
const createPage_1 = require("./interactors/common/createPage");
const processTokens_1 = require("./interactors/tokens/processTokens");
const writeTokens_1 = require("./interactors/tokens/writeTokens");
const refresh_1 = require("../frameworks/filesystem/refresh");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
function createTokens(config, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!config || !data)
                throw new Error(errors_1.ErrorCreateTokens);
            console.log(messages_1.MsgWriteTokens);
            yield refresh_1.refresh(config.outputFolderTokens);
            const tokensPage = createPage_1.createPage(data.document.children, 'Design Tokens');
            const processedTokens = processTokens_1.processTokens(tokensPage, config);
            if (processedTokens && processedTokens.length > 0)
                writeTokens_1.writeTokens(processedTokens);
            else
                console.warn(messages_1.MsgNoTokensFound);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createTokens = createTokens;
//# sourceMappingURL=createTokens.js.map