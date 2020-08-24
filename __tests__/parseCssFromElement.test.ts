import { parseCssFromElement } from '../bin/app/process/parseCssFromElement';

import { cssLayoutElement } from '../testdata/cssLayoutElement';
import { cssLayoutElementGradient } from '../testdata/cssLayoutElementGradient';
import { cssLayoutElementShadow } from '../testdata/cssLayoutElementShadow';
import { cssTypographyElement } from '../testdata/cssTypographyElement';

/*
test('It should throw an error if no parameter is provided', async () => {
  await expect(parseCssFromElement()).rejects.toThrow();
});
*/

test('It should successfully return an object, if given valid input', async () => {
  await expect(
    parseCssFromElement(cssLayoutElement, cssTypographyElement, 16, true)
  ).resolves.toMatchObject({
    css: `width: 100%;
box-sizing: border-box;
padding-top: 33.8125rem;
height: \${spacing.big};
background-color: rgba(0, 0, 0, 0);
border: 0;
border-style: solid;
border-width: \${borderWidths.hairline};
border-color: rgba(0, 0, 0, 0);
border-radius: \${radii.soft};
`,
    imports: ['spacing', 'spacing', 'borderWidths', 'radii']
  });
});

// Linear gradient
test('It should apply linear gradient', async () => {
  await expect(
    parseCssFromElement(cssLayoutElementGradient, cssTypographyElement, 16, true)
  ).resolves.toMatchObject({
    css: `width: 100%;
box-sizing: border-box;
padding-bottom: 17.25rem;
padding-right: 0.0625rem;
height: 147;
background: linear-gradient(rgba(255, 255, 255, 255) 20%, rgba(43, 83, 144, 252) 45%, rgba(1, 10, 23, 194) 73%);
border: 0;
border-style: solid;
border-width: \${borderWidths.hairline};
border-color: \${colors.blue2};
border-radius: \${radii.soft};
`,
    imports: ['spacing', 'borderWidths', 'colors', 'radii']
  });
});

// Shadow
test('It should apply shadow', async () => {
  await expect(
    parseCssFromElement(cssLayoutElementShadow, cssTypographyElement, 16, true)
  ).resolves.toMatchObject({
    css: `width: 100%;
box-sizing: border-box;
padding-top: 24.4375rem;
padding-left: 25rem;
height: \${spacing.big};
background-color: \${colors.gray5};
border: 0;
border-style: solid;
border-width: \${borderWidths.regular};
border-color: \${colors.black};
border-radius: \${radii.rounded};
box-shadow: \${shadows.deep};
`,
    imports: ['spacing', 'spacing', 'colors', 'borderWidths', 'colors', 'radii', 'shadows']
  });
});
