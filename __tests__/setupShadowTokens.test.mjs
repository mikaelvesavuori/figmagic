import { setupShadowTokens } from '../bin/functions/setupShadowTokens';

import { shadowsFrame } from '../testdata/shadowsFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupShadowTokens(shadowsFrame)).toEqual(
    expect.objectContaining({
      deep: '152px 523px 10px 10px rgba(255, 0, 0, 1)',
      medium: '152px 523px 10px 10px rgba(255, 0, 0, 1)',
      soft: '152px 523px 10px 10px rgba(255, 0, 0, 1)'
    })
  );
});

test('It should throw an error if frame is missing "children" array', () => {
  expect(() => {
    setupShadowTokens({});
  }).toThrow();
});

test('It should throw an error if frame does not have "effects" array', () => {
  expect(() => {
    setupShadowTokens({
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
    setupShadowTokens();
  }).toThrow();
});
