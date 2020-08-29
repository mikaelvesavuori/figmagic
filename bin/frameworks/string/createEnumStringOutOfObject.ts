import { ErrorCreateEnumStringOutOfObject } from '../errors/errors';

/**
 * @description Create enum string from object function
 *
 * @param obj The initial object with data
 */
// TODO: Verify that the string type does not break anything; used to make writeFile implementation work
export function createEnumStringOutOfObject(obj: Record<string, unknown> | string): string {
  if (!obj) throw new Error(ErrorCreateEnumStringOutOfObject);

  return Object.entries(obj).reduce((acc, [key, value]) => {
    return `${acc}\n  '${key}' = '${value}',`;
  }, '');
}
