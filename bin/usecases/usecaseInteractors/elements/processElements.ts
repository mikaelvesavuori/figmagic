import { Config } from '../../../contracts/Config';
//import { Element } from '../contracts/Element';

import { parseElement } from './parseElement';
import { addDescriptionToElements } from './addDescriptionToElements';

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
export async function processElements(
  elementsPage: any[],
  config: Config,
  components: Record<string, unknown>
): Promise<any[]> {
  if (!elementsPage || !components || !config) throw new Error(ErrorProcessElements);

  const filteredElements = elementsPage.filter((element) => element.type === 'COMPONENT');
  const elements = addDescriptionToElements(filteredElements, components);
  // TODO: Fix "any"; expect element (object) with dddddd
  const parsedElements = await Promise.all(
    elements.map(
      async (element: any) => await parseElement(element, config.remSize, config.testMode)
    )
  );

  return parsedElements;
}
