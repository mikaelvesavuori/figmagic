import { IntersectingCssValues, UniqueCssValues } from '../../../contracts/Css';

import { ErrorGetIntersectingValues } from '../../../frameworks/errors/errors';

/**
 * @description Get all shared/common/intersecting values across all "classes".
 * These will then need to float to the top of the CSS document.
 */
export function getIntersectingValues(arrays: UniqueCssValues[]): IntersectingCssValues {
  if (!arrays) throw Error(ErrorGetIntersectingValues);

  const CSS_ARRAYS = arrays.map((a) => a.css);
  const REDUCED_VALUES = CSS_ARRAYS.reduce((prev: string[], curr: string[]) =>
    prev.filter((val: string) => curr.includes(val))
  );
  const INTERSECTING_VALUES = [...new Set(REDUCED_VALUES)] as string[];

  return INTERSECTING_VALUES;
}
