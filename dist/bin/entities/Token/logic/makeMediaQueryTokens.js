"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMediaQueryTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeMediaQueryTokens(mediaQueryFrame) {
    if (!mediaQueryFrame)
        throw new Error(errors_1.ErrorSetupMediaQueryTokensNoFrame);
    if (!mediaQueryFrame.children)
        throw new Error(errors_1.ErrorSetupMediaQueryTokensNoChildren);
    const mediaQueries = {};
    const TOKENS = mediaQueryFrame.children;
    TOKENS.forEach((item) => {
        if (!item.name || !item.absoluteBoundingBox)
            throw new Error(errors_1.ErrorSetupMediaQueryTokensMissingProps);
        const NAME = camelize_1.camelize(item.name);
        mediaQueries[NAME] = `${item.absoluteBoundingBox.width}px`;
    });
    return mediaQueries;
}
exports.makeMediaQueryTokens = makeMediaQueryTokens;
//# sourceMappingURL=makeMediaQueryTokens.js.map