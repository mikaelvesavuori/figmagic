import {
  errorProcessNestedCss,
  errorCreateCssString,
  errorCleanArrays,
  errorGetIntersectingValues,
  errorGetUniqueValues
} from '../../meta/errors';

// TODO: Refactor

/**
 * Process nested CSS into a format that puts shared/common intersecting CSS properties
 * at the top, while unique values get sorted under their respective CSS classes.
 *
 * @exports
 * @function
 * @param {string} css - Incoming CSS (from processElements.ts)
 * @returns {string} - The final, cleaned CSS string
 * @throws {errorProcessNestedCss} - When no CSS is provided as input
 */
export function processNestedCss(css: string): string {
  if (!css) throw new Error(errorProcessNestedCss);

  // Match or split by CSS class name, like ".ButtonWarning {"
  // css.match(/\..* {|:.* {/gi);
  let classNames = css.match(/\..* {/gi);
  let classContent = css.split(/\..* {/gi);

  //if (classNames && classContent) {
  // Remove first to keep same lengths since it can sometimes be just a space
  if (classContent[0] === ' \n' || classContent[0] === '\n') classContent.shift();

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
 * @function
 * @param {array} classNames - List of class names
 * @param {array} classContent - CSS properties
 * @returns {array} - Final list of cleaned arrays
 * @throws {errorCleanArrays} - Throws error when no classNames or classContent are provided
 */
function cleanArrays(classNames, classContent) {
  if (!classNames || !classContent) throw new Error(errorCleanArrays);

  const totalClassCount = classContent.length;

  let arrays = [];

  // Loop all couples: Since all styling comes first—then typography—we need to match them together
  // TODO: This section is what needs to be updated in order to allow there to be zero (or more than 1) text or layout elements (since the below assumes pairs of layout+text)
  for (let i = 0; i <= totalClassCount / 2 - 1; i++) {
    // Styling
    let arrA = classContent[i].split(/\n/gi);
    arrA = arrA.filter((item) => item); // Clean garbage
    arrA = arrA.filter((item) => item !== '}');

    // Typography
    let arrB = [];
    // Allow skipping "implicit matches" for typography
    if (classContent[i + totalClassCount / 2]) {
      arrB = classContent[i + totalClassCount / 2].split(/\n/gi);
      arrB = arrB.filter((item) => item);
      arrB = arrB.filter((item) => item !== '}');
    }

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
 * @function
 * @param {array} arrays - Arrays to check
 * @returns {array} - Array of intersecting values
 * @throws {errorGetIntersectingValues} - Throws error when no "arrays" argument if provided
 */
function getIntersectingValues(arrays: any[]) {
  if (!arrays) throw new Error(errorGetIntersectingValues);

  let obj = {};

  arrays.forEach((a, index) => {
    obj[index] = a;
  });

  return Object.values(obj).reduce((previousValue, currentValue) => {
    // TODO: Clean this
    // @ts-ignore-line
    return currentValue.filter(Set.prototype.has, new Set(previousValue));
  });
}

/**
 * Get any unique values and collect them in arrays per class
 *
 * @function
 * @param {array} arrays - The cleaned set of arrays
 * @param {array} intersections - The intersecting areas and values
 * @returns {array} - List of unique values per class
 * @throws {errorGetUniqueValues} - Throws error when missing "arrays" or "intersections" arguments
 */
function getUniqueValues(arrays, intersections) {
  if (!arrays || !intersections) throw new Error(errorGetUniqueValues);

  let uniqueValues = [];

  arrays.forEach((arr) => {
    // Collect properties per class, such as all for ".ButtonError"
    let classArray = [];

    arr.forEach((i) => {
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
 * @function
 * @param {array} intersections - List of intersecting values
 * @param {array} uniqueValues - List of unique values
 * @returns {string} - The final, cleaned CSS string
 * @throws {errorCreateCssString} - When no intersections or uniqueValues are provided
 */
function createCssString(intersections, uniqueValues) {
  if (!intersections || !uniqueValues) throw new Error(errorCreateCssString);

  let str = ``;

  intersections.forEach((i) => {
    str += `${i}\n`;
  });

  str += `\n`;

  uniqueValues.forEach((arr) => {
    arr.forEach((i, index) => {
      // Yep, you'd wish we set class names or CSS pseudo-selector before we came here,
      // but this is the easiest I've found without breaking everything above.
      // The below match removes the '.' class selector so we can use only ':' for those
      // items that have it provided in the name.
      const MATCH = i.includes(':') ? '{{NAME}}.' : '{{NAME}}';

      if (i.includes(MATCH)) {
        const FIXED_CLASS_NAME = i.replace(MATCH, '&');
        str += `${FIXED_CLASS_NAME}\n`;
      } else str += `  ${i}\n`;

      if (index === arr.length - 1) str += `}\n`;
    });

    str += `\n`;
  });

  return str;
}
