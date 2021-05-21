"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTokens = void 0;
const index_1 = require("../../../entities/Token/index");
const camelize_1 = require("../../../frameworks/string/camelize");
const acceptedTokenTypes_1 = require("../../../frameworks/system/acceptedTokenTypes");
const errors_1 = require("../../../frameworks/errors/errors");
function processTokens(tokens, config) {
    try {
        if (!config)
            throw new Error(errors_1.ErrorWriteTokensNoSettings);
        if (!tokens)
            return;
        const PROCESSED_TOKENS = [];
        tokens.forEach((tokenFrame) => {
            const TOKEN_NAME = camelize_1.camelize(tokenFrame.name);
            if (tokenFrame.type.toUpperCase() === 'FRAME' && TOKEN_NAME[0] === '_')
                return;
            if (acceptedTokenTypes_1.acceptedTokenTypes.includes(TOKEN_NAME.toLowerCase()) && TOKEN_NAME[0] !== '_') {
                const TOKEN = index_1.makeToken(tokenFrame, TOKEN_NAME, config);
                const WRITE_OP = TOKEN.getWriteOperation();
                if (WRITE_OP)
                    PROCESSED_TOKENS.push(WRITE_OP);
            }
        });
        return PROCESSED_TOKENS;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.processTokens = processTokens;
//# sourceMappingURL=processTokens.js.map