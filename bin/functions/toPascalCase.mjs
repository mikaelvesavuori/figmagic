//import { errorCamelize } from '../meta/errors.mjs';

/**
 * Camel-case transform a string
 *
 * @exports
 * @function
 * @param {string} str - The string to camelcase
 * @returns {string} - The final string
 * @throws {error} - When no string is provided
 */
export function toPascalCase(str) {
  let recasedString = str.replace(/\w+/g, w => {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });

  recasedString = recasedString.replace(/\s+/g, '');

  return recasedString;
}
