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

test('It should throw an error if font frame is missing "children" array', () => {
  expect(() => {
    setupFontTokens({ somethingElse: 123 });
  }).toThrow();
});

test('It should throw an error if font frame children lack required properties', () => {
  expect(() => {
    setupFontTokens({ children: [{}] });
  }).toThrow();
});

test('It should choose Postscript name if passing in "usePostscriptFontNames" boolean', () => {
  expect(setupFontTokens(fontFrame, true)).toEqual(expect.objectContaining({}));
});

test('It should return a complete object when passing in valid input', () => {
  expect(setupFontTokens(fontFrame)).toEqual(
    expect.objectContaining({
      light: 'HelveticaNeue',
      medium: 'HelveticaNeue',
      regular: 'HelveticaNeue'
    })
  );
});
