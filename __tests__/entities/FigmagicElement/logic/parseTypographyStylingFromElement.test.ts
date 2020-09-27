import { parseTypographyStylingFromElement } from '../../../../bin/entities/FigmagicElement/logic/parseTypographyStylingFromElement';

import { cssTypographyElement } from '../../../../testdata/elements/cssTypographyElement';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => parseTypographyStylingFromElement()).toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully return an object (MJS format), if given valid input', () => {
    expect(
      // @ts-ignore
      parseTypographyStylingFromElement(cssTypographyElement, 16, 'mjs', 'em', 'tokens')
    ).toMatchObject({
      updatedCss: `color: rgba(0; 0; 0; 0);
font-size: \${fontSizes.paragraph};
font-family: \${fontFamilies.bold};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
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
      parseTypographyStylingFromElement(cssTypographyElementNoFill, 16, 'mjs', 'em', 'tokens')
    ).toMatchObject({
      updatedCss: `font-size: \${fontSizes.paragraph};
font-family: \${fontFamilies.bold};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
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
      parseTypographyStylingFromElement(cssTypographyElementNoStyle, 16, 'mjs', 'em', 'tokens')
    ).toMatchObject({
      updatedCss: `color: rgba(0; 0; 0; 0);\n`,
      updatedImports: []
    });
  });

  test('It should receive null from getFontFamily if missing fontPostScriptName', () => {
    const cssTypographyElementNoPsName = { ...cssTypographyElement };
    // @ts-ignore
    cssTypographyElementNoPsName.style.fontPostScriptName = null;

    expect(
      // @ts-ignore
      parseTypographyStylingFromElement(cssTypographyElementNoPsName, 16, 'mjs', 'em', 'tokens')
    ).toMatchObject({
      updatedCss: `color: rgba(0; 0; 0; 0);
font-size: \${fontSizes.paragraph};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: uppercase;
`,
      updatedImports: ['fontSizes', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });

  test('It should calculate textElement.style.lineHeightPercentFontSize / 100 in getFontLineHeight', () => {
    const cssTypographyElementLineHeightPercent = { ...cssTypographyElement };
    // @ts-ignore
    cssTypographyElementLineHeightPercent.style.lineHeightPercentFontSize = 135;

    expect(
      parseTypographyStylingFromElement(
        // @ts-ignore
        cssTypographyElementLineHeightPercent,
        16,
        'mjs',
        'em',
        'tokens'
      )
    ).toMatchObject({
      updatedCss: `color: rgba(0; 0; 0; 0);
font-size: \${fontSizes.paragraph};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.s};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: uppercase;
`,
      updatedImports: ['fontSizes', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });

  test('It should get title case from getFontCase', () => {
    const cssTypographyElementTitleCase = { ...cssTypographyElement };
    // @ts-ignore
    cssTypographyElementTitleCase.style.textCase = 'TITLE';

    expect(
      parseTypographyStylingFromElement(
        // @ts-ignore
        cssTypographyElementTitleCase,
        16,
        'mjs',
        'em',
        'tokens'
      )
    ).toMatchObject({
      updatedCss: `color: rgba(0; 0; 0; 0);
font-size: \${fontSizes.paragraph};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.s};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: capitalize;
`,
      updatedImports: ['fontSizes', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });
});
