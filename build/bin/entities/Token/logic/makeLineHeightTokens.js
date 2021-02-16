"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLineHeightTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const normalizeUnits_1 = require("../../../frameworks/string/normalizeUnits");
const errors_1 = require("../../../frameworks/errors/errors");
function makeLineHeightTokens(lineHeightFrame, remSize, unitlessPrecision) {
    if (!lineHeightFrame)
        throw new Error(errors_1.ErrorMakeLineHeightTokensNoFrame);
    if (!lineHeightFrame.children)
        throw new Error(errors_1.ErrorMakeLineHeightTokensNoChildren);
    const TOKENS = lineHeightFrame.children;
    const lineHeights = TOKENS.reduce((tokensDictionary, item) => {
        try {
            const { name, value } = makeLineHeightToken(item, remSize, unitlessPrecision);
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
function makeLineHeightToken(item, remSize, unitlessPrecision = 2) {
    const NAME = camelize_1.camelize(item.name);
    const LINE_HEIGHT = typeof item.style.lineHeightPercentFontSize !== 'undefined'
        ? parseFloat(normalizeUnits_1.normalizeUnits(item.style.lineHeightPercentFontSize, 'percent', 'unitless', remSize)).toFixed(unitlessPrecision)
        :
            'normal';
    return {
        name: NAME,
        value: LINE_HEIGHT
    };
}
//# sourceMappingURL=makeLineHeightTokens.js.map