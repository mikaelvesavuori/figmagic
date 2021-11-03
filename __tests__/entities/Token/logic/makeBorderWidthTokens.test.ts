import { makeBorderWidthTokens } from '../../../../bin/entities/Token/logic/makeBorderWidthTokens';

import { FRAME as Frame } from '../../../../bin/contracts/Figma';

import {
  borderWidthsFrame,
  borderWidthsInvalidMissingName,
  borderWidthsInvalidMissingStrokeWeight
} from '../../../../testdata/frames/borderWidthsFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeBorderWidthTokens();
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeBorderWidthTokens({});
    }).toThrow();
  });

  test('It should throw an error if missing item name', () => {
    expect(() =>
      makeBorderWidthTokens(borderWidthsInvalidMissingName as Frame, 'px', 16)
    ).toThrowError();
  });

  test('It should throw an error if missing item strokeWeight', () => {
    expect(() =>
      makeBorderWidthTokens(borderWidthsInvalidMissingStrokeWeight as Frame, 'px', 16)
    ).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input, using "px" as border width unit', () => {
    expect(makeBorderWidthTokens(borderWidthsFrame as Frame, 'px', 16)).toEqual(
      expect.objectContaining({ chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' })
    );
  });

  test('It should return a complete object when passing in valid input, using "rem" as border width unit', () => {
    expect(makeBorderWidthTokens(borderWidthsFrame as Frame, 'rem', 16)).toEqual(
      expect.objectContaining({
        chunky: '0.5rem',
        fat: '0.25rem',
        hairline: '0.0625rem',
        regular: '0.125rem'
      })
    );
  });

  test('It should return a complete object when passing in valid input, using "em" as border width unit', () => {
    expect(makeBorderWidthTokens(borderWidthsFrame as Frame, 'em', 16)).toEqual(
      expect.objectContaining({
        chunky: '0.5em',
        fat: '0.25em',
        hairline: '0.0625em',
        regular: '0.125em'
      })
    );
  });
});
