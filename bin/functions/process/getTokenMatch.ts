import { normalizeUnits } from '../helpers/normalizeUnits';

import { msgGetTokenMatchNoMatch } from '../../meta/messages';
import { errorGetTokenMatch, errorGetTokenMatchNoRemSize } from '../../meta/errors';

import { TokenMatch } from '../../app/contracts/process/TokenMatch';

/**
 * Match and find design tokens for CSS values
 *
 * @exports
 * @function
 * @param {object} tokens - Design tokens
 * @param {string} tokenFileName - String representing file name from which the token is exported
 * @param {string} property - CSS property to be assigned
 * @param {string|number} expectedValue - Expected value to match for
 * @param {number} [remSize] - HTML body REM size, required for padding and anything to do with rem/em
 * @returns {object} - Returns object with updated CSS and imports
 * @throws {errorGetTokenMatch} - Throws error if missing required arguments
 * @throws {errorGetTokenMatchNoRemSize} - Throws error if remSize argument is not provided when user needs to convert units (rem, em...)
 */
export function getTokenMatch(
  tokens: object,
  tokenFileName: string,
  property: string,
  expectedValue: string | number,
  remSize: number
): TokenMatch {
  if (!tokens || !tokenFileName || !property || !expectedValue) throw new Error(errorGetTokenMatch);

  let updatedCss: string = ``;
  let updatedImports = [];

  // Padding requires both X and Y dimensions/values so requires a bit more noodling
  if (property === 'padding') {
    const keys = Object.keys(expectedValue);

    keys.forEach((key) => {
      let foundMatch = false;

      if (expectedValue[key] && expectedValue[key] > 0) {
        if (!remSize) throw new Error(errorGetTokenMatchNoRemSize);
        const value = normalizeUnits(expectedValue[key], 'px', 'rem', remSize);

        // Check if we can match value with a token and its value
        Object.entries(tokens).forEach((s) => {
          if (s[1] === value) {
            updatedCss += `${property}-${key}: \${${tokenFileName}.${s[0]}};\n`;
            foundMatch = true;
          }
        });

        // Write expected value as-is, since we couldn't match it to a token
        if (!foundMatch) {
          console.warn(`${msgGetTokenMatchNoMatch} ${property}: ${value}`);
          updatedCss += `${property}-${key}: ${value};\n`;
        }
      }
    });

    updatedImports.push(tokenFileName);
  } else {
    let foundMatch = false;

    Object.entries(tokens).forEach((s) => {
      const TOKEN_VALUE = (() => {
        if (typeof s[1] === 'number') return parseFloat(s[1]); // Send any numbers back
        //if (s[1].match(/\d+rem|\d+em/gi)) return parseFloat(s[1]); // If the value uses rem|em, send back as numbers
        return s[1]; // Else send back as-is (string text)
      })();

      // Multiply rem|em strings through REM size argument
      const VALUE_THROUGH_REM = (() => {
        if (TOKEN_VALUE && typeof TOKEN_VALUE === 'string') {
          if (TOKEN_VALUE.match('rem') || TOKEN_VALUE.match('em')) {
            return parseFloat(TOKEN_VALUE) * remSize;
          }
        }
      })();

      const IS_TOKEN_MATCH = VALUE_THROUGH_REM
        ? VALUE_THROUGH_REM === expectedValue
        : TOKEN_VALUE == expectedValue;

      if (IS_TOKEN_MATCH) {
        updatedCss += `${property}: \${${tokenFileName}.${s[0]}};\n`;
        updatedImports.push(tokenFileName);
        foundMatch = true;
      }
    });

    // Write expected value as-is, since we couldn't match it to a token
    if (!foundMatch) {
      console.warn(`${msgGetTokenMatchNoMatch} ${property}: ${expectedValue}`);
      updatedCss += `${property}: ${expectedValue};\n`;
    }
  }

  return { updatedCss, updatedImports };
}
