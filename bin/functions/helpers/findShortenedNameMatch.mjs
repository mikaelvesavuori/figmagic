import {
  errorFindShortenedNameMatchString,
  errorFindShortenedNameMatchOriginal,
  errorFindShortenedNameMatchWrongType
} from '../../meta/errors.mjs';

/**
 * Find short name match
 *
 * @exports
 * @function
 * @param {string} originalString - The original string
 * @param {string} matchString - String to match with
 * @returns {string} - The final string
 * @throws {error} - When no 'matchString' is provided
 * @throws {error} - When no 'originalString' is provided
 * @throws {error} - When arguments are not of string type
 */
export function findShortenedNameMatch(originalString, matchString) {
  if (!originalString) throw new Error(errorFindShortenedNameMatchOriginal);
  if (!matchString) throw new Error(errorFindShortenedNameMatchString);
  if (typeof originalString !== 'string' && typeof matchString !== 'string')
    throw new Error(errorFindShortenedNameMatchWrongType);

  return originalString.toLowerCase().replace(' ', '') === matchString;
}
