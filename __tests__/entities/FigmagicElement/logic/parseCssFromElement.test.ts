import { parseCssFromElement } from '../../../../bin/entities/FigmagicElement/logic/parseCssFromElement';

import { cssLayoutElement } from '../../../../testdata/elements/cssLayoutElement';
import { cssLayoutElementGradient } from '../../../../testdata/elements/cssLayoutElementGradient';
import { cssLayoutElementShadow } from '../../../../testdata/elements/cssLayoutElementShadow';
import { cssTypographyElement } from '../../../../testdata/elements/cssTypographyElement';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => parseCssFromElement()).toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully return an object (MJS), if given valid input', () => {
    expect(
      // @ts-ignore
      parseCssFromElement(cssLayoutElement, cssTypographyElement, 16, 'mjs', 'tokens')
    ).toMatchObject({
      updatedCss: `width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
padding-top: 33.8125rem;
padding-bottom: -33.8125rem;
height: \${spacing['big']};
background-color: rgba(0, 0, 0, 0);
border-width: \${borderWidths['hairline']};
border-color: rgba(0, 0, 0, 0);
border-radius: \${radii['soft']};
`,
      updatedImports: ['spacing', 'spacing', 'borderWidths', 'radii']
    });
  });

  // Linear gradient
  test('It should apply linear gradient', () => {
    expect(
      // @ts-ignore
      parseCssFromElement(cssLayoutElementGradient, cssTypographyElement, 16, 'mjs', 'tokens')
    ).toMatchObject({
      updatedCss: `width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
padding-top: -11.0625rem;
padding-bottom: 17.25rem;
padding-left: -0.0625rem;
padding-right: 0.0625rem;
height: 147px;
background: linear-gradient(180deg, rgba(255, 255, 255, 1) 20%, rgba(43, 83, 144, 0.99) 45%, rgba(1, 10, 23, 0.76) 73%);
border-width: \${borderWidths['hairline']};
border-color: \${colors['blue2']};
border-radius: \${radii['soft']};
`,
      updatedImports: ['spacing', 'borderWidths', 'colors', 'radii']
    });
  });

  // Shadow
  test('It should apply shadow', () => {
    expect(
      // @ts-ignore
      parseCssFromElement(cssLayoutElementShadow, cssTypographyElement, 16, 'mjs', 'tokens')
    ).toMatchObject({
      updatedCss: `width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
padding-top: 24.4375rem;
padding-bottom: -24.4375rem;
padding-left: 25rem;
padding-right: -25rem;
height: \${spacing['big']};
background-color: \${colors['gray5']};
border-width: \${borderWidths['regular']};
border-color: \${colors['black']};
border-radius: \${radii['rounded']};
box-shadow: \${shadows['deep']};
`,
      updatedImports: ['spacing', 'spacing', 'colors', 'borderWidths', 'colors', 'radii', 'shadows']
    });
  });
});
