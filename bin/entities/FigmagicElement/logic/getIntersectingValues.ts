import { ErrorGetIntersectingValues } from '../../../frameworks/errors/errors';

/**
 * @description Get all shared/common/intersecting values across all "classes".
 * These will then need to float to the top of the CSS document.
 */
export function getIntersectingValues(arrays: any[]): any[] {
  if (!arrays) throw Error(ErrorGetIntersectingValues);

  const CSS_ARRAYS = arrays.map((a) => a.css);
  const REDUCED_VALUES = CSS_ARRAYS.reduce((prev, curr) =>
    prev.filter((val: any) => curr.includes(val))
  );
  const INTERSECTING_VALUES = [...new Set(REDUCED_VALUES)];

  return INTERSECTING_VALUES;
}
