import { findShortenedNameMatch } from './findShortenedNameMatch.mjs';

import { errorCreatePage } from './../meta/errors.mjs';

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
  if (!figmaPages || !figmaPages.length > 0) throw new Error(errorCreatePage);

  let hasCreatedDesignTokensPage = false;
  let correctPage = {};
  let isMatchFound = false;

  figmaPages.forEach(page => {
    // Loop only until match is found
    if (!isMatchFound && page.name) {
      if (
        findShortenedNameMatch(page.name, 'designtokens') &&
        hasCreatedDesignTokensPage === false
      ) {
        isMatchFound = true;
        // TODO: This is uncovered in test
        if (page.name.toLowerCase().replace(' ', '') === 'designtokens') {
          hasCreatedDesignTokensPage = true;
          correctPage = page;
        }
      }
    }
  });

  return correctPage;
}
