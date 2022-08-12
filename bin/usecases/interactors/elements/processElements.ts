import { makeFigmagicElement } from '../../../entities/FigmagicElement';

import { Components, FRAME as Frame } from '../../../contracts/Figma';
import { FigmagicElement } from '../../../contracts/FigmagicElement';
import { Config } from '../../../contracts/Config';
import { FigmaElement } from '../../../contracts/FigmaElement';

import { ErrorProcessElements } from '../../../frameworks/errors/errors';

/**
 * @description Process all elements from a given Figma page
 * 1. Filter out components
 * 2. Parse elements (typography and styling)
 * 3. Return list of cleaned items
 */
export function processElements(
  elementsPage: Frame[],
  config: Config,
  components: Components,
  isGraphicElement = false
): FigmagicElement[] {
  if (!elementsPage || !components || !config) throw Error(ErrorProcessElements);

  const filteredElements = elementsPage.filter(
    (element) => element.type === 'COMPONENT' && element.name[0] !== '_'
  );

  const parsedElements = filteredElements.map((element: FigmaElement) =>
    makeFigmagicElement(element, config, components[element.id].description, isGraphicElement)
  );

  return parsedElements;
}
