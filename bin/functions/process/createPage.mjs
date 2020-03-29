import { errorCreatePage } from '../../meta/errors.mjs';

/**
 * Creates cleaned pages from the raw Figma data, for further processing
 *
 * @exports
 * @function
 * @param {object} figmaPages - Object with Figma pages
 * @param {string} matchingPageName - String that identifies the correct page name
 * @returns {object} - Return correct page as object
 * @throws {error} - When no page(s) are provided
 */
export function createPage(figmaPages, matchingPageName) {
  if (!figmaPages || !(figmaPages.length > 0)) throw new Error(errorCreatePage);

  let correctPage = {};
  let isMatchFound = false;

  figmaPages.forEach(page => {
    // Loop only until match is found
    if (!isMatchFound && page.name === matchingPageName) {
      correctPage = page;
    }
  });

  return correctPage;
}
