import { FRAME as Frame } from '../../../contracts/Figma';
import { Id } from '../../../contracts/Files';

import { ErrorGetIds } from '../../../frameworks/errors/errors';

/**
 * @description Get IDs from graphics page
 */
export const getIds = (graphicsPage: Frame[]): Id[] => {
  if (!graphicsPage || graphicsPage.length === 0) throw Error(ErrorGetIds);

  /**
   * First grab all components that are "flat" in the Figma page.
   * This is the classic way of doing graphics in Figmagic.
   */

  const ids: Id[] = [];
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

  const deduplicatedIds: Id[] = [];
  ids.forEach((item: Id) =>
    !deduplicatedIds.find((element: Id) => element.id === item.id)
      ? deduplicatedIds.push(item)
      : null
  );

  return deduplicatedIds;
};

/**
 * @description Get components and IDs.
 */
const getComponents = (children: Frame[], parent?: Frame): Id[] => {
  const parentName = parent?.name ? `${parent.name}/` : '';

  if (!children || children.length === 0) return [];
  return children
    .filter((item: Frame) => item.type === 'COMPONENT')
    .map((item: Frame) => ({
      id: item.id,
      name: `${parentName}${item.name}`
    }));
};
