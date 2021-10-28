import { FRAME as Frame } from '../../../contracts/Figma';

import { ErrorGetIds, ErrorGetIdsComponents } from '../../../frameworks/errors/errors';

/**
 * @description Get IDs from graphics page
 */
export const getIds = (graphicsPage: Frame[]): Record<string, unknown>[] => {
  if (!graphicsPage) throw Error(ErrorGetIds);
  if (!(graphicsPage.length > 0)) throw Error(ErrorGetIds);

  const ids = graphicsPage
    .filter((item: any) => item.type === 'COMPONENT')
    .map((item: any) => {
      return { id: item.id, name: item.name };
    });

  if (!(ids.length > 0)) throw Error(ErrorGetIdsComponents);

  return ids;
};
