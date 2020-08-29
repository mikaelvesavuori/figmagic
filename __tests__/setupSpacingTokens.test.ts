import { setupSpacingTokens } from '../bin/entities/Tokens/tokens/setupSpacingTokens';

import { spacingFrame } from '../testdata/frames/spacingFrame';

/*
describe('Failure cases', () => {
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
});
*/

describe('Success cases', () => {
  test('It should return valid JSON for spacing elements, using "rem" spacing conversion and standard 16 size', () => {
    expect(setupSpacingTokens(spacingFrame, 'rem', 16)).toEqual(
      expect.objectContaining({
        big: '3rem',
        huge: '6rem',
        large: '4rem',
        medium: '2rem',
        small: '1rem',
        tiny: '0.5rem'
      })
    );
  });
});
