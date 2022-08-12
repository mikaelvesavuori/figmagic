import { cleanArrays } from './cleanArrays';
import { getIntersectingValues } from './getIntersectingValues';
import { getUniqueValues } from './getUniqueValues';
import { createCssString } from './createCssString';

import { checkIfStringOnlyContainsReturnsOrSpaces } from '../../../frameworks/string/checkIfStringOnlyContainsReturnsOrSpaces';

import { ErrorProcessNestedCss } from '../../../frameworks/errors/errors';

/**
 * @description Process nested CSS into a format that puts shared/common intersecting CSS properties
 * at the top, while unique values get sorted under their respective CSS classes.
 */
export function processNestedCss(css: string, textOnlySubchildren: string[] = []): string {
  if (!css) throw Error(ErrorProcessNestedCss);

  // Match or split by CSS class name, like ".ButtonWarning {"
  const classNames: RegExpMatchArray | null = css.match(/\..* {/gi);
  const classContent = css.split(/\..* {/gi);
  // Remove any empty/garbage first elements
  if (checkIfStringOnlyContainsReturnsOrSpaces(classContent[0])) classContent.shift();

  const arrays = cleanArrays(classNames, classContent, textOnlySubchildren);
  const intersectingValues = getIntersectingValues(arrays);
  const uniqueValues = getUniqueValues(arrays, intersectingValues);
  return createCssString(intersectingValues, uniqueValues);
}
