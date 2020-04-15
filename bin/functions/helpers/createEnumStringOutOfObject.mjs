/**
 * Create enum string from object function
 *
 * @exports
 * @function
 * @param {object} obj - The initial object with data
 * @returns {string} - The final string(enum)
 */

export function createEnumStringOutOfObject(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return `${acc}\n  '${key}' = '${value}',`;
  }, '');
}
