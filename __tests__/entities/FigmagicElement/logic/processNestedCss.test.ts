import { processNestedCss } from '../../../../bin/entities/FigmagicElement/logic/processNestedCss';

const css = `
.ButtonError {
width: 100%;
height: \${spacing.big};
background-color: \${colors.red};
border: 0;
border-style: solid;
border-width: \${borderWidths.hairline};
border-color: \${colors.blue2};
border-radius: \${radii.soft};
}
.ButtonWarning {
width: 100%;
height: \${spacing.big};
background-color: \${colors.orange};
border: 0;
border-style: solid;
border-width: \${borderWidths.hairline};
border-color: \${colors.blue2};
border-radius: \${radii.soft};
}
.ButtonRegular {
width: 100%;
height: \${spacing.big};
background-color: \${colors.blue1};
border: 0;
border-style: solid;
border-width: \${borderWidths.hairline};
border-color: \${colors.blue2};
border-radius: \${radii.soft};
}
.ButtonError {
color: \${colors.white};
font-size: \${fontSizes.m};
font-family: \${fontFamilies.bold};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: uppercase;
}
.ButtonWarning {
color: \${colors.white};
font-size: \${fontSizes.m};
font-family: \${fontFamilies.bold};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: uppercase;
}
.ButtonRegular {
color: \${colors.white};
font-size: \${fontSizes.m};
font-family: \${fontFamilies.bold};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: uppercase;
}`;

const expected = `width: 100%;
height: \${spacing.big};
border: 0;
border-style: solid;
border-width: \${borderWidths.hairline};
border-color: \${colors.blue2};
border-radius: \${radii.soft};
color: \${colors.white};
font-size: \${fontSizes.m};
font-family: \${fontFamilies.bold};
font-weight: \${fontWeights.bold};
line-height: \${lineHeights.xs};
letter-spacing: \${letterSpacings.wide};
text-align: center;
text-transform: uppercase;

&.ButtonError {
  background-color: \${colors.red};
}

&.ButtonWarning {
  background-color: \${colors.orange};
}

&.ButtonRegular {
  background-color: \${colors.blue1};
}

`;

/*
describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      processNestedCss();
    }).toThrow();
  });
});
*/

describe('Success cases', () => {
  test('It should correctly process CSS that has valid input', () => {
    expect(processNestedCss(css)).toBe(expected);
  });
});
