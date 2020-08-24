import { parseTypographyStylingFromElement } from '../bin/app/process/parseTypographyStylingFromElement';

import { cssTypographyElement } from '../testdata/cssTypographyElement';

/*
describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', async () => {
    await expect(parseTypographyStylingFromElement()).rejects.toThrow();
  });
));
*/

describe('Success cases', () => {
  test('It should successfully return an object, if given valid input', async () => {
    await expect(
      parseTypographyStylingFromElement(cssTypographyElement, 16, true)
    ).resolves.toMatchObject({
      css: `color: rgba(0, 0, 0, 0);
font-size: \${fontSizes.paragraph};
font-family: \${fontFamilies.bold};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: uppercase;
`,
      imports: ['fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights', 'letterSpacings']
    });
  });
});
