"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDurationTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeDurationTokens(durationFrame) {
    if (!durationFrame)
        throw new Error(errors_1.ErrorMakeDurationTokensNoFrame);
    if (!durationFrame.children)
        throw new Error(errors_1.ErrorMakeDurationTokensNoChildren);
    const durations = {};
    const TOKENS = durationFrame.children;
    TOKENS.forEach((item) => makeDurationToken(item, durations));
    return durations;
}
exports.makeDurationTokens = makeDurationTokens;
function makeDurationToken(item, durations) {
    if (!item.name || !item.characters)
        throw new Error(errors_1.ErrorMakeDurationTokensMissingProps);
    const NAME = camelize_1.camelize(item.name);
    durations[NAME] = parseFloat(item.characters);
}
//# sourceMappingURL=makeDurationTokens.js.map