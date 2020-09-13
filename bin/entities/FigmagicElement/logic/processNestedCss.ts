import {
  ErrorProcessNestedCss,
  ErrorCreateCssString,
  ErrorCleanArrays,
  ErrorGetIntersectingValues,
  ErrorGetUniqueValues
} from '../../../frameworks/errors/errors';

// TODO: Refactor

/**
 * @description Process nested CSS into a format that puts shared/common intersecting CSS properties
 * at the top, while unique values get sorted under their respective CSS classes.
 *
 * @param css Incoming CSS
 */
export function processNestedCss(css: string): string {
  if (!css) throw new Error(ErrorProcessNestedCss);

  // Match or split by CSS class name, like ".ButtonWarning {"
  const CLASS_NAMES = css.match(/\..* {/gi);
  const CLASS_CONTENT = css.split(/\..* {/gi);

  // Remove first to keep same lengths since it can sometimes be just a space
  if (CLASS_CONTENT[0] === ' \n' || CLASS_CONTENT[0] === '\n') CLASS_CONTENT.shift();

  const ARRAYS = cleanArrays(CLASS_NAMES, CLASS_CONTENT);
  const INTERSECTING_VALUES = getIntersectingValues(ARRAYS);
  const UNIQUE_VALUES = getUniqueValues(ARRAYS, INTERSECTING_VALUES);
  return createCssString(INTERSECTING_VALUES, UNIQUE_VALUES);
}

/**
 * @description Clean, process, and sort arrays for later
 *
 * @param CLASS_NAMES List of class names
 * @param CLASS_CONTENT CSS properties
 */
function cleanArrays(classNames: RegExpMatchArray | null, classContent: any[]): any[] {
  if (!classNames || !classContent) throw new Error(ErrorCleanArrays);

  const TOTAL_CLASS_COUNT = classContent.length;

  const ARRAYS = [];

  // Loop all couples: Since all styling comes first—then typography—we need to match them together
  // TODO: This section is what needs to be updated in order to allow there to be zero (or more than 1) text or layout elements (since the below assumes pairs of layout+text)
  for (let i = 0; i <= TOTAL_CLASS_COUNT / 2 - 1; i++) {
    // Styling
    let arrA = classContent[i].split(/\n/gi);
    arrA = arrA.filter((item: string) => item); // Clean garbage
    arrA = arrA.filter((item: string) => item !== '}');

    // Typography
    let arrB = [];
    // Allow skipping "implicit matches" for typography
    if (classContent[i + TOTAL_CLASS_COUNT / 2]) {
      arrB = classContent[i + TOTAL_CLASS_COUNT / 2].split(/\n/gi);
      arrB = arrB.filter((item: string) => item);
      arrB = arrB.filter((item: string) => item !== '}');
    }

    // Collated and reduced from duplicates
    const arrC = [...new Set([...arrA, ...arrB])];

    // Add temp name for class name
    arrC.push(`{{NAME}}${classNames[i]}`);

    // Push to external array
    ARRAYS.push(arrC);
  }

  return ARRAYS;
}

/**
 * @description Get any shared/common/intersecting values that will need to float to the top of the CSS document
 *
 * @param arrays Arrays to check
 */
function getIntersectingValues(arrays: any[]): any[] {
  if (!arrays) throw new Error(ErrorGetIntersectingValues);

  const obj: { [index: string]: any } = {};
  arrays.forEach((a, index: number) => {
    console.log('xxx', a);
    obj[index] = a;
  });

  // @ts-ignore
  return Object.values(obj).reduce((previousValue: any, currentValue: any) =>
    currentValue.filter(Set.prototype.has, new Set(previousValue))
  );
}

/**
 * @description Get any unique values and collect them in arrays per class
 *
 * @param arrays The cleaned set of arrays
 * @param intersections The intersecting areas and values
 */
function getUniqueValues(arrays: any[], intersections: any[]): any[] {
  if (!arrays || !intersections) throw new Error(ErrorGetUniqueValues);

  const UNIQUE_VALUES: { [index: string]: any }[] = [];

  arrays.forEach((arr) => {
    // Collect properties per class, such as all for ".ButtonError"
    const classArray: Record<string, unknown>[] = [];

    arr.forEach((i: Record<string, unknown>) => {
      if (!intersections.includes(i)) {
        classArray.push(i);
      }
    });

    // Order will be wrong, so reverse it
    classArray.reverse();

    // Send out values
    UNIQUE_VALUES.push(classArray);
  });

  return UNIQUE_VALUES;
}

/**
 * @description Create CSS string literal
 *
 * @param intersections List of intersecting values
 * @param UNIQUE_VALUES List of unique values
 */
function createCssString(intersections: any[], uniqueValues: any[]): string {
  if (!intersections || !uniqueValues) throw new Error(ErrorCreateCssString);

  let str = ``;

  intersections.forEach((i) => {
    str += `${i}\n`;
  });

  str += `\n`;

  uniqueValues.forEach((arr) => {
    arr.forEach((i: string, index: number) => {
      // Yep, you'd wish we set class names or CSS pseudo-selector before we came here,
      // but this is the easiest I've found without breaking everything above.
      // The below match removes the '.' class selector so we can use only ':' for those
      // items that have it provided in the name.
      console.log('////', i);
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
