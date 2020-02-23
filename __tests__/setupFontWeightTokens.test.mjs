import { setupFontSizeTokens } from '../bin/functions/setupFontSizeTokens';

import { fontWeightFrame } from '../testdata/fontWeightFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupFontSizeTokens(fontWeightFrame)).toEqual(
    expect.objectContaining({ light: NaN, medium: NaN, regular: NaN })
  );
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupFontSizeTokens();
  }).toThrow();
});
