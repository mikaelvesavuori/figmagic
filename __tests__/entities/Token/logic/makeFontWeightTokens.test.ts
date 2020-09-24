import { makeFontWeightTokens } from '../../../../bin/entities/Token/logic/makeFontWeightTokens';

import {
  fontWeightFrame,
  fontWeightFrameInvalid,
  fontWeightFrameFontWeightMismatch
} from '../../../../testdata/frames/fontWeightFrame';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeFontWeightTokens();
    }).toThrow();
  });

  test('It should throw an error if children are missing', () => {
    expect(() => {
      // @ts-ignore
      makeFontWeightTokens({});
    }).toThrow();
  });

  test('It should throw an error if children are missing "name" and "style" properties', () => {
    expect(() => {
      // @ts-ignore
      makeFontWeightTokens(fontWeightFrameInvalid);
    }).toThrow();
  });

  test('It should throw an error if children has "style" property but not "fontWeight"', () => {
    expect(() => {
      // @ts-ignore
      makeFontWeightTokens(fontWeightFrameFontWeightMismatch);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeFontWeightTokens(fontWeightFrame)).toEqual(
      expect.objectContaining({ light: 300, medium: 500, regular: 400 })
    );
  });
});
