export const buttonCss = `
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

export const expectedButtonCss = `

  &.ButtonRegular {
    color: \${colors.white};
    font-size: \${fontSizes.m};
    font-family: \${fontFamilies.bold};
    font-weight: \${fontWeights.bold};
    line-height: \${lineHeights.xs};
    letter-spacing: \${letterSpacings.wide};
    text-align: center;
    text-transform: uppercase;
    &.ButtonWarning {
      color: \${colors.white};
      font-size: \${fontSizes.m};
      font-family: \${fontFamilies.bold};
      font-weight: \${fontWeights.bold};
      line-height: \${lineHeights.xs};
      letter-spacing: \${letterSpacings.wide};
      text-align: center;
      text-transform: uppercase;
    }
    &.ButtonError {
      color: \${colors.white};
      font-size: \${fontSizes.m};
      font-family: \${fontFamilies.bold};
      font-weight: \${fontWeights.bold};
      line-height: \${lineHeights.xs};
      letter-spacing: \${letterSpacings.wide};
      text-align: center;
      text-transform: uppercase;
    }
    &.ButtonRegular {
      width: 100%;
      height: \${spacing.big};
      background-color: \${colors.blue1};
      border: 0;
      border-style: solid;
      border-width: \${borderWidths.hairline};
      border-color: \${colors.blue2};
      border-radius: \${radii.soft};
    }
    &.ButtonWarning {
      width: 100%;
      height: \${spacing.big};
      background-color: \${colors.orange};
      border: 0;
      border-style: solid;
      border-width: \${borderWidths.hairline};
      border-color: \${colors.blue2};
      border-radius: \${radii.soft};
    }
    &.ButtonError {
      width: 100%;
      height: \${spacing.big};
      background-color: \${colors.red};
      border: 0;
      border-style: solid;
      border-width: \${borderWidths.hairline};
      border-color: \${colors.blue2};
      border-radius: \${radii.soft};
    }
  }

`;
