import { FRAME as Frame } from '../../contracts/Figma';

import { ErrorCreatePage } from '../../../frameworks/errors/errors';

/**
 * @description Creates cleaned pages from the raw Figma data, for further processing
 *
 * @param figmaPages Array of Figma pages
 * @param matchingPageName String that identifies the correct page name
 */
export function createPage(figmaPages: Frame[], matchingPageName: string): Frame[] {
  if (!figmaPages || !(figmaPages.length > 0)) throw new Error(ErrorCreatePage);
  return figmaPages.filter((page) => page.name === matchingPageName);
}
