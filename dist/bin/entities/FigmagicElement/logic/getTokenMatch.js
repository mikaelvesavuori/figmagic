"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenMatch = void 0;
const normalizeUnits_1 = require("../../../frameworks/string/normalizeUnits");
const convertRgbaToHex_1 = require("../../../frameworks/string/convertRgbaToHex");
const messages_1 = require("../../../frameworks/messages/messages");
const errors_1 = require("../../../frameworks/errors/errors");
function getTokenMatch(tokens, tokenFileName, property, expectedValue, remSize) {
    try {
        if (!tokens || !tokenFileName || !property || !expectedValue)
            throw new Error(errors_1.ErrorGetTokenMatch);
        let css = ``;
        let imports = [];
        if (property === 'padding') {
            const PADDING_MATCH = matchPadding(expectedValue, remSize, tokens, tokenFileName, property, css, imports);
            css = PADDING_MATCH.css;
            imports = PADDING_MATCH.imports;
        }
        else {
            const OTHER_MATCH = matchOther(expectedValue, remSize, tokens, tokenFileName, property, css, imports);
            css = OTHER_MATCH.css;
            imports = OTHER_MATCH.imports;
        }
        return { updatedCss: css, updatedImports: imports };
    }
    catch (error) {
        throw new Error(errors_1.ErrorGetTokenMatch);
    }
}
exports.getTokenMatch = getTokenMatch;
function matchPadding(expectedValue, remSize, tokens, tokenFileName, property, css, imports) {
    try {
        const KEYS = Object.keys(expectedValue);
        if (typeof expectedValue !== 'object')
            return;
        KEYS.forEach((key) => {
            let foundMatch = false;
            if (expectedValue[key]) {
                if (!remSize)
                    throw new Error(errors_1.ErrorGetTokenMatchNoRemSize);
                const parsedValue = typeof expectedValue[key] !== 'number'
                    ? parseFloat(expectedValue[key])
                    : expectedValue[key];
                const value = normalizeUnits_1.normalizeUnits(parsedValue, 'px', 'rem', remSize);
                Object.entries(tokens).forEach((token) => {
                    if (token[1] === value) {
                        css += `${property}-${key}: \${${tokenFileName}.${token[0]}};\n`;
                        foundMatch = true;
                    }
                });
                if (!foundMatch) {
                    console.log(`${messages_1.MsgGetTokenMatchNoMatch} ${property}: ${value}`);
                    css += `${property}-${key}: ${value};\n`;
                }
            }
        });
        imports.push(tokenFileName);
        return { css, imports };
    }
    catch (error) {
        throw new Error(error);
    }
}
function matchOther(expectedValue, remSize, tokens, tokenFileName, property, css, imports) {
    try {
        let foundMatch = false;
        Object.entries(tokens).forEach((token) => {
            const TOKEN_VALUE = (() => {
                if (typeof token[1] === 'number')
                    return token[1];
                return token[1];
            })();
            const VALUE_THROUGH_REM = (() => {
                if (TOKEN_VALUE && typeof TOKEN_VALUE === 'string') {
                    if (property === 'letter-spacing')
                        return TOKEN_VALUE;
                    if (TOKEN_VALUE.match('rem') || TOKEN_VALUE.match('em')) {
                        return parseFloat(TOKEN_VALUE) * remSize;
                    }
                }
                return null;
            })();
            const IS_TOKEN_MATCH = VALUE_THROUGH_REM
                ? VALUE_THROUGH_REM === expectedValue
                : TOKEN_VALUE == expectedValue;
            if (IS_TOKEN_MATCH) {
                css += `${property}: \${${tokenFileName}.${token[0]}};\n`;
                imports.push(tokenFileName);
                foundMatch = true;
            }
        });
        if (!foundMatch) {
            let notFoundMessage = `${messages_1.MsgGetTokenMatchNoMatch} ${property}: ${expectedValue}`;
            if (property === 'color' || property === 'background-color')
                notFoundMessage += ` (HEX: ${convertRgbaToHex_1.convertRgbaToHex(expectedValue)}, ${getAlphaInPercent(expectedValue)})`;
            console.log(notFoundMessage);
            css += `${property}: ${expectedValue};\n`;
        }
        return { css, imports };
    }
    catch (error) {
        throw new Error(error);
    }
}
const getAlphaInPercent = (color) => {
    const SECTIONED = color.split(',');
    return SECTIONED[SECTIONED.length - 1].replace(/ /gi, '').replace(')', '') * 100 + '%';
};
//# sourceMappingURL=getTokenMatch.js.map