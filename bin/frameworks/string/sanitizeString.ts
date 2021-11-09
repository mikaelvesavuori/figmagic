import { ErrorSanitizeString } from '../errors/errors';

/**
 * @description Apply basic string sanitization, allowing letters, numbers, underscores, and dashes.
 */
export function sanitizeString(str: string, camelize = true): string {
  if (!str) throw Error(ErrorSanitizeString);

  const regexBasicNonMatch = /[^a-zA-Z0-9]+/g;
  const regexBasicMatch = /[a-zA-Z0-9]+/g;
  const regexDashesUnderscoresNonMatch = /[^a-zA-Z0-9-_]+/g;

  /**
   * Return camel-cased string
   */
  if (camelize) {
    return (
      str
        // Add a space after uppercase words
        .replace(/[A-Z]+/g, (word) => ' ' + word)
        // Replace all characters that are not letter or number with a space
        .replace(regexBasicNonMatch, ' ')
        // Remove leading and trailing spaces
        .trim()
        // Find all words, and capitalize the first letter and lowercase the rest of the word. Except the first word which is fully lowercased.
        .replace(regexBasicMatch, (word, index) =>
          index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()
        )
        // Finally remove all remaining spaces
        .replace(/ /g, '')
    );
  } else {
    /**
     * Return mildly sanitized string keeping basic formatting
     */
    return str.replace(regexDashesUnderscoresNonMatch, ' ').trim().replace(/ /g, '');
  }
}

/**
 * @description Simple string sanitizer that only allows primitize characters and letters, and slash (for subfolders).
 * The string is output in pascal case format.
 */
export function sanitizeStringPascalCase(str: string): string {
  const regexNonMatch = /[^a-zA-Z0-9\/\\]+/g;
  const regexMatch = /[a-zA-Z0-9\/\\]+/g;

  return str
    .replace(/[A-Z]+/g, (word) => ' ' + word)
    .replace(regexNonMatch, ' ')
    .trim()
    .replace(regexMatch, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .replace(/ /g, '');
}
