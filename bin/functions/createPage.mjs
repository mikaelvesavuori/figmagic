import {
  errorCreatePage,
  errorFindShortenedNameMatchString,
  errorFindShortenedNameMatchOriginal
} from './../meta/errors.mjs';

/**
 * Creates cleaned pages from the raw Figma data, for further processing
 *
 * Use these if you want to create tokens from the local file, else we assume
 * that you want tokens from returned data from a Figma API fetch
 *
 * @exports
 * @function
 * @param {object} figmaPages - Object with Figma pages
 * @returns {object} - Return correct page as object
 * @throws {error} - When no page(s) are provided
 */
export function createPage(figmaPages) {
  let hasCreatedDesignTokensPage = false;

  if (!figmaPages || !figmaPages.length > 0) {
    throw new Error(errorCreatePage);
  } else {
    let correctPage = undefined;
    let isMatchFound = false;

    figmaPages.forEach(page => {
      if (!isMatchFound) {
        if (
          findShortenedNameMatch(page.name, 'designtokens') &&
          hasCreatedDesignTokensPage === false
        ) {
          isMatchFound = true;
          foundMatch(page);
        }
      }

      /**
       * If a matching page is found, set local values to this page
       * @param {object} page - The current Figma page
       */
      function foundMatch(page) {
        const FIXED_PAGE_NAME = page.name.toLowerCase().replace(' ', '');

        if (FIXED_PAGE_NAME === 'designtokens') {
          hasCreatedDesignTokensPage = true;
          correctPage = page;
        }
      }
    });

    return correctPage;
  }
}

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
 */
export function findShortenedNameMatch(originalString, matchString) {
  if (!originalString) throw new Error(errorFindShortenedNameMatchOriginal);

  if (!matchString) throw new Error(errorFindShortenedNameMatchString);

  return originalString.toLowerCase().replace(' ', '') === matchString;
}
