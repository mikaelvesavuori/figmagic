import { errorCamelize } from '../errors/errors';

/**
 * @description Camel-case transform a string
 *
 * @param str The string which is to be camelcased
 */
export function camelize(str: string): string {
  if (!str) throw new Error(errorCamelize);

  return (
    str
      // Add a space after uppercase words
      .replace(/[A-Z]+/g, (word, index) => ' ' + word)
      // Replace all characters that are not letter or number with a space
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      // Remove leading and trailing spaces
      .trim()
      // Find all words, and capitalize the first letter
      // and lowercase the rest of the word.
      // Except the first word which is fully lowercased.
      .replace(/[a-zA-Z0-9]+/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()
      )
      // Finally remove all remaining spaces
      .replace(/ /g, '')
  );
}
