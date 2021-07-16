"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLineHeightTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const normalizeUnits_1 = require("../../../frameworks/string/normalizeUnits");
const errors_1 = require("../../../frameworks/errors/errors");
function makeLineHeightTokens(lineHeightFrame, remSize, unitlessPrecision, lineHeightUnit) {
    if (!lineHeightFrame)
        throw new Error(errors_1.ErrorMakeLineHeightTokensNoFrame);
    if (!lineHeightFrame.children)
        throw new Error(errors_1.ErrorMakeLineHeightTokensNoChildren);
    const TOKENS = lineHeightFrame.children;
    return TOKENS.reduce((tokensDictionary, item) => {
        try {
            const { name, value } = makeLineHeightToken(item, remSize, unitlessPrecision, lineHeightUnit);
            tokensDictionary[name] = value;
        }
        catch (error) {
            console.error(error);
        }
        return tokensDictionary;
    }, {});
}
exports.makeLineHeightTokens = makeLineHeightTokens;
function makeLineHeightToken(item, remSize, unitlessPrecision = 2, lineHeightUnit) {
    const NAME = camelize_1.camelize(item.name);
    const FONT_SIZE = item.style.fontSize;
    const LINE_HEIGHT_VALUE_IN_PX = typeof item.style.lineHeightPx !== 'undefined'
        ? Math.round(item.style.lineHeightPx * 1000) / 1000
        : 0;
    let value = '0';
    switch (lineHeightUnit) {
        case 'px':
            value = `${LINE_HEIGHT_VALUE_IN_PX}px`;
            break;
        case 'em':
            if (!FONT_SIZE) {
                throw new Error(errors_1.ErrorMakeLineHeightTokensMissingProps);
            }
            const valueCalcEm = Math.round((10000 * LINE_HEIGHT_VALUE_IN_PX) / FONT_SIZE) / 10000;
            value = `${valueCalcEm}em`;
            break;
        case 'rem':
            const valueCalcRem = Math.round((10000 * LINE_HEIGHT_VALUE_IN_PX) / remSize) / 10000;
            value = `${valueCalcRem}` + 'rem';
            break;
        default:
            value =
                typeof item.style.lineHeightPercentFontSize !== 'undefined'
                    ? parseFloat(normalizeUnits_1.normalizeUnits(item.style.lineHeightPercentFontSize, 'percent', 'unitless', remSize)).toFixed(unitlessPrecision)
                    :
                        'normal';
    }
    return {
        name: NAME,
        value
    };
}
//# sourceMappingURL=makeLineHeightTokens.js.map