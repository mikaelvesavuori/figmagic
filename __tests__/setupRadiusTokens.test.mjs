import { setupRadiusTokens } from '../bin/functions/setupRadiusTokens';

import { radiiFrame } from '../testdata/radiiFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupRadiusTokens(radiiFrame)).toEqual(
    expect.objectContaining({ circle: '100%', hard: '0%', rounded: '4%', soft: '8%' })
  );
});

test('It should throw an error if frame is missing "children" array', () => {
  expect(() => {
    setupRadiusTokens({});
  }).toThrow();
});

test('It should throw an error if frame does not have "cornerRadius" property', () => {
  expect(() => {
    setupRadiusTokens({
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
    setupRadiusTokens();
  }).toThrow();
});
