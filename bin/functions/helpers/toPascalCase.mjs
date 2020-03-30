import { errorToPascalCase } from '../../meta/errors.mjs';

/**
 * Pascal-case transform a string
 *
 * @exports
 * @function
 * @param {string} str - The string to Pascal case
 * @returns {string} - The final string
 * @throws {errorToPascalCase} - When no string is provided
 */
export function toPascalCase(str) {
  if (!str) throw new Error(errorToPascalCase);

  let recasedString = str.replace(/\w+/g, w => {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });

  recasedString = recasedString.replace(/\s+/g, '');

  return recasedString;
}
