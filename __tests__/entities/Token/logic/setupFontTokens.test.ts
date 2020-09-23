import { makeFontTokens } from '../../../../bin/entities/Token/logic/setupFontTokens';

import { fontFrame, fontFrameInvalid } from '../../../../testdata/frames/fontFrame';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeFontTokens();
    }).toThrow();
  });

  test('It should throw an error if font frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeFontTokens({ somethingElse: 123 });
    }).toThrow();
  });

  test('It should throw an error if font frame children lack required properties', () => {
    expect(() => {
      // @ts-ignore
      makeFontTokens({ children: [{}] });
    }).toThrow();
  });

  test('It should choose Postscript name if passing in true for "usePostscriptFontNames"', () => {
    expect(makeFontTokens(fontFrame, true)).toEqual(expect.objectContaining({}));
  });

  test('It should choose Font Family name if passing in false for "usePostscriptFontNames"', () => {
    expect(makeFontTokens(fontFrame, false)).toEqual(expect.objectContaining({}));
  });

  test('It should throw an error if frame has "style" and "name" properties but not "style.fontPostScriptName" or "style.fontFamily"', () => {
    expect(() => {
      // @ts-ignore
      makeFontTokens(fontFrameInvalid);
    });
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(makeFontTokens(fontFrame)).toEqual(
      expect.objectContaining({
        light: 'HelveticaNeue',
        medium: 'HelveticaNeue',
        regular: 'HelveticaNeue'
      })
    );
  });
});
