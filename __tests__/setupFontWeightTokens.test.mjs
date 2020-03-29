import { setupFontWeightTokens } from '../bin/functions/tokens/setupFontWeightTokens';

import { fontWeightFrame } from '../testdata/fontWeightFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupFontWeightTokens(fontWeightFrame)).toEqual(
    expect.objectContaining({ light: 300, medium: 500, regular: 400 })
  );
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupFontWeightTokens();
  }).toThrow();
});

test('It should throw an error if children are missing', () => {
  expect(() => {
    setupFontWeightTokens({});
  }).toThrow();
});

test('It should throw an error if children are missing "name" and "style" properties', () => {
  expect(() => {
    setupFontWeightTokens({
      children: [
        {
          nameMismatch: 'Something',
          styleMismatch: {}
        }
      ]
    });
  }).toThrow();
});

test('It should throw an error if children has "style" property but not "fontWeight"', () => {
  expect(() => {
    setupFontWeightTokens({
      children: [
        {
          name: 'Something',
          style: {
            fontWeightMismatch: 100
          }
        }
      ]
    });
  }).toThrow();
});
