import { setupFontTokens } from '../bin/entities/Tokens/tokens/setupFontTokens';

import { fontFrame } from '../testdata/frames/fontFrame';

/*
describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', () => {
    expect(() => {
      setupFontTokens();
    }).toThrow();
  });

  test('It should throw an error if font frame is missing "children" array', () => {
    expect(() => {
      setupFontTokens({ somethingElse: 123 });
    }).toThrow();
  });

  test('It should throw an error if font frame children lack required properties', () => {
    expect(() => {
      setupFontTokens({ children: [{}] });
    }).toThrow();
  });

  test('It should choose Postscript name if passing in "usePostscriptFontNames" boolean', () => {
    expect(setupFontTokens(fontFrame, true)).toEqual(expect.objectContaining({}));
  });

  test('It should throw an error if frame has "style" and "name" properties but not "style.fontPostScriptName" or "style.fontFamily"', () => {
    expect(() => {
      setupFontTokens({
        children: [
          {
            name: 'Something',
            style: {
              fontPostScriptNameMismatch: false,
              fontFamilyMismatch: 'Something'
            }
          }
        ]
      });
    });
  });
});
*/

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupFontTokens(fontFrame)).toEqual(
      expect.objectContaining({
        light: 'HelveticaNeue',
        medium: 'HelveticaNeue',
        regular: 'HelveticaNeue'
      })
    );
  });
});
