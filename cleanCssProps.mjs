const data = `
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

function cleanCssProps() {
  // Match or split by CSS class name, like ".ButtonWarning {"
  let classNames = data.match(/\..* {/gi);
  let classContent = data.split(/\..* {/gi);

  classContent.shift(); // Remove first to keep same lengths

  let arrays = cleanArrays(classNames, classContent);

  // Calculate intersections (same properties)
  const INTERSECTIONS = getIntersectingValues(arrays);

  // Calculate unique values
  const UNIQUE_VALUES = getUniqueValues(arrays, INTERSECTIONS);

  // Create CSS string
  const CSS = createCssString(INTERSECTIONS, UNIQUE_VALUES);

  console.log(CSS);
}

function cleanArrays(classNames, classContent) {
  const totalClassCount = classContent.length;

  console.log(totalClassCount, totalClassCount / 2);

  let arrays = [];

  // Loop all couples
  // Since all styling comes first—then typography—we need to match them together
  for (let i = 0; i <= totalClassCount / 2 - 1; i++) {
    // Styling
    let arrA = classContent[i].split(/\n/gi);
    arrA = arrA.filter(item => item); // Clean garbage
    arrA = arrA.filter(item => item !== '}');
    // Typography
    let arrB = classContent[i + totalClassCount / 2].split(/\n/gi);
    arrB = arrB.filter(item => item);
    arrB = arrB.filter(item => item !== '}');
    // Collated and reduced from duplicates
    let arrC = [...new Set([...arrA, ...arrB])];
    // Add name
    arrC.push(`{{NAME}}${classNames[i]}`);
    // Push to external array
    arrays.push(arrC);
  }

  return arrays;
}

function getIntersectingValues(arrays) {
  let o = {};
  arrays.map((a, index) => {
    o[index] = a;
  });

  const intersections = Object.values(o).reduce((a, b) => b.filter(Set.prototype.has, new Set(a)));
  return intersections;
}

function getUniqueValues(arrays, intersections) {
  let uniqueValues = [];

  arrays.map(arr => {
    // Collect properties per class, such as all for ".ButtonError"
    let classArray = [];

    arr.map(i => {
      if (!intersections.includes(i)) {
        classArray.push(i);
      }
    });

    // Order will be wrong, so reverse it
    classArray.reverse();

    // Send out values
    uniqueValues.push(classArray);
  });

  return arrays;
}

function createCssString(intersections, uniqueValues) {
  if (!intersections || !uniqueValues) throw new Error('Missing values!'); // TODO: Add error

  let str = ``;

  intersections.forEach(i => {
    str += `${i}\n`;
  });

  str += `\n`;

  uniqueValues.forEach(arr => {
    arr.forEach((i, index) => {
      if (i.includes('{{NAME}}')) {
        const FIXED_CLASS_NAME = i.replace('{{NAME}}', '');
        str += `${FIXED_CLASS_NAME}\n`;
      } else str += `  ${i}\n`;

      if (index === arr.length - 1) str += `}\n`;
    });

    str += `\n`;
  });

  return str;
}

cleanCssProps();

const expected = `
width: 100%;
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

.ButtonError {
	background-color: \${colors.red};
}

.ButtonWarning {
	background-color: \${colors.orange};
}

.ButtonRegular {
	background-color: \${colors.blue1};
}`;
