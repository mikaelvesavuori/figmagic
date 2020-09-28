"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEasingTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeEasingTokens(easingFrame) {
    if (!easingFrame)
        throw new Error(errors_1.ErrorMakeEasingTokensNoFrame);
    if (!easingFrame.children)
        throw new Error(errors_1.ErrorMakeEasingTokensNoChildren);
    const easings = {};
    const TOKENS = easingFrame.children;
    TOKENS.forEach((item) => {
        if (!item.name || !item.characters)
            throw new Error(errors_1.ErrorMakeEasingTokensMissingProps);
        const NAME = camelize_1.camelize(item.name);
        easings[NAME] = item.characters.trim();
    });
    return easings;
}
exports.makeEasingTokens = makeEasingTokens;
//# sourceMappingURL=makeEasingTokens.js.map