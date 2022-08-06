export const nestedButtonTextOnly = `

.Strong__#23c21900 {
color: \${colors['white']};
font-size: \${fontSizes['tinier']};
font-family: \${fontFamilies['strong']};
font-weight: \${fontWeights['strong']};
line-height: \${lineHeights['normal']};
text-align: left;
}

.Standard__#64895a9e {
color: \${colors['white']};
font-size: \${fontSizes['tinier']};
font-family: \${fontFamilies['normal']};
font-weight: \${fontWeights['normal']};
line-height: \${lineHeights['normal']};
text-align: left;
}

.Light__#02562f6f {
color: \${colors['white']};
font-size: \${fontSizes['tinier']};
font-family: \${fontFamilies['light']};
font-weight: \${fontWeights['light']};
line-height: \${lineHeights['normal']};
text-align: left;
}`;

export const nestedButtonTextOnlyResult = `
  color: \${colors['white']};
  font-size: \${fontSizes['tinier']};
  line-height: \${lineHeights['normal']};
  text-align: left;

  &.Light {
    font-family: \${fontFamilies['light']};
    font-weight: \${fontWeights['light']};
  }

  &.Standard {
    font-family: \${fontFamilies['normal']};
    font-weight: \${fontWeights['normal']};
  }

  &.Strong {
    font-family: \${fontFamilies['strong']};
    font-weight: \${fontWeights['strong']};
  }

`;
