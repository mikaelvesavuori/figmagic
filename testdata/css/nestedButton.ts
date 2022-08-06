export const nestedButton = `

.:hover__#c76fcef1 {
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
height: \${spacing['12']};
background-color: rgba(123, 34, 34, 1);
border-width: \${borderWidths['normal']};
border-color: rgba(45, 156, 219, 1);
border-radius: \${radii['large']};
}
.:hover__#c76fcef1 {
color: \${colors['white']};
font-size: \${fontSizes['medium']};
font-family: HelveticaNeue-Bold;
font-weight: 700;
line-height: 1;
letter-spacing: 0.05em;
text-align: center;
text-transform: uppercase;
}
.Error__#c76fcef1 {
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
padding-left: \${spacing['04']};
padding-right: \${spacing['04']};
height: \${spacing['12']};
background-color: rgba(235, 87, 87, 1);
border-width: \${borderWidths['normal']};
border-color: rgba(45, 156, 219, 1);
border-radius: \${radii['large']};
}
.Error__#c76fcef1 {
color: \${colors['white']};
font-size: \${fontSizes['medium']};
font-family: HelveticaNeue-Bold;
font-weight: 700;
line-height: 1;
letter-spacing: 0.05em;
text-align: center;
text-transform: uppercase;
}

.:hover__#0a4b8914 {
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
height: \${spacing['12']};
background-color: rgba(242, 201, 76, 1);
border-width: \${borderWidths['normal']};
border-color: rgba(45, 156, 219, 1);
border-radius: \${radii['large']};
}
.:hover__#0a4b8914 {
color: \${colors['white']};
font-size: \${fontSizes['medium']};
font-family: HelveticaNeue-Bold;
font-weight: 700;
line-height: 1;
letter-spacing: 0.05em;
text-align: center;
text-transform: uppercase;
}

.:disabled__#0a4b8914 {
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
height: \${spacing['12']};
background-color: rgba(79, 79, 79, 1);
border-width: \${borderWidths['normal']};
border-color: rgba(45, 156, 219, 1);
border-radius: \${radii['large']};
}
.:disabled__#0a4b8914 {
color: \${colors['white']};
font-size: \${fontSizes['medium']};
font-family: HelveticaNeue-Bold;
font-weight: 700;
line-height: 1;
letter-spacing: 0.05em;
text-align: center;
text-transform: uppercase;
}
.Warning__#0a4b8914 {
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
padding-left: \${spacing['04']};
padding-right: \${spacing['04']};
height: \${spacing['12']};
background-color: rgba(242, 153, 74, 1);
border-width: \${borderWidths['normal']};
border-color: rgba(45, 156, 219, 1);
border-radius: \${radii['large']};
}
.Warning__#0a4b8914 {
color: \${colors['white']};
font-size: \${fontSizes['medium']};
font-family: HelveticaNeue-Bold;
font-weight: 700;
line-height: 1;
letter-spacing: 0.05em;
text-align: center;
text-transform: uppercase;
}

.:disabled__#1e737268 {
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
height: \${spacing['12']};
background-color: rgba(79, 79, 79, 1);
border-width: \${borderWidths['normal']};
border-color: rgba(45, 156, 219, 1);
border-radius: \${radii['large']};
}
.:disabled__#1e737268 {
color: \${colors['white']};
font-size: \${fontSizes['medium']};
font-family: HelveticaNeue-Bold;
font-weight: 700;
line-height: 1;
letter-spacing: 0.05em;
text-align: center;
text-transform: uppercase;
}
.Normal__#1e737268 {
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
padding-left: \${spacing['04']};
padding-right: \${spacing['04']};
height: \${spacing['12']};
background-color: rgba(47, 128, 237, 1);
border-width: \${borderWidths['normal']};
border-color: rgba(45, 156, 219, 1);
border-radius: \${radii['large']};
}
.Normal__#1e737268 {
color: \${colors['white']};
font-size: \${fontSizes['medium']};
font-family: HelveticaNeue-Bold;
font-weight: 700;
line-height: 1;
letter-spacing: 0.05em;
text-align: center;
text-transform: uppercase;
}
`;

export const nestedButtonResult = `
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  height: \${spacing['12']};
  border-width: \${borderWidths['normal']};
  border-color: rgba(45, 156, 219, 1);
  border-radius: \${radii['large']};
  color: \${colors['white']};
  font-size: \${fontSizes['medium']};
  font-family: HelveticaNeue-Bold;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;

  &.Normal {
    padding-left: \${spacing['04']};
    padding-right: \${spacing['04']};
    background-color: rgba(47, 128, 237, 1);
    &:disabled {
      background-color: rgba(79, 79, 79, 1);
    }
  }

  &.Warning {
    padding-left: \${spacing['04']};
    padding-right: \${spacing['04']};
    background-color: rgba(242, 153, 74, 1);
    &:disabled {
      background-color: rgba(79, 79, 79, 1);
    }
    &:hover {
      background-color: rgba(242, 201, 76, 1);
    }
  }

  &.Error {
    padding-left: \${spacing['04']};
    padding-right: \${spacing['04']};
    background-color: rgba(235, 87, 87, 1);
    &:hover {
      background-color: rgba(123, 34, 34, 1);
    }
  }

`;
