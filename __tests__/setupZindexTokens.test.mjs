import { setupZindexTokens } from '../bin/functions/tokens/setupZindexTokens';

import { zIndicesFrame } from '../testdata/zIndicesFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupZindexTokens(zIndicesFrame)).toEqual(
    expect.objectContaining({ focus: '10', high: '1', higher: '2', regular: '0', top: '100' })
  );
});

test('It should throw an error if frame is missing "children" array', () => {
  expect(() => {
    setupZindexTokens({});
  }).toThrow();
});

test('It should throw an error if frame does not have "characters" property', () => {
  expect(() => {
    setupZindexTokens({
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
    setupZindexTokens();
  }).toThrow();
});
