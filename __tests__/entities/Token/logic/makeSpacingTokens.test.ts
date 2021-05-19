import { makeSpacingTokens } from '../../../../bin/entities/Token/logic/makeSpacingTokens';

import { spacingFrame, spacingFrameNoName } from '../../../../testdata/frames/spacingFrame';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeSpacingTokens();
    }).toThrow();
  });

  test('It should throw an error if frame is empty', () => {
    expect(() => {
      // @ts-ignore
      makeSpacingTokens({});
    }).toThrow();
  });

  test('It should throw an error if children are missing "name" and "absoluteBoundingBox" properties', () => {
    expect(() => {
      // @ts-ignore
      makeSpacingTokens(spacingFrameNoName);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('Given valid input and "rem" for unit, it should return a valid and correct set of spacing tokens', () => {
    expect(makeSpacingTokens(spacingFrame, 'rem', 16)).toEqual(
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

  test('Given valid input and "em" for unit, it should return a valid and correct set of spacing tokens', () => {
    expect(makeSpacingTokens(spacingFrame, 'em', 16)).toEqual(
      expect.objectContaining({
        big: '3em',
        huge: '6em',
        large: '4em',
        medium: '2em',
        small: '1em',
        tiny: '0.5em'
      })
    );
  });

  test('Given valid input and "px" for unit, it should return a valid and correct set of spacing tokens', () => {
    expect(makeSpacingTokens(spacingFrame, 'px', 16)).toEqual(
      expect.objectContaining({
        big: '48px',
        huge: '96px',
        large: '64px',
        medium: '32px',
        small: '16px',
        tiny: '8px'
      })
    );
  });
});
