import { ErrorCreateEnumStringOutOfObject } from '../errors/errors';

/**
 * @description Create enum string from object function
 */
export function createEnumStringOutOfObject(obj: Record<string, unknown> | string): string {
  if (!obj) throw Error(ErrorCreateEnumStringOutOfObject);

  return Object.entries(obj).reduce((acc, [key, value]) => {
    return `${acc}\n  '${key}' = '${value}',`;
  }, '');
}
