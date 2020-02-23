import { setupLineHeightTokens } from '../bin/functions/setupLineHeightTokens';

import { lineHeightFrame } from '../testdata/lineHeightFrame.mjs';

/*
test('It should normalize the unit, given a width, px basis, and a conversion type', () => {
  expect(setupLineHeightTokens(400, 'px', 'rem')).toBe('25rem');
});
*/

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupLineHeightTokens();
  }).toThrow();
});

test('something here', () => {
  expect(setupLineHeightTokens(lineHeightFrame)).toEqual(
    expect.objectContaining({ l: '1.99', m: '1.76', s: '1.46', xs: '1.00' })
  );
});
