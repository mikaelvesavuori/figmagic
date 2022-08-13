import { UniqueCssValues } from '../../../contracts/Css';

import { ErrorGetUniqueValues } from '../../../frameworks/errors/errors';

/**
 * @description Get any unique values and collect them in arrays per class
 */
export function getUniqueValues(
  arrays: UniqueCssValues[],
  intersections: string[]
): UniqueCssValues[] {
  if (!arrays || !intersections) throw Error(ErrorGetUniqueValues);

  // Get unique values
  const cssArrays: string[][] = arrays.map((arr) => arr.css);
  const nonIntersectingValues: string[][] = cssArrays.map((arr: string[]) =>
    arr.filter((val: string) => !intersections.includes(val))
  );

  const fixedUniqueValues: UniqueCssValues[] = [];

  const values = nonIntersectingValues.map((arr: string[]) => [...new Set(arr)]);
  values.forEach((item: string[], index: number) => {
    const usedProperties: string[] = [];
    // @ts-ignore
    const deduplicatedCssRows = item.filter((cssRow: string) => {
      /**
       * Enrich unique values (arrays) with their respective class names as a property
       */
      const property = cssRow.split(':')[0];
      if (!usedProperties.includes(property)) {
        usedProperties.push(property);
        return cssRow;
      }
    });

    if (deduplicatedCssRows.length > 0)
      fixedUniqueValues.push({
        css: deduplicatedCssRows,
        className: arrays[index].className
      });
  });

  return fixedUniqueValues;
}
