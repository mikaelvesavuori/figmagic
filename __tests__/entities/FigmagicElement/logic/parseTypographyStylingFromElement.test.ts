import { parseTypographyStylingFromElement } from '../../../../bin/entities/FigmagicElement/logic/parseTypographyStylingFromElement';

import { cssTypographyElement } from '../../../../testdata/elements/cssTypographyElement';

/*
describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    await expect(parseTypographyStylingFromElement()).rejects.toThrow();
  });
));
*/

describe('Success cases', () => {
  test('It should successfully return an object (MJS format), if given valid input', () => {
    expect(
      // @ts-ignore
      parseTypographyStylingFromElement(cssTypographyElement, 16, 'mjs', 'em', 'tokens')
    ).toMatchObject({
      updatedCss: `color: rgba(0; 0; 0; 0);
font-size: \${fontSizes.paragraph};
font-family: \${fontFamilies.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: uppercase;
`,
      updatedImports: ['fontSizes', 'fontFamilies', 'lineHeights', 'letterSpacings']
    });
  });
});
