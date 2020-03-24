export function getTokenMatch(tokens, tokenFileName, property, expectedValue, multiplier) {
  // TODO: Set errors!
  if (!tokens || !tokenFileName || !property || !expectedValue) throw new Error();

  let updatedCss = ``;
  let updatedImports = [];

  Object.entries(tokens).map(s => {
    // TODO: Improve this at some point
    // Parse everything as a number, unless it includes "rgba" string (note to self: this will need improvement!)
    const TOKEN_VALUE = (() => {
      if (typeof s[1] !== 'number') return s[1].includes('rgba') ? s[1] : parseInt(s[1]);
      return parseInt(s[1]);
    })();

    const IS_TOKEN_MATCH = multiplier
      ? TOKEN_VALUE * multiplier === expectedValue
      : TOKEN_VALUE === expectedValue;

    //if (property === 'line-height') console.log('asdf', expectedValue, s);
    if (property === 'letter-spacing') console.log('asdf', expectedValue, s);

    if (IS_TOKEN_MATCH) {
      updatedCss += `${property}: \${${tokenFileName}.${s[0]}};\n`;
      updatedImports.push(tokenFileName);
    }
  });

  return { updatedCss, updatedImports };
}
