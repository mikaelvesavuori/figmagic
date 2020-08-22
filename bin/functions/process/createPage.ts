import { errorCreatePage } from '../../meta/errors';

import { Page } from '../../domain/Page/Page';

/**
 * Creates cleaned pages from the raw Figma data, for further processing
 *
 * @param figmaPages Array of Figma pages
 * @param matchingPageName String that identifies the correct page name
 */
export function createPage(figmaPages: Page[], matchingPageName: string): Page[] {
  if (!figmaPages || !(figmaPages.length > 0)) throw new Error(errorCreatePage);
  return figmaPages.filter((page) => page.name === matchingPageName);
}
