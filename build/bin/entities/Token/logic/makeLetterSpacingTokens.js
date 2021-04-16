"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLetterSpacingTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeLetterSpacingTokens(letterSpacingFrame, letterSpacingUnit) {
    if (!letterSpacingFrame)
        throw new Error(errors_1.ErrorMakeLetterSpacingTokensNoFrame);
    if (!letterSpacingFrame.children)
        throw new Error(errors_1.ErrorMakeLetterSpacingTokensNoChildren);
    const TOKENS = letterSpacingFrame.children;
    const letterSpacings = TOKENS.reduce((tokens, item) => {
        if (!item.name || !item.style)
            throw new Error(errors_1.ErrorMakeLetterSpacingTokensMissingProps);
        const NAME = camelize_1.camelize(item.name);
        const FONT_SIZE = item.style.fontSize;
        const LETTER_SPACING_VALUE_IN_PX = typeof item.style.letterSpacing !== 'undefined'
            ? Math.round(item.style.letterSpacing * 1000) / 1000
            : 0;
        let value = '0';
        switch (letterSpacingUnit) {
            case 'px':
                value = `${LETTER_SPACING_VALUE_IN_PX}px`;
                break;
            case 'em':
            default:
                if (!FONT_SIZE) {
                    throw new Error(errors_1.ErrorMakeLetterSpacingTokensMissingProps);
                }
                const valueCalc = Math.round((10000 * LETTER_SPACING_VALUE_IN_PX) / FONT_SIZE) / 10000;
                value = `${valueCalc}em`;
                break;
        }
        tokens[NAME] = value;
        return tokens;
    }, {});
    return letterSpacings;
}
exports.makeLetterSpacingTokens = makeLetterSpacingTokens;
//# sourceMappingURL=makeLetterSpacingTokens.js.map