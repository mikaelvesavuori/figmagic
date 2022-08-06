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
  const CLASS_NAMES: RegExpMatchArray | null = css.match(/\..* {/gi);
  const CLASS_CONTENT = css.split(/\..* {/gi);
  // Remove any empty/garbage first elements
  if (checkIfStringOnlyContainsReturnsOrSpaces(CLASS_CONTENT[0])) CLASS_CONTENT.shift();

  const ARRAYS = cleanArrays(CLASS_NAMES, CLASS_CONTENT, textOnlySubchildren);
  const INTERSECTING_VALUES = getIntersectingValues(ARRAYS);
  const UNIQUE_VALUES = getUniqueValues(ARRAYS, INTERSECTING_VALUES);
  return createCssString(INTERSECTING_VALUES, UNIQUE_VALUES);
}
