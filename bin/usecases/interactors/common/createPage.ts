import { FRAME as Frame } from '../../../contracts/Figma';

import { ErrorCreatePage } from '../../../frameworks/errors/errors';

/**
 * @description Creates cleaned pages from the raw Figma data, for further processing
 */
export function createPage(figmaPages: Frame[], matchingPageName: string): Frame[] {
  if (!figmaPages || figmaPages.length === 0) throw Error(ErrorCreatePage);

  const page = figmaPages.filter(
    (page) =>
      page.name.toLowerCase().replace(/ /g, '') === matchingPageName.toLowerCase().replace(/ /g, '')
  );

  if (page.length > 0 && page[0].children) return page[0].children;
  return [];
}
