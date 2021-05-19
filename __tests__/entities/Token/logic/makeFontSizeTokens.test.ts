import { makeFontSizeTokens } from '../../../../bin/entities/Token/logic/makeFontSizeTokens';

import {
  fontSizeFrame,
  fontSizeFrameInvalidNoStyle,
  fontSizeFrameInvalidNoFontSize
} from '../../../../testdata/frames/fontSizeFrame';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeFontSizeTokens();
    }).toThrow();
  });

  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeFontSizeTokens({});
    }).toThrow();
  });

  test('It should throw an error if frame does not contain "name" property', () => {
    expect(() => {
      // @ts-ignore
      makeFontSizeTokens(fontSizeFrameInvalidNoName);
    }).toThrow();
  });

  test('It should throw an error if frame does not contain "style" property', () => {
    expect(() => {
      // @ts-ignore
      makeFontSizeTokens(fontSizeFrameInvalidNoStyle);
    }).toThrow();
  });

  test('It should throw an error if frame has "style" and "name" properties but not "style.fontSize"', () => {
    expect(() => {
      // @ts-ignore
      makeFontSizeTokens(fontSizeFrameInvalidNoFontSize);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('Given valid input and "rem" for unit, it should return a valid and correct set of font size tokens ', () => {
    expect(makeFontSizeTokens(fontSizeFrame, 'rem', 16)).toEqual(
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

  test('Given valid input and "em" for unit, it should return a valid and correct set of font size tokens ', () => {
    expect(makeFontSizeTokens(fontSizeFrame, 'em', 16)).toEqual(
      expect.objectContaining({
        h1: '3em',
        h2: '2.5em',
        h3: '2em',
        h4: '1.625em',
        h5: '1.25em',
        h6: '1.125em',
        paragraph: '1em',
        sub: '0.75em'
      })
    );
  });

  test('Given valid input and "px" for unit, it should return a valid and correct set of font size tokens ', () => {
    expect(makeFontSizeTokens(fontSizeFrame, 'px', 16)).toEqual(
      expect.objectContaining({
        h1: '48px',
        h2: '40px',
        h3: '32px',
        h4: '26px',
        h5: '20px',
        h6: '18px',
        paragraph: '16px',
        sub: '12px'
      })
    );
  });
});
