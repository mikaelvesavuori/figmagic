import { ErrorGetUniqueValues } from '../../../frameworks/errors/errors';

/**
 * @description Get any unique values and collect them in arrays per class
 */
export function getUniqueValues(arrays: any[], intersections: any[]): any[] {
  if (!arrays || !intersections) throw Error(ErrorGetUniqueValues);

  // Get unique values
  const CSS_ARRAYS: any[] = arrays.map((arr) => arr.css);
  const NON_INTERSECTING: any[] = CSS_ARRAYS.map((arr) =>
    arr.filter((val: any) => !intersections.includes(val))
  );
  const VALUES = NON_INTERSECTING.map((arr) => [...new Set(arr)]);

  // Enrich unique values (arrays) with their respective class names as a property
  const UNIQUE_VALUES: any[] = [];
  VALUES.forEach((item, index) => {
    const usedProperties: string[] = [];
    // @ts-ignore
    const deduplicatedCssRows = item.filter((cssRow: string) => {
      const property = cssRow.split(':')[0];
      if (!usedProperties.includes(property)) {
        usedProperties.push(property);
        return cssRow;
      }
    });

    if (deduplicatedCssRows.length > 0)
      UNIQUE_VALUES.push({
        css: deduplicatedCssRows,
        className: arrays[index].className
      });
  });

  return UNIQUE_VALUES;
}
