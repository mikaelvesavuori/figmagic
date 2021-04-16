import { makeLetterSpacingTokens } from '../../../../bin/entities/Token/logic/makeLetterSpacingTokens';

import {
  letterSpacingsFrame,
  letterSpacingsFrameNoStyle,
  letterSpacingsFrameNoLetterSpacing,
  mockedLetterSpacingFrame,
  letterSpacingUndefined
} from '../../../../testdata/frames/letterSpacingsFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeLetterSpacingTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not have "style" property', () => {
    expect(() => {
      // @ts-ignore
      makeLetterSpacingTokens(letterSpacingsFrameNoStyle);
    }).toThrow();
  });

  test('It should throw an error if frame does not have "style.fontSize" allowing to convert to em', () => {
    expect(() => {
      // @ts-ignore
      makeLetterSpacingTokens(letterSpacingsFrameNoLetterSpacing);
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeLetterSpacingTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeLetterSpacingTokens(letterSpacingsFrame, 'em')).toEqual(
      expect.objectContaining({ regular: '0em', tight: '-0.045em', wide: '0.05em' })
    );
  });
});

test('It should handle a conversion between px and em units', () => {
  // Ask for "px" values: should be the value provided by Figma with the unit
  // @ts-ignore
  expect(makeLetterSpacingTokens(mockedLetterSpacingFrame, 'px')).toEqual(
    expect.objectContaining({
      style1: '2px',
      style2: '8px',
      style3: '0.008px'
    })
  );
  // Ask for "em" values: should be a converted value based on the relative font-size
  // @ts-ignore
  expect(makeLetterSpacingTokens(mockedLetterSpacingFrame, 'em')).toEqual(
    expect.objectContaining({
      style1: '0.125em', // 2px out of 16px = 0.125em
      style2: '0.3333em', // 8px out of 24px = 0.33em
      style3: '0.0005em' // 0.008px out of 16px = 0.0005em
    })
  );
});

test('It should return 0 if letterSpacing is undefined', () => {
  // @ts-ignore
  expect(makeLetterSpacingTokens(letterSpacingUndefined, 'em')).toEqual(
    expect.objectContaining({
      foo: '0em'
    })
  );
});
