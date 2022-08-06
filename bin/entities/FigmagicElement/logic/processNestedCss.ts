import { checkIfStringOnlyContainsReturnsOrSpaces } from '../../../frameworks/string/checkIfStringOnlyContainsReturnsOrSpaces';
import { getId } from '../../../frameworks/string/getId';
import { removeAllIds } from '../../../frameworks/string/removeAllIds';

import {
  ErrorProcessNestedCss,
  ErrorCreateCssString,
  ErrorCleanArrays,
  ErrorGetIntersectingValues,
  ErrorGetUniqueValues
} from '../../../frameworks/errors/errors';

/**
 * @description Process nested CSS into a format that puts shared/common intersecting CSS properties
 * at the top, while unique values get sorted under their respective CSS classes.
 */
export function processNestedCss(css: string): string {
  if (!css) throw Error(ErrorProcessNestedCss);

  // Match or split by CSS class name, like ".ButtonWarning {"
  const CLASS_NAMES: RegExpMatchArray | null = css.match(/\..* {/gi);
  const CLASS_CONTENT = css.split(/\..* {/gi);
  // Remove any empty/garbage first elements
  if (checkIfStringOnlyContainsReturnsOrSpaces(CLASS_CONTENT[0])) CLASS_CONTENT.shift();

  const ARRAYS = cleanArrays(CLASS_NAMES, CLASS_CONTENT);
  const INTERSECTING_VALUES = getIntersectingValues(ARRAYS);
  const UNIQUE_VALUES = getUniqueValues(ARRAYS, INTERSECTING_VALUES);
  return createCssString(INTERSECTING_VALUES, UNIQUE_VALUES);
}

/**
 * @description Collate/package array objects for easier handling in later steps
 */
function cleanArrays(classNames: RegExpMatchArray | null, classContent: string[]): any {
  if (!classNames || !classContent) throw Error(ErrorCleanArrays);

  const CLASSES: any[] = [];

  /**
   * Layout + typography comes in couples following each other,
   * therefore do two in a go (so skip odd array indices).
   */
  classContent.forEach((arrayItem, index) => {
    if (index % 2 !== 0) return;

    const LAYOUT = arrayItem
      .split(/\n/gi)
      .filter((item: string) => item)
      .filter((item: string) => item !== '}');

    const TYPOGRAPHY = classContent[index + 1]
      ? classContent[index + 1]
          .split(/\n/gi)
          .filter((item: string) => item)
          .filter((item: string) => item !== '}')
      : [];

    const css = [...LAYOUT, ...TYPOGRAPHY];

    CLASSES.push({
      className: classNames[index],
      css
    });
  });

  return CLASSES;
}

/**
 * @description Get all shared/common/intersecting values across all "classes". These will then need to float to the top of the CSS document.
 */
function getIntersectingValues(arrays: any[]): any[] {
  if (!arrays) throw Error(ErrorGetIntersectingValues);

  const CSS_ARRAYS = arrays.map((a) => a.css);
  const REDUCED_VALUES = CSS_ARRAYS.reduce((prev, curr) =>
    prev.filter((val: any) => curr.includes(val))
  );
  const INTERSECTING_VALUES = [...new Set(REDUCED_VALUES)];

  return INTERSECTING_VALUES;
}

/**
 * @description Get any unique values and collect them in arrays per class
 */
function getUniqueValues(arrays: any[], intersections: any[]): any[] {
  if (!arrays || !intersections) throw Error(ErrorGetUniqueValues);

  // Get unique values
  const CSS_ARRAYS: any[] = arrays.map((arr) => arr.css);
  const NOT_INTERSECTED: any[] = CSS_ARRAYS.map((arr) =>
    arr.filter((val: any) => !intersections.includes(val))
  );
  const VALUES = NOT_INTERSECTED.map((arr) => [...new Set(arr)]);

  // Enrich unique values (arrays) with their respective class names, as a property
  const UNIQUE_VALUES: any[] = [];
  VALUES.forEach((item, index) => {
    if (item && item.length > 0)
      UNIQUE_VALUES.push({
        css: item,
        className: arrays[index].className
      });
  });

  return UNIQUE_VALUES;
}

/**
 * @description Create CSS string literal
 */
function createCssString(intersections: any[], uniqueValues: any[]): string {
  if (!intersections || !uniqueValues) throw Error(ErrorCreateCssString);

  // Fix order, which has become reversed at this stage
  uniqueValues.reverse();

  // Setup so we can handle nesting and spacing
  let nestingDepth = 0;

  // Put shared, intersecting values at top
  let cssString = `\n`;
  intersections.forEach((i) => (cssString += `  ${i}\n`));
  cssString += `\n`;

  // Put classes and similar after shared values
  uniqueValues.forEach((array: any, index: number) => {
    const { css, className } = array;
    const FIXED_CLASS_NAME = getFixedClassName(className);

    const SPACE = getSpacing(nestingDepth);
    const INNER_SPACE = getSpacing(nestingDepth + 1);

    // Output class name
    cssString += `${SPACE}${FIXED_CLASS_NAME}\n`;

    // Output all individual lines
    css.forEach((item: any) => (cssString += `${INNER_SPACE}${item}\n`));

    const IS_LAST_ELEMENT_WITH_CLASS = !uniqueValues[index + 1]
      ? true
      : checkIfLastElementWithClassname(className, uniqueValues[index + 1].className);

    // Close any level 2-deep elements (currently only supporting one depth layer)
    if (nestingDepth !== 0 && !IS_LAST_ELEMENT_WITH_CLASS) cssString += `${SPACE}}\n`;

    if (IS_LAST_ELEMENT_WITH_CLASS) {
      for (let i = 0; i <= nestingDepth + 1; i++) {
        const _SPACE = getSpacing(nestingDepth);
        cssString += `${_SPACE}}\n`;
        nestingDepth--;
      }
      cssString += `\n`;
      nestingDepth = 0;
      return;
    }

    // Control nesting to only (currently) support two depth-levels
    if (nestingDepth < 1) nestingDepth++;
  });

  // Remove residue (straggler classes)
  if (hasOpenBracketAtEnd(cssString)) {
    const SPLIT_STRING = cssString.split(';');
    cssString = cssString.replace(SPLIT_STRING[SPLIT_STRING.length - 1], '\n');
  }

  cssString = removeAllIds(cssString);

  return cssString;
}

function hasOpenBracketAtEnd(str: string): boolean {
  return str.slice(str.length - 5, str.length).includes('{');
}

function getFixedClassName(className: string): string {
  // Pseudo-selector
  if (className.includes('.:')) return className.replace('.:', '&:');
  // Class selector
  else if (className.includes('.')) return `&${className}`;
  return '';
}

function checkIfLastElementWithClassname(className: string, nextClassName: string): boolean {
  if (getId(className) !== getId(nextClassName)) return true;
  return false;
}

function getSpacing(depth: number): string {
  let spaces = ``;
  for (let i = 0; i <= depth; i++) {
    spaces += `  `;
  }
  return spaces;
}
