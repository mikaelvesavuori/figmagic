import { setupDurationTokens } from '../bin/functions/tokens/setupDurationTokens';

import { durationsFrame } from '../testdata/durationsFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupDurationTokens(durationsFrame)).toEqual(
    expect.objectContaining({
      decimal: 0.5,
      fast: 200,
      medium: 400,
      slow: 750
    })
  );
});

test('It should throw an error if frame is missing "children" array', () => {
  expect(() => {
    setupDurationTokens({});
  }).toThrow();
});

test('It should throw an error if frame does not have "characters" property', () => {
  expect(() => {
    setupDurationTokens({
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
    setupDurationTokens();
  }).toThrow();
});
