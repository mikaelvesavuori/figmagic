import { Config } from '../../entities/Config/Config';
import { Element } from '../contracts/Element';

import { parseElement } from './elements/parseElement';
import { addDescriptionToElements } from './elements/addDescriptionToElements';

import { ErrorProcessElements } from '../../frameworks/errors/errors';

/**
 * @description Process all elements from Figma page called "Elements"
 * 1. Filter out components
 * 2. Add description from Figma
 * 3. Parse elements (typography and styling)
 * 4. Return list of cleaned items
 *
 * @param elementsPage Figma page for Elements
 * @param components Figma components
 * @param config User configuration
 */
export async function processElements(
  elementsPage: any[],
  components: object,
  config: Config
): Promise<any[]> {
  if (!elementsPage || !components || !config) throw new Error(ErrorProcessElements);

  const filteredElements = elementsPage.filter((element) => element.type === 'COMPONENT');
  const elements = addDescriptionToElements(filteredElements, components);
  // TODO: Fix "any"
  const parsedElements = await Promise.all(
    elements.map(
      async (element: Element) => await parseElement(element, config.remSize, config.testMode)
    )
  );

  return parsedElements;
}
