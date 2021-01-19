"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLineHeightTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const normalizeUnits_1 = require("../../../frameworks/string/normalizeUnits");
const errors_1 = require("../../../frameworks/errors/errors");
function makeLineHeightTokens(lineHeightFrame, remSize) {
    if (!lineHeightFrame)
        throw new Error(errors_1.ErrorMakeLineHeightTokensNoFrame);
    if (!lineHeightFrame.children)
        throw new Error(errors_1.ErrorMakeLineHeightTokensNoChildren);
    const TOKENS = lineHeightFrame.children;
    const lineHeights = TOKENS.reduce((tokensDictionary, item) => {
        try {
            const { name, value } = makeLineHeightToken(item, remSize);
            tokensDictionary[name] = value;
        }
        catch (error) {
            console.error(error);
        }
        return tokensDictionary;
    }, {});
    return lineHeights;
}
exports.makeLineHeightTokens = makeLineHeightTokens;
function makeLineHeightToken(item, remSize) {
    if (!item.name || !item.style)
        throw new Error(errors_1.ErrorMakeLineHeightTokensMissingProps);
    const NAME = camelize_1.camelize(item.name);
    const LINE_HEIGHT = typeof item.style.lineHeightPercentFontSize !== 'undefined'
        ? parseFloat(normalizeUnits_1.normalizeUnits(item.style.lineHeightPercentFontSize, 'percent', 'unitless', remSize)).toFixed(2)
        :
            'normal';
    return {
        name: NAME,
        value: LINE_HEIGHT
    };
}
//# sourceMappingURL=makeLineHeightTokens.js.map