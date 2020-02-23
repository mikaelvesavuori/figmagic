import { setupFontTokens } from '../bin/functions/setupFontTokens';

import { fontFrame } from '../testdata/fontFrame.mjs';

/*
test('It should normalize the unit, given a width, px basis, and a conversion type', () => {
  expect(setupFontTokens(400, 'px', 'rem')).toBe('25rem');
});
*/

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupFontTokens();
  }).toThrow();
});

test('something here', () => {
  expect(setupFontTokens(fontFrame)).toEqual(
    expect.objectContaining({
      light: 'HelveticaNeue',
      medium: 'HelveticaNeue',
      regular: 'HelveticaNeue'
    })
  );
});
