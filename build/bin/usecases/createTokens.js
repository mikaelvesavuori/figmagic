"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = void 0;
const createPage_1 = require("./interactors/common/createPage");
const processTokens_1 = require("./interactors/tokens/processTokens");
const writeTokens_1 = require("./interactors/tokens/writeTokens");
const refresh_1 = require("../frameworks/filesystem/refresh");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
async function createTokens(config, data) {
    try {
        if (!config || !data)
            throw new Error(errors_1.ErrorCreateTokens);
        console.log(messages_1.MsgWriteTokens);
        await refresh_1.refresh(config.outputFolderTokens);
        const tokensPage = createPage_1.createPage(data.document.children, 'Design Tokens');
        const processedTokens = processTokens_1.processTokens(tokensPage, config);
        writeTokens_1.writeTokens(processedTokens);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createTokens = createTokens;
//# sourceMappingURL=createTokens.js.map