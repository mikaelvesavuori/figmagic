import { setupLineHeightTokens } from '../bin/entities/Tokens/tokens/setupLineHeightTokens';

import { lineHeightFrame } from '../testdata/lineHeightFrame';

/*
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

test('It should throw an error if children are missing', () => {
  expect(() => {
    setupLineHeightTokens({});
  }).toThrow();
});

test('It should throw an error if children are missing "name" and "style" properties', () => {
  expect(() => {
    setupLineHeightTokens({
      children: [
        {
          nameMismatch: 'Something',
          styleMismatch: {}
        }
      ]
    });
  }).toThrow();
});

test('It should throw an error if children has "style" property but not "lineHeightPercentFontSize"', () => {
  expect(() => {
    setupLineHeightTokens({
      children: [
        {
          name: 'Something',
          style: {
            lineHeightPercentFontSizeMismatch: 100
          }
        }
      ]
    });
  }).toThrow();
});
*/
