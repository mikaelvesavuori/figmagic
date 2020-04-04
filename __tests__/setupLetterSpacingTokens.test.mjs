import { setupLetterSpacingTokens } from '../bin/functions/tokens/setupLetterSpacingTokens';

import { letterSpacingsFrame } from '../testdata/letterSpacingsFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupLetterSpacingTokens(letterSpacingsFrame)).toEqual(
    expect.objectContaining({ regular: '0px', tight: '-1.20px', wide: '1.65px' })
  );
});

test('It should throw an error if frame is missing "children" array', () => {
  expect(() => {
    setupLetterSpacingTokens({});
  }).toThrow();
});

test('It should throw an error if frame does not have "style" property', () => {
  expect(() => {
    setupLetterSpacingTokens({
      children: [
        {
          somethingElse: 123
        }
      ]
    });
  }).toThrow();
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupLetterSpacingTokens();
  }).toThrow();
});
