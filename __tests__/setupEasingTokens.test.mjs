import { setupEasingTokens } from '../bin/functions/tokens/setupEasingTokens';

import { easingFrame } from '../testdata/easingFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupEasingTokens(easingFrame)).toEqual(
    expect.objectContaining({
      easeIn: 'cubic-bezier(0.50, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.40, 1)',
      easeInout: 'cubic-bezier(0.45, 0, 0.40, 1)'
    })
  );
});

test('It should throw an error if frame is missing "children" array', () => {
  expect(() => {
    setupEasingTokens({});
  }).toThrow();
});

test('It should throw an error if frame does not have "characters" property', () => {
  expect(() => {
    setupEasingTokens({
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
    setupEasingTokens();
  }).toThrow();
});
