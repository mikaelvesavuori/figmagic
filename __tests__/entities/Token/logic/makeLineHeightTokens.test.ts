import { makeLineHeightTokens } from '../../../../bin/entities/Token/logic/makeLineHeightTokens';

import {
  lineHeightFrame,
  lineHeightFrameNoNameStyle,
  lineHeightFrameNoLineHeightPercentFontSize
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

  test('It should throw an error if children are missing "name" and "style" properties', () => {
    expect(() => {
      // @ts-ignore
      makeLineHeightTokens(lineHeightFrameNoNameStyle);
    }).toThrow();
  });

  test('It should throw an error if children has "style" property but not "lineHeightPercentFontSize"', () => {
    expect(() => {
      // @ts-ignore
      makeLineHeightTokens(lineHeightFrameNoLineHeightPercentFontSize);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeLineHeightTokens(lineHeightFrame, 16)).toEqual(
      expect.objectContaining({ l: '1.65', m: '1.45', s: '1.35', xs: '1.00' })
    );
  });
});
