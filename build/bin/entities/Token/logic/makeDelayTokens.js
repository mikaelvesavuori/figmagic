"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDelayTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeDelayTokens(delayFrame) {
    if (!delayFrame)
        throw new Error(errors_1.ErrorMakeDelayTokensNoFrame);
    if (!delayFrame.children)
        throw new Error(errors_1.ErrorMakeDelayTokensNoChildren);
    const delays = {};
    const TOKENS = delayFrame.children;
    TOKENS.forEach((item) => makeDelayToken(item, delays));
    return delays;
}
exports.makeDelayTokens = makeDelayTokens;
function makeDelayToken(item, delays) {
    if (!item.name || !item.characters)
        throw new Error(errors_1.ErrorMakeDelayTokensMissingProps);
    const NAME = camelize_1.camelize(item.name);
    delays[NAME] = parseFloat(item.characters);
}
//# sourceMappingURL=makeDelayTokens.js.map