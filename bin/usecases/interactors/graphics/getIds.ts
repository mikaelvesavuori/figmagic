import { FRAME as Frame } from '../../../contracts/Figma';

import { ErrorGetIds, ErrorGetIdsComponents } from '../../../frameworks/errors/errors';

/**
 * @description Get IDs from graphics page
 */
export const getIds = (graphicsPage: Frame[]): Record<string, unknown>[] => {
  if (!graphicsPage) throw Error(ErrorGetIds);
  if (!(graphicsPage.length > 0)) throw Error(ErrorGetIds);

  let ids: any = [];

  const componentIds = getComponents(graphicsPage);
  ids = ids.concat(componentIds);

  const frames = graphicsPage.filter((item: any) => item.type === 'FRAME');
  for (const frame of frames) {
    if (frame.children === undefined) {
      continue;
    }

    console.log(frame);

    const localIds = getComponents(frame.children, frame);

    ids = ids.concat(localIds);
  }

  if (!(ids.length > 0)) throw Error(ErrorGetIdsComponents);

  return ids;
};

const getComponents = (children: Frame[], parent?: Frame) => {
  const parentName = parent?.name ? `${parent.name}/` : '';

  return children
    ?.filter((item: any) => item.type === 'COMPONENT')
    .map((item: any) => {
      return {
        id: item.id,
        name: `${parentName}${item.name}`
      };
    });
};
