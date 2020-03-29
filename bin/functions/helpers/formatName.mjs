import { errorFormatName } from '../../meta/errors.mjs';
import { forbiddenCharacters } from '../../meta/forbiddenCharacters.mjs';

/**
 * Used to clean and format the name of a file
 *
 * @exports
 * @function
 * @param {string} str - The incoming name
 * @returns {string} - The fixed string
 * @throws {error} - When no string is provided
 */
export function formatName(str) {
  if (!str) throw new Error(errorFormatName);

  let fixedString = str;

  forbiddenCharacters.forEach(char => {
    fixedString = fixedString.replace(char, '');
  });

  return fixedString;
}
