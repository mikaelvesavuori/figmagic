export function getTokenMatch(tokens, tokenFileName, property, expectedValue, multiplier) {
  // TODO: Set errors!
  if (!tokens || !tokenFileName || !property || !expectedValue) throw new Error();

  let updatedCss = ``;
  let updatedImports = [];

  Object.entries(tokens).map(s => {
    const TOKEN_VALUE = (() => {
      if (typeof s[1] === 'number') return parseFloat(s[1]); // Send any numbers back
      if (s[1].match(/\d+rem|\d+em|\d+px/gi)) return parseFloat(s[1]); // If the value uses rem|em|px, send back as numbers
      return s[1]; // Else send back as is (string text)
    })();

    if (property === 'line-height') {
      console.log('!!!!', TOKEN_VALUE, s[1], expectedValue);
    }

    const IS_TOKEN_MATCH = multiplier
      ? TOKEN_VALUE * multiplier === expectedValue
      : TOKEN_VALUE === expectedValue;

    if (IS_TOKEN_MATCH) {
      updatedCss += `${property}: \${${tokenFileName}.${s[0]}};\n`;
      updatedImports.push(tokenFileName);
    }
  });

  return { updatedCss, updatedImports };
}
