const css = `width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: 65;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: 65;
background-color: \${colors.black\};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: 65;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: 65;
background-color: \${colors.black\};
border-width: \${borderWidths.hairline\};`;

function cleanCss() {
  let newCss = Array.from(new Set(css.split(/\n/gi))).toString();
  newCss = newCss.replace(/;,/gi, '; ');
  console.log(newCss);
}

cleanCss();
