import { FRAME as Frame } from '../../../contracts/Figma';
import { ErrorGetIds } from '../../../frameworks/errors/errors';

/**
 * @description Get IDs from graphics page
 *
 * @param graphicsPage Figma 'Graphics' page
 */
export const getIds = (graphicsPage: Frame[]): Record<string, unknown>[] => {
  if (!graphicsPage) throw new Error(ErrorGetIds);
  if (!(graphicsPage.length > 0)) throw new Error(ErrorGetIds);

  return graphicsPage
    .filter((item: any) => item.type === 'COMPONENT')
    .map((item: any) => {
      return { id: item.id, name: item.name };
    });
};
