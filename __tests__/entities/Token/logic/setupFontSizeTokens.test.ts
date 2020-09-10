import { setupFontSizeTokens } from '../../../../bin/entities/Token/logic/setupFontSizeTokens';

import {
  fontSizeFrame,
  fontSizeFrameInvalidNoStyle,
  fontSizeFrameInvalidNoFontSize
} from '../../../../testdata/frames/fontSizeFrame';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      setupFontSizeTokens();
    }).toThrow();
  });

  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      setupFontSizeTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not contain "name" property', () => {
    expect(() => {
      // @ts-ignore
      setupFontSizeTokens(fontSizeFrameInvalidNoName);
    }).toThrow();
  });

  test('It should throw an error if frame does not contain "style" property', () => {
    expect(() => {
      // @ts-ignore
      setupFontSizeTokens(fontSizeFrameInvalidNoStyle);
    }).toThrow();
  });

  test('It should throw an error if frame has "style" and "name" properties but not "style.fontSize"', () => {
    expect(() => {
      // @ts-ignore
      setupFontSizeTokens(fontSizeFrameInvalidNoFontSize);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupFontSizeTokens(fontSizeFrame, 'rem', 16)).toEqual(
      expect.objectContaining({
        h1: '3rem',
        h2: '2.5rem',
        h3: '2rem',
        h4: '1.625rem',
        h5: '1.25rem',
        h6: '1.125rem',
        paragraph: '1rem',
        sub: '0.75rem'
      })
    );
  });
});
