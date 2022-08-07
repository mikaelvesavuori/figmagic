import { makeLineHeightTokens } from '../../../../bin/entities/Token/logic/makeLineHeightTokens';

import {
  lineHeightFrame,
  lineHeightFrameNoNameStyle
} from '../../../../testdata/frames/lineHeightFrame';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeLineHeightTokens();
    }).toThrow();
  });

  test('It should throw an error if children are missing', () => {
    expect(() => {
      // @ts-ignore
      makeLineHeightTokens({});
    }).toThrow();
  });

  test('It should throw an error if children are missing "name" or "style" properties', () => {
    expect(() =>
      // @ts-ignore
      makeLineHeightTokens(lineHeightFrameNoNameStyle)
    ).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeLineHeightTokens(lineHeightFrame, 16)).toEqual(
      expect.objectContaining({ l: '1.65', m: '1.45', s: '1.35', xs: '1.00', auto: 'normal' })
    );
  });

  test('It should round values to a given precision', () => {
    expect(makeLineHeightTokens(lineHeightFrame, 16, 3)).toEqual(
      expect.objectContaining({ l: '1.650', m: '1.450', s: '1.350', xs: '1.000', auto: 'normal' })
    );
  });
  test('It should handle a conversion between px, rem, and em units', () => {
    // Ask for "px" values: should be the value provided by Figma with the unit
    // @ts-ignore
    expect(makeLineHeightTokens(lineHeightFrame, 16, undefined, 'px')).toEqual(
      expect.objectContaining({
        auto: '18.75px',
        l: '26.4px',
        m: '23.2px',
        s: '21.6px',
        xs: '16px'
      })
    );
    // Ask for "em" values: should be a converted value based on the relative font-size
    // @ts-ignore
    expect(makeLineHeightTokens(lineHeightFrame, 16, undefined, 'em')).toEqual(
      expect.objectContaining({
        auto: '1.1719em',
        l: '1.65em',
        m: '1.45em',
        s: '1.35em',
        xs: '1em'
      })
    );
    // Ask for "rem" values: should be a converted value based on the remSize
    // @ts-ignore
    expect(makeLineHeightTokens(lineHeightFrame, 16, undefined, 'rem')).toEqual(
      expect.objectContaining({
        auto: '1.1719rem',
        l: '1.65rem',
        m: '1.45rem',
        s: '1.35rem',
        xs: '1rem'
      })
    );
  });
});
