import { normalizeUnits } from './normalizeUnits.mjs';

export function getTokenMatch(tokens, tokenFileName, property, expectedValue, multiplier) {
  // TODO: Set errors!
  if (!tokens || !tokenFileName || !property || !expectedValue) throw new Error();

  let updatedCss = ``;
  let updatedImports = [];

  // Padding requires both X and Y dimensions/values so requires a bit more noodling
  if (property === 'padding') {
    const keys = Object.keys(expectedValue);

    keys.forEach(key => {
      if (expectedValue[key] && expectedValue[key] > 0) {
        const value = normalizeUnits(expectedValue[key], 'px', 'rem'); // TODO: Hardcoded to rem?

        Object.entries(tokens).map(s => {
          if (s[1] === value) {
            updatedCss += `${property}-${key}: \${${tokenFileName}.${s[0]}};\n`;
          } else updatedCss += `${property}-${key}: ${value};\n`;
        });
      }
    });

    updatedImports.push(tokenFileName);
  } else {
    Object.entries(tokens).map(s => {
      const TOKEN_VALUE = (() => {
        if (typeof s[1] === 'number') return parseFloat(s[1]); // Send any numbers back
        if (s[1].match(/\d+rem|\d+em/gi)) return parseFloat(s[1]); // If the value uses rem|em, send back as numbers
        return s[1]; // Else send back as-is (string text)
      })();

      const IS_TOKEN_MATCH = multiplier
        ? TOKEN_VALUE * multiplier === expectedValue
        : TOKEN_VALUE == expectedValue;

      if (IS_TOKEN_MATCH) {
        updatedCss += `${property}: \${${tokenFileName}.${s[0]}};\n`;
        updatedImports.push(tokenFileName);
      }
    });
  }

  return { updatedCss, updatedImports };
}
