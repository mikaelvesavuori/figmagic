import { setupFontWeightTokens } from '../bin/entities/Tokens/tokens/setupFontWeightTokens';

import {
  fontWeightFrame,
  fontWeightFrameInvalid,
  fontWeightFrameFontWeightMismatch
} from '../testdata/frames/fontWeightFrame';

describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', () => {
    expect(() => {
      // @ts-ignore
      setupFontWeightTokens();
    }).toThrow();
  });

  test('It should throw an error if children are missing', () => {
    expect(() => {
      // @ts-ignore
      setupFontWeightTokens({});
    }).toThrow();
  });

  test('It should throw an error if children are missing "name" and "style" properties', () => {
    expect(() => {
      // @ts-ignore
      setupFontWeightTokens(fontWeightFrameInvalid);
    }).toThrow();
  });

  test('It should throw an error if children has "style" property but not "fontWeight"', () => {
    expect(() => {
      // @ts-ignore
      setupFontWeightTokens(fontWeightFrameFontWeightMismatch);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupFontWeightTokens(fontWeightFrame)).toEqual(
      expect.objectContaining({ light: 300, medium: 500, regular: 400 })
    );
  });
});
