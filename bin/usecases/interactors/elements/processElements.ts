import { FigmagicElement } from '../../../entities/FigmagicElement';
import { makeFigmagicElement } from '../../../entities/FigmagicElement';

import { Config } from '../../../contracts/Config';
import { FigmaElement } from '../../../contracts/FigmaElement';

import { ErrorProcessElements } from '../../../frameworks/errors/errors';

/**
 * @description Process all elements from Figma page called "Elements"
 * 1. Filter out components
 * 2. Add description from Figma
 * 3. Parse elements (typography and styling)
 * 4. Return list of cleaned items
 *
 * @param elementsPage Figma page for Elements
 * @param config User configuration
 * @param components Figma components
 */
export function processElements(
  elementsPage: any[],
  config: Config,
  components: Record<string, any>
): FigmagicElement[] {
  try {
    if (!elementsPage || !components || !config) throw new Error(ErrorProcessElements);

    const filteredElements = elementsPage.filter((element) => element.type === 'COMPONENT');
    const parsedElements = filteredElements.map((element: FigmaElement) => {
      return makeFigmagicElement(element, config, components[element.id].description);
    });
    return parsedElements;
  } catch (error) {
    throw new Error(ErrorProcessElements);
  }
}
