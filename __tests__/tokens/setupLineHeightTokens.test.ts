import { setupLineHeightTokens } from '../../bin/entities/Token/logic/setupLineHeightTokens';

import {
  lineHeightFrame,
  lineHeightFrameNoNameStyle,
  lineHeightFrameNoLineHeightPercentFontSize
} from '../../testdata/frames/lineHeightFrame';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      setupLineHeightTokens();
    }).toThrow();
  });

  test('It should throw an error if children are missing', () => {
    expect(() => {
      // @ts-ignore
      setupLineHeightTokens({});
    }).toThrow();
  });

  test('It should throw an error if children are missing "name" and "style" properties', () => {
    expect(() => {
      // @ts-ignore
      setupLineHeightTokens(lineHeightFrameNoNameStyle);
    }).toThrow();
  });

  test('It should throw an error if children has "style" property but not "lineHeightPercentFontSize"', () => {
    expect(() => {
      // @ts-ignore
      setupLineHeightTokens(lineHeightFrameNoLineHeightPercentFontSize);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupLineHeightTokens(lineHeightFrame, 16)).toEqual(
      expect.objectContaining({ l: '1.65', m: '1.45', s: '1.35', xs: '1.00' })
    );
  });
});
