import { setupLineHeightTokens } from '../bin/functions/setupLineHeightTokens';

import { lineHeightFrame } from '../testdata/lineHeightFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupLineHeightTokens(lineHeightFrame)).toEqual(
    expect.objectContaining({ l: '1.99', m: '1.76', s: '1.46', xs: '1.00' })
  );
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupLineHeightTokens();
  }).toThrow();
});
