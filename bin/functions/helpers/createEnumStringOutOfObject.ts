import { errorCreateEnumStringOutOfObject } from '../../meta/errors';

/**
 * Create enum string from object function
 *
 * @exports
 * @function
 * @param {object} obj - The initial object with data
 * @returns {string} - The final string(enum)
 * @throws {errorCreateEnumStringOutOfObject} - Throws error if no importArray is provided
 */

export function createEnumStringOutOfObject(obj: object): string {
  if (!obj) throw new Error(errorCreateEnumStringOutOfObject);

  return Object.entries(obj).reduce((acc, [key, value]) => {
    return `${acc}\n  '${key}' = '${value}',`;
  }, '');
}
