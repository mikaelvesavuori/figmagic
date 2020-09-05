import { FigmagicElement } from '../../../entities/FigmagicElement';
import { makeFigmagicElement } from '../../../entities/FigmagicElement';

import { Config } from '../../../contracts/Config';
import { FigmaElement } from '../../../contracts/FigmaElement';

import { ErrorProcessElements } from '../../../frameworks/errors/errors';
//import { FigmagicElement } from '../../../contracts/FigmagicElement';

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
): Promise<FigmagicElement[]> {
  if (!elementsPage || !components || !config) throw new Error(ErrorProcessElements);

  return new Promise(async (resolve, reject) => {
    try {
      const filteredElements = elementsPage.filter((element) => element.type === 'COMPONENT');
      const parsedElements = await Promise.all(
        filteredElements.map(async (element: FigmaElement) => {
          // TODO: Verify that "async" usage within class constructor/setup does not mess this up...
          const el = makeFigmagicElement(
            element,
            config,
            // @ts-ignore
            components[element.id].description
          );

          await el.init();
          return el;
        })
      );
      resolve(parsedElements);
    } catch (error) {
      reject(error);
    }
  });
}
