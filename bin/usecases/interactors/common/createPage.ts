import { FRAME as Frame } from '../../../contracts/Figma';

import { ErrorCreatePage } from '../../../frameworks/errors/errors';

/**
 * @description Creates cleaned pages from the raw Figma data, for further processing
 *
 * @param figmaPages Array of Figma pages ("frames")
 * @param matchingPageName String that identifies the correct page name
 */
export function createPage(figmaPages: Frame[], matchingPageName: string): Frame[] {
  try {
    if (!figmaPages || !(figmaPages.length > 0)) throw new Error(ErrorCreatePage);

    const PAGE = figmaPages.filter(
      (page) =>
        page.name.toLowerCase().replace(/ /g, '') ===
        matchingPageName.toLowerCase().replace(/ /g, '')
    );

    if (PAGE.length > 0 && PAGE[0].children) return PAGE[0].children;
    return [];
  } catch (error) {
    throw new Error(ErrorCreatePage);
  }
}
