import { makeFigmagicElement } from '../../../entities/FigmagicElement';

import { FigmagicElement } from '../../../contracts/FigmagicElement';
import { Config } from '../../../contracts/Config';
import { FigmaElement } from '../../../contracts/FigmaElement';

import { ErrorProcessElements } from '../../../frameworks/errors/errors';

/**
 * @description Process all elements from Figma page called "Elements"
 * 1. Filter out components
 * 2. Add description from Figma
 * 3. Parse elements (typography and styling)
 * 4. Return list of cleaned items
 */
export function processElements(
  elementsPage: any[],
  config: Config,
  components: Record<string, any>
): FigmagicElement[] {
  try {
    if (!elementsPage || !components || !config) throw new Error(ErrorProcessElements);

    const FILTERED_ELEMENTS = elementsPage.filter((element) => element.type === 'COMPONENT');
    const PARSED_ELEMENTS = FILTERED_ELEMENTS.map((element: FigmaElement) => {
      return makeFigmagicElement(element, config, components[element.id].description);
    });
    return PARSED_ELEMENTS;
  } catch (error) {
    throw new Error(ErrorProcessElements);
  }
}
