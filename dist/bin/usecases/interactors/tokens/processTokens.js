"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTokens = void 0;
const index_1 = require("../../../entities/Token/index");
const camelize_1 = require("../../../frameworks/string/camelize");
const acceptedTokenTypes_1 = require("../../../frameworks/system/acceptedTokenTypes");
const errors_1 = require("../../../frameworks/errors/errors");
function processTokens(tokens, config) {
    try {
        if (!tokens)
            throw new Error(errors_1.ErrorWriteTokens);
        if (!(tokens.length > 0))
            throw new Error(errors_1.ErrorWriteTokens);
        if (!config)
            throw new Error(errors_1.ErrorWriteTokensNoSettings);
        const PROCESSED_TOKENS = [];
        tokens.forEach((token) => {
            const TOKEN_NAME = camelize_1.camelize(token.name);
            if (acceptedTokenTypes_1.acceptedTokenTypes.includes(TOKEN_NAME.toLowerCase())) {
                const _TOKEN = index_1.makeToken(token, TOKEN_NAME, config);
                const WRITE_OP = _TOKEN.getWriteOperation();
                if (WRITE_OP)
                    PROCESSED_TOKENS.push(WRITE_OP);
            }
        });
        return PROCESSED_TOKENS;
    }
    catch (error) {
        throw new Error(errors_1.ErrorWriteTokens);
    }
}
exports.processTokens = processTokens;
//# sourceMappingURL=processTokens.js.map