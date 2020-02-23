import { setupFontSizeTokens } from '../bin/functions/setupFontSizeTokens';

import { fontSizeFrame } from '../testdata/fontSizeFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
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

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupFontSizeTokens();
  }).toThrow();
});

test('It should throw an error if frame is missing "children" array', () => {
  expect(setupFontSizeTokens({})).toThrow();
});

test('It should throw an error if frame does not contain "style" property', () => {
  expect(
    setupFontSizeTokens({
      children: [
        {
          somethingElse: 123
        }
      ]
    })
  ).toThrow();
});

test('It should throw an error if frame has "style" and "name" properties but not "style.fontSize"', () => {
  expect(
    setupFontSizeTokens({
      children: [
        {
          name: 'Something',
          style: {
            fontSizeMismatch: 10
          }
        }
      ]
    })
  ).toThrow();
});
