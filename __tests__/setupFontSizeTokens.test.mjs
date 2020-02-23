import { setupFontSizeTokens } from '../bin/functions/setupFontSizeTokens';

import { fontSizeFrame } from '../testdata/fontSizeFrame.mjs';

/*
test('It should normalize the unit, given a width, px basis, and a conversion type', () => {
  expect(setupFontSizeTokens(400, 'px', 'rem')).toBe('25rem');
});
*/

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupFontSizeTokens();
  }).toThrow();
});

test('something here', () => {
  expect(setupFontSizeTokens(fontSizeFrame)).toEqual(
    expect.objectContaining({
      h1: NaN,
      h2: NaN,
      h3: NaN,
      h4: NaN,
      l: NaN,
      m: NaN,
      microcopy: NaN,
      s: NaN
    })
  );
});
