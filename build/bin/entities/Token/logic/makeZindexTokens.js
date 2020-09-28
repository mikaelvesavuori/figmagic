"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeZindexTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeZindexTokens(zIndexFrame) {
    if (!zIndexFrame)
        throw new Error(errors_1.ErrorMakeZindexTokensNoFrame);
    if (!zIndexFrame.children)
        throw new Error(errors_1.ErrorMakeZindexTokensNoChildren);
    const zIndex = {};
    const TOKENS = zIndexFrame.children;
    TOKENS.forEach((item) => makeZindexToken(item, zIndex));
    return zIndex;
}
exports.makeZindexTokens = makeZindexTokens;
function makeZindexToken(item, zIndex) {
    if (!item.name || !item.characters)
        throw new Error(errors_1.ErrorMakeZindexTokensMissingProps);
    const NAME = camelize_1.camelize(item.name);
    zIndex[NAME] = parseInt(item.characters);
}
//# sourceMappingURL=makeZindexTokens.js.map