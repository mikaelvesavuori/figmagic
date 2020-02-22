import { errorCamelize } from '../meta/errors.mjs';

/**
 * Camel-case transform a string
 *
 * @exports
 * @function
 * @param {string} str - The string to camelcase
 * @returns {string} - The final string
 * @throws {Error} - When no string is provided
 */
export function camelize(str) {
  if (str) {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  } else {
    throw new Error(errorCamelize);
  }
}
