import { setupDelayTokens } from '../bin/functions/tokens/setupDelayTokens';

import { durationsFrame } from '../testdata/delaysFrame';

test('It should return a complete object when passing in valid input', () => {
  expect(setupDelayTokens(durationsFrame)).toEqual(
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
    setupDelayTokens({});
  }).toThrow();
});

test('It should throw an error if frame does not have "characters" property', () => {
  expect(() => {
    setupDelayTokens({
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
    setupDelayTokens();
  }).toThrow();
});
