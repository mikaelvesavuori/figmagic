import { FRAME as Frame } from '../../../contracts/Figma';

import { ErrorGetIds } from '../../../frameworks/errors/errors';

/**
 * @description Get IDs from graphics page
 */
export const getIds = (graphicsPage: Frame[]): Record<string, unknown>[] => {
  if (!graphicsPage || graphicsPage.length === 0) throw Error(ErrorGetIds);

  /**
   * First grab all components that are "flat" in the Figma page.
   * This is the classic way of doing graphics in Figmagic.
   */

  const ids: any[] = [];
  const componentIds = getComponents(graphicsPage);
  ids.push(...ids.concat(componentIds));

  /**
   * Next, check all frame inside the page for nested graphics.
   */

  const frames = graphicsPage.filter((item: Frame) => item.type === 'FRAME');
  for (const frame of frames) {
    const frameLocalComponentIds = getComponents(frame.children || [], frame);
    ids.push(...ids.concat(frameLocalComponentIds));
  }

  const deduplicatedIds: any[] = [];
  ids.filter((item) =>
    !deduplicatedIds.find((element) => element.id === item.id) ? deduplicatedIds.push(item) : null
  );
  return deduplicatedIds;
};

/**
 * @description TODO
 */
const getComponents = (children: Frame[], parent?: Frame) => {
  const parentName = parent?.name ? `${parent.name}/` : '';

  if (!children || children.length === 0) return [];
  return children
    .filter((item: any) => item.type === 'COMPONENT')
    .map((item: any) => ({
      id: item.id,
      name: `${parentName}${item.name}`
    }));
};
