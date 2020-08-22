import { errorCreateEnumStringOutOfObject } from '../errors/errors';

/**
 * @description Create enum string from object function
 *
 * @param obj The initial object with data
 */

export function createEnumStringOutOfObject(obj: object): string {
  if (!obj) throw new Error(errorCreateEnumStringOutOfObject);

  return Object.entries(obj).reduce((acc, [key, value]) => {
    return `${acc}\n  '${key}' = '${value}',`;
  }, '');
}
