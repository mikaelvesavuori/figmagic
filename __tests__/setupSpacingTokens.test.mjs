import { setupSpacingTokens } from '../bin/functions/tokens/setupSpacingTokens';

import { spacingFrame } from '../testdata/spacingFrame.mjs';

test('It should return valid JSON for spacing elements, using "rem" spacing conversion', () => {
  expect(setupSpacingTokens(spacingFrame, 'rem')).toEqual(
    expect.objectContaining({
      huge: '5rem',
      large: '4.375rem',
      medium: '3.125rem',
      small: '1.5rem',
      tiny: '0.75rem'
    })
  );
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupSpacingTokens();
  }).toThrow();
});

test('It should throw an error if frame is empty', () => {
  expect(() => {
    setupSpacingTokens({});
  }).toThrow();
});

test('It should throw an error if children are missing "name" and "absoluteBoundingBox" properties', () => {
  expect(() => {
    setupSpacingTokens({
      children: [
        {
          nameMismatch: 'Something',
          absoluteBoundingBoxMismatch: 100
        }
      ]
    });
  }).toThrow();
});
