import { parseTypographyStylingFromElement } from '../../../../bin/entities/FigmagicElement/logic/parseTypographyStylingFromElement';

import { TypographyElement } from '../../../../bin/contracts/TypographyElement';

import { cssTypographyElement } from '../../../../testdata/elements/cssTypographyElement';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => parseTypographyStylingFromElement()).toThrow();
  });
});

const makeTypographyElement = (textElement: any): TypographyElement => {
  return {
    textElement,
    remSize: 16,
    outputFormatTokens: 'mjs',
    outputFormatColors: 'rgba',
    letterSpacingUnit: 'em',
    outputFolderTokens: 'tokens',
    usePostscriptFontNames: false
  };
};

describe('Success cases', () => {
  test('It should successfully return an object (MJS format), if given valid input', () => {
    expect(
      // @ts-ignore
      parseTypographyStylingFromElement(makeTypographyElement(cssTypographyElement))
    ).toMatchObject({
      updatedCss: `color: rgba(0, 0, 0, 0);
font-size: \${fontSizes['paragraph']};
font-family: \${fontFamilies['regular']};
font-weight: \${fontWeights['bold']};
line-height: \${lineHeights['xs']};
letter-spacing: \${letterSpacings['wide']};
text-align: center;
text-transform: uppercase;
`,
      updatedImports: ['fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });

  test('It should receive null from getFontColor if missing text element fills', () => {
    const cssTypographyElementNoFill = { ...cssTypographyElement };
    // @ts-ignore
    cssTypographyElementNoFill.fills = null;

    expect(
      // @ts-ignore
      parseTypographyStylingFromElement(makeTypographyElement(cssTypographyElementNoFill))
    ).toMatchObject({
      updatedCss: `font-size: \${fontSizes['paragraph']};
font-family: \${fontFamilies['regular']};
font-weight: \${fontWeights['bold']};
line-height: \${lineHeights['xs']};
letter-spacing: \${letterSpacings['wide']};
text-align: center;
text-transform: uppercase;
`,
      updatedImports: ['fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });

  test('It should receive null from getFontSize if missing text element style', () => {
    const cssTypographyElementNoStyle = { ...cssTypographyElement };
    // @ts-ignore
    cssTypographyElementNoStyle.style = null;

    expect(
      // @ts-ignore
      parseTypographyStylingFromElement(makeTypographyElement(cssTypographyElementNoStyle))
    ).toMatchObject({
      updatedCss: `color: rgba(0, 0, 0, 0);\n`,
      updatedImports: []
    });
  });

  test('It should receive null from getFontFamily if missing fontPostScriptName', () => {
    const cssTypographyElementNoPsName = { ...cssTypographyElement };
    // @ts-ignore
    cssTypographyElementNoPsName.style.fontPostScriptName = null;

    expect(
      // @ts-ignore
      parseTypographyStylingFromElement(makeTypographyElement(cssTypographyElementNoPsName))
    ).toMatchObject({
      updatedCss: `color: rgba(0, 0, 0, 0);
font-size: \${fontSizes['paragraph']};
font-family: \${fontFamilies['regular']};
font-weight: \${fontWeights['bold']};
line-height: \${lineHeights['xs']};
letter-spacing: \${letterSpacings['wide']};
text-align: center;
text-transform: uppercase;
`,
      updatedImports: ['fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });

  test('It should calculate textElement.style.lineHeightPercentFontSize / 100 in getFontLineHeight', () => {
    const cssTypographyElementLineHeightPercent = { ...cssTypographyElement };
    // @ts-ignore
    cssTypographyElementLineHeightPercent.style.lineHeightPercentFontSize = 135;

    expect(
      parseTypographyStylingFromElement(
        // @ts-ignore
        makeTypographyElement(cssTypographyElementLineHeightPercent)
      )
    ).toMatchObject({
      updatedCss: `color: rgba(0, 0, 0, 0);
font-size: \${fontSizes['paragraph']};
font-family: \${fontFamilies['regular']};
font-weight: \${fontWeights['bold']};
line-height: \${lineHeights['s']};
letter-spacing: \${letterSpacings['wide']};
text-align: center;
text-transform: uppercase;
`,
      updatedImports: ['fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });

  test('It should get title case from getFontCase', () => {
    const cssTypographyElementTitleCase = { ...cssTypographyElement };
    // @ts-ignore
    cssTypographyElementTitleCase.style.textCase = 'TITLE';

    expect(
      parseTypographyStylingFromElement(makeTypographyElement(cssTypographyElementTitleCase))
    ).toMatchObject({
      updatedCss: `color: rgba(0, 0, 0, 0);
font-size: \${fontSizes['paragraph']};
font-family: \${fontFamilies['regular']};
font-weight: \${fontWeights['bold']};
line-height: \${lineHeights['s']};
letter-spacing: \${letterSpacings['wide']};
text-align: center;
text-transform: capitalize;
`,
      updatedImports: ['fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });
});
