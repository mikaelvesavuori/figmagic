import { IntersectingCssValues, UniqueCssValues } from '../../../contracts/Css';

import { getId } from '../../../frameworks/string/getId';
import { removeAllIds } from '../../../frameworks/string/removeAllIds';

import { ErrorCreateCssString } from '../../../frameworks/errors/errors';

/**
 * @description Create CSS string literal
 */
export function createCssString(
  intersections: IntersectingCssValues,
  uniqueValues: UniqueCssValues[]
): string {
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
  uniqueValues.forEach((cssItem: UniqueCssValues, index: number) => {
    const { css, className } = cssItem;
    const fixedClassName = getFixedClassName(className);

    const space = getSpacing(nestingDepth);
    const innerSpace = getSpacing(nestingDepth + 1);

    // Output class name
    cssString += `${space}${fixedClassName}\n`;

    // Output all individual lines
    css.forEach((item: string) => (cssString += `${innerSpace}${item}\n`));

    const isLastElementWithClass = !uniqueValues[index + 1]
      ? true
      : checkIfLastElementWithClassname(className, uniqueValues[index + 1].className);

    // Close any level 2-deep elements (currently only supporting one depth layer)
    if (nestingDepth !== 0 && !isLastElementWithClass) cssString += `${space}}\n`;

    if (isLastElementWithClass) {
      for (let i = 0; i <= nestingDepth + 1; i++) {
        const _space = getSpacing(nestingDepth);
        cssString += `${_space}}\n`;
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
    const splitString = cssString.split(';');
    cssString = cssString.replace(splitString[splitString.length - 1], '\n');
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
