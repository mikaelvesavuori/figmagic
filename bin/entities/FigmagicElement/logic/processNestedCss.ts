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
  //const CLASS_NAMES = _CLASS_NAMES.filter(
  //  (item: any, index: any) => _CLASS_NAMES.indexOf(item) === index
  //);
  const CLASS_CONTENT = css.split(/\..* {/gi); //const CLASS_CONTENT = css.split(/,/gi);
  // Remove first to keep same lengths since it can sometimes be just a space
  if (CLASS_CONTENT[0] === ' \n' || CLASS_CONTENT[0] === '\n') CLASS_CONTENT.shift();
  //CLASS_CONTENT = CLASS_CONTENT?.filter((i) => i !== '\n');

  const ARRAYS = cleanArrays(CLASS_NAMES, CLASS_CONTENT);
  const INTERSECTING_VALUES = getIntersectingValues(ARRAYS);
  const UNIQUE_VALUES = getUniqueValues(ARRAYS, INTERSECTING_VALUES);
  return createCssString(INTERSECTING_VALUES, UNIQUE_VALUES);
}

/**
 * @description Collate/package array objects for easier handling in later steps
 *
 * @param CLASS_NAMES List of class names
 * @param CLASS_CONTENT CSS properties
 */
function cleanArrays(classNames: RegExpMatchArray | null, classContent: string[]): any {
  if (!classNames || !classContent) throw new Error(ErrorCleanArrays);

  const values: any[] = [];

  classContent.forEach((arrayItem, index) => {
    //console.log('****', index, index % 2 !== 0);
    if (index % 2 !== 0) return;
    //if (index >= classContent.length - 1) return;

    const layout = arrayItem
      .split(/\n/gi)
      .filter((item: string) => item)
      .filter((item: string) => item !== '}');

    const typography = classContent[index + 1]
      .split(/\n/gi)
      .filter((item: string) => item)
      .filter((item: string) => item !== '}');

    const css = [...layout, ...typography];

    values.push({
      className: classNames[index],
      css
    });
  });

  return values;
}

/**
 * @description Get all shared/common/intersecting values across all "classes". These will then need to float to the top of the CSS document.
 *
 * @param arrays Arrays to check
 */
function getIntersectingValues(arrays: any[]): any[] {
  if (!arrays) throw new Error(ErrorGetIntersectingValues);

  const CSS_ARRAYS = arrays.map((a) => a.css);
  const _INTERSECTING_VALUES = CSS_ARRAYS.reduce((prev, curr) =>
    prev.filter((val: any) => curr.includes(val))
  );
  const INTERSECTING_VALUES = [...new Set(_INTERSECTING_VALUES)];

  return INTERSECTING_VALUES;
}

/**
 * @description Get any unique values and collect them in arrays per class
 *
 * @param arrays The cleaned set of arrays
 * @param intersections The intersecting areas and values
 */
function getUniqueValues(arrays: any[], intersections: any[]): any[] {
  if (!arrays || !intersections) throw new Error(ErrorGetUniqueValues);

  // Get unique values
  const CSS_ARRAYS: any[] = arrays.map((arr) => arr.css);
  const VALUES: any[] = CSS_ARRAYS.map((arr) =>
    arr.filter((val: any) => !intersections.includes(val))
  );

  // Enrich unique values (arrays) with their respective class names, as a property
  const UNIQUE_VALUES: any[] = [];
  VALUES.map((item, index) => {
    UNIQUE_VALUES.push({
      css: item,
      className: arrays[index].className
    });
  });

  return UNIQUE_VALUES;
}

/**
 * @description Create CSS string literal
 *
 * @param intersections List of intersecting values
 * @param uniqueValues List of unique values
 */
function createCssString(intersections: any[], uniqueValues: any[]): string {
  if (!intersections || !uniqueValues) throw new Error(ErrorCreateCssString);

  // Shared, intersecting values at top
  let cssString = `\n`;
  intersections.forEach((i) => (cssString += `  ${i}\n`));
  cssString += `\n`;

  // Classes and similar
  uniqueValues.forEach((arr) => {
    if (arr.className.includes('.:') || arr.className.includes('.')) {
      const FIXED_CLASS_NAME = (() => {
        // Pseudo-selector
        if (arr.className.includes('.:')) return arr.className.replace('.:', '&:');
        // Class selector
        else if (arr.className.includes('.')) return `&${arr.className}`;
      })();
      cssString += `  ${FIXED_CLASS_NAME}\n`;
    } else cssString += `  ${arr.className}\n`;

    arr.css.forEach((item: any, index: number) => {
      cssString += `    ${item}\n`;
      if (index === arr.css.length - 1) cssString += `  }\n\n`; // End
    });
  });

  return cssString;
}
