import { errorProcessNestedCss, errorCreateCssString } from '../../meta/errors.mjs';

/**
 * Process nested CSS into a format that puts shared/common intersecting CSS properties
 * at the top, while unique values get sorted under their respective CSS classes.
 *
 * @exports
 * @function
 * @param {string} css - Incoming CSS (from processElements.mjs)
 * @returns {string} - The final, cleaned CSS string
 * @throws {error} - When no CSS is provided as input
 */
export function processNestedCss(css) {
  if (!css) throw new Error(errorProcessNestedCss);

  // Match or split by CSS class name, like ".ButtonWarning {"
  let classNames = css.match(/\..* {/gi);
  let classContent = css.split(/\..* {/gi);

  // Remove first to keep same lengths since it can sometimes be just a space
  if (classContent[0] === ' \n') classContent.shift();

  const ARRAYS = cleanArrays(classNames, classContent);

  // Calculate intersections (same properties)
  const INTERSECTIONS = getIntersectingValues(ARRAYS);

  // Calculate unique values
  const UNIQUE_VALUES = getUniqueValues(ARRAYS, INTERSECTIONS);

  // Create CSS string
  const CSS = createCssString(INTERSECTIONS, UNIQUE_VALUES);

  return CSS;
}

/**
 * Clean, process, and sort arrays for later
 *
 * @param {array} classNames - List of class names
 * @param {array} classContent - CSS properties
 * @returns {array} - Final list of cleaned arrays
 */
function cleanArrays(classNames, classContent) {
  const totalClassCount = classContent.length;

  let arrays = [];

  // Loop all couples: Since all styling comes first—then typography—we need to match them together
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

    // Add temp name for class name
    arrC.push(`{{NAME}}${classNames[i]}`);

    // Push to external array
    arrays.push(arrC);
  }

  return arrays;
}

/**
 * Get any shared/common/intersecting values that will need to float to the top of the CSS document
 *
 * @param {array} arrays - Arrays to check
 * @returns {array} - Array of intersecting values
 */
function getIntersectingValues(arrays) {
  let o = {};

  arrays.map((a, index) => {
    o[index] = a;
  });

  return Object.values(o).reduce((a, b) => b.filter(Set.prototype.has, new Set(a)));
}

/**
 * Get any unique values and collect them in arrays per class
 *
 * @param {array} arrays - The cleaned set of arrays
 * @param {array} intersections - The intersecting areas and values
 * @returns {array} - List of unique values per class
 */
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

  return uniqueValues;
}

/**
 * Create CSS string literal
 *
 * @param {array} intersections - List of intersecting values
 * @param {array} uniqueValues - List of unique values
 * @returns {string} - The final, cleaned CSS string
 * @throws {error} - When no intersections or uniqueValues are provided
 */
function createCssString(intersections, uniqueValues) {
  if (!intersections || !uniqueValues) throw new Error(errorCreateCssString);

  let str = ``;

  intersections.forEach(i => {
    str += `${i}\n`;
  });

  str += `\n`;

  uniqueValues.forEach(arr => {
    arr.forEach((i, index) => {
      if (i.includes('{{NAME}}')) {
        const FIXED_CLASS_NAME = i.replace('{{NAME}}', '&');
        str += `${FIXED_CLASS_NAME}\n`;
      } else str += `  ${i}\n`;

      if (index === arr.length - 1) str += `}\n`;
    });

    str += `\n`;
  });

  return str;
}
