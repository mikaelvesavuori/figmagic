import { FRAME as Frame } from '../../contracts/Figma';
import { ErrorGetIds } from '../../../frameworks/errors/errors';

/**
 * @description Get IDs from graphics page
 *
 * @param graphicsPage Figma 'Graphics' page
 */
export const getIds = (graphicsPage: Frame[]): any[] => {
  if (!graphicsPage) throw new Error(ErrorGetIds);
  if (!(graphicsPage.length > 0)) throw new Error(ErrorGetIds);

  let items: any[] = [];

  // Filter out anything that is not a component
  graphicsPage
    .filter((item: any) => item.type === 'COMPONENT')
    .forEach((item: any) => {
      items.push({ id: item.id, name: item.name });
    });

  return items;
};
