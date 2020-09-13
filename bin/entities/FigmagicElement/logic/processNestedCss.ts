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
  const CLASS_NAMES: any = css.match(/\..* {/gi);
  const CLASS_CONTENT = css.split(/\..* {/gi);
  //const CLASS_CONTENT = css.split(/,/gi);
  // Remove first to keep same lengths since it can sometimes be just a space
  if (CLASS_CONTENT[0] === ' \n' || CLASS_CONTENT[0] === '\n') CLASS_CONTENT.shift();

  //CLASS_CONTENT = CLASS_CONTENT?.filter((i) => i !== '\n');
  const classes = CLASS_NAMES.filter(
    (item: any, index: any) => CLASS_NAMES.indexOf(item) === index
  );

  const ARRAYS = cleanArrays(classes, CLASS_CONTENT);
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
    let stylingCollection = classContent[i].split(/\n/gi);
    stylingCollection = stylingCollection.filter((item: string) => item); // Clean garbage
    stylingCollection = stylingCollection.filter((item: string) => item !== '}');

    // Typography
    let typographyCollection = [];
    // Allow skipping "implicit matches" for typography
    if (classContent[i + TOTAL_CLASS_COUNT / 2]) {
      typographyCollection = classContent[i + TOTAL_CLASS_COUNT / 2].split(/\n/gi);
      typographyCollection = typographyCollection.filter((item: string) => item);
      typographyCollection = typographyCollection.filter((item: string) => item !== '}');
    }

    // Collated and reduced from duplicates
    const finalCollection = [...new Set([...stylingCollection, ...typographyCollection])];

    // Add temp name for class name
    console.log('classNames[i]', classNames[i]);
    finalCollection.push(`{{NAME}}${classNames[i]}`);

    // Push to external stylingCollectiony
    ARRAYS.push(finalCollection);
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
  arrays.map((a, index: number) => (obj[index] = a));

  // @ts-ignore
  const x = Object.values(obj).reduce((previousValue: any, currentValue: any) =>
    currentValue.filter(Set.prototype.has, new Set(previousValue))
  );
  return x;
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
