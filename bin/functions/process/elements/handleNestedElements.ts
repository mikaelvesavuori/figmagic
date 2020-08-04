import { parseCssFromElement } from '../parseCssFromElement';
import { parseTypographyStylingFromElement } from '../parseTypographyStylingFromElement';
import { processNestedCss } from '../processNestedCss';

import { msgProcessElementsCreatingElement } from '../../../meta/messages';

import { errorProcessElementsNoMainElement, errorHandleNestedElements } from '../../../meta/errors';

// TODO: Add to "usecases" (?)

/**
 * Handle CSS for all elements that are nested
 *
 * @exports
 * @function
 * @param {any} element - Element
 * @returns {Promise<string>} - Returns accumulated CSS
 * @throws {errorAddDescriptionToElements} - Throws error if elements or components missing
 */
export async function handleNestedElements(element: any): Promise<string> {
  if (!element) throw new Error(errorHandleNestedElements);

  const { children } = element;

  await Promise.all(
    children.forEach(async (el: any) => {
      if (el.name[0] === '_') return;
      const MAIN_ELEMENT = el.children.filter(
        (e: any) => e.type === 'RECTANGLE' && e.name[0] !== '_'
      )[0];
      const TEXT_ELEMENT = el.children.filter(
        (e: any) => e.type === 'TEXT' && e.name[0] !== '_'
      )[0];

      // Set placeholder text
      if (children) {
        children.forEach((child: any) => {
          if (
            (child.type === 'GROUP' && child.name.toLowerCase() === 'placeholder') ||
            (child.type === 'GROUP' && child.name.toLowerCase() === ':placeholder')
          ) {
            child.children.forEach((c) => {
              if (
                (c.type === 'TEXT' && c.name.toLowerCase() === 'placeholder') ||
                (c.type === 'TEXT' && c.name.toLowerCase() === ':placeholder')
              ) {
                if (!extraProps.includes(`placeholder="${c.characters}"`))
                  extraProps += `placeholder="${c.characters}" `;
              }
            });
          }
        });
      }

      // Set "type", for example for input element
      if (element.description.match(/type=(.*)/)) {
        const TYPE = element.description.match(/type=(.*)/)[1];
        if (!extraProps.includes(`type="${TYPE}`)) extraProps += `type="${TYPE}" `;
      }

      // Check and set correct selector type: class or pseudo-element
      const SELECTOR_TYPE = '.';

      if (!MAIN_ELEMENT) throw new Error(errorProcessElementsNoMainElement);

      // Clean names from any spaces
      const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');

      // Parse layout CSS from element
      console.log(msgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

      let elementStyling = await parseCssFromElement(MAIN_ELEMENT, TEXT_ELEMENT, remSize, isTest);
      imports = imports.concat(elementStyling.imports);
      css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${elementStyling.css}}`;

      // Parse typography CSS from element (requires layout element to exist)
      if (TEXT_ELEMENT) {
        let typography = await parseTypographyStylingFromElement(TEXT_ELEMENT, remSize, isTest);
        imports = imports.concat(typography.imports);
        css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${typography.css}}`;
        text = TEXT_ELEMENT.characters;
      }
    })
  );

  return processNestedCss(css);
}
