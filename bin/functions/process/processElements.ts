import { Config } from '../../app/contracts/config/Config';
import { errorProcessElements } from '../../meta/errors';

import { parseElement } from './elements/parseElement';
import { addDescriptionToElements } from './elements/addDescriptionToElements';

// TODO: Move this to "app/controllers" (?)

/**
 * Process all elements from Figma page called "Elements"
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
  if (!elementsPage || !components || !config) throw new Error(errorProcessElements);

  const _elements = elementsPage.filter((element) => element.type === 'COMPONENT');
  const elements = addDescriptionToElements(_elements, components);
  const parsedElements = await Promise.all(
    elements.map(async (el) => await parseElement(el, config.remSize, config.testMode))
  );

  return parsedElements;
}
