import { ElementAuxData } from '../../../contracts/ElementAuxData';

import { parseCssFromElement } from './parseCssFromElement';
import { parseTypographyStylingFromElement } from './parseTypographyStylingFromElement';
import { processNestedCss } from './processNestedCss';

import { MsgProcessElementsCreatingElement } from '../../../frameworks/messages/messages';

import {
  ErrorProcessElementsNoMainElement,
  ErrorHandleNestedElements
} from '../../../frameworks/errors/errors';

// TODO: Add to "usecases" (?)

/**
 * @description Handle CSS for all elements that are nested
 *
 * @param element Element
 */
export async function handleNestedElements(
  element: Element,
  remSize: number,
  data: ElementAuxData
): Promise<string> {
  if (!element) throw new Error(ErrorHandleNestedElements);

  const { children } = element;

  let { css, html, extraProps, text, imports } = data;

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
      if (children) handlePlaceholder(children);

      // Set "type", for example for input element
      if (element.description.match(/type=(.*)/)) {
        const TYPE = element.description.match(/type=(.*)/)[1];
        //if (!extraProps.includes(`type="${TYPE}`)) extraProps += `type="${TYPE}" `;
      }

      // Check and set correct selector type: class or pseudo-element
      const SELECTOR_TYPE = '.';

      if (!MAIN_ELEMENT) throw new Error(ErrorProcessElementsNoMainElement);

      // Clean names from any spaces
      const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');

      // Parse layout CSS from element
      console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

      const elementStyling = await parseCssFromElement(MAIN_ELEMENT, TEXT_ELEMENT, remSize);
      imports = imports.concat(elementStyling.imports);
      css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${elementStyling.css}}`;

      // Parse typography CSS from element (requires layout element to exist)
      if (TEXT_ELEMENT) handleTextElement();
    })
  );

  return processNestedCss(css);
}

const handlePlaceholder = (children) => {
  return children.forEach((child: any) => {
    if (
      (child.type === 'GROUP' && child.name.toLowerCase() === 'placeholder') ||
      (child.type === 'GROUP' && child.name.toLowerCase() === ':placeholder')
    ) {
      /*
      child.children.forEach((c) => {
        if (
          (c.type === 'TEXT' && c.name.toLowerCase() === 'placeholder') ||
          (c.type === 'TEXT' && c.name.toLowerCase() === ':placeholder')
        ) {
          if (!extraProps.includes(`placeholder="${c.characters}"`))
            extraProps += `placeholder="${c.characters}" `;
        }
      });
      */
    }
  });
};

const handleTextElement = async (imports, css, text) => {
  const typography = await parseTypographyStylingFromElement(TEXT_ELEMENT, remSize);
  imports = imports.concat(typography.imports);
  css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${typography.css}}`;
  text = TEXT_ELEMENT.characters;

  return {
    textElementImports: imports,
    textElementCss: css,
    textElementText: text
  };
};
