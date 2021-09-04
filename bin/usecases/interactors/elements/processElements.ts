import { makeFigmagicElement } from '../../../entities/FigmagicElement';

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
  elementsPage: any[],
  config: Config,
  components: Record<string, any>,
  isGraphicElement = false
): FigmagicElement[] {
  try {
    if (!elementsPage || !components || !config) throw Error(ErrorProcessElements);

    const FILTERED_ELEMENTS = elementsPage.filter((element) => element.type === 'COMPONENT');
    const PARSED_ELEMENTS = FILTERED_ELEMENTS.map((element: FigmaElement) =>
      makeFigmagicElement(element, config, components[element.id].description, isGraphicElement)
    );
    return PARSED_ELEMENTS;
  } catch (error: any) {
    throw Error(error);
  }
}
