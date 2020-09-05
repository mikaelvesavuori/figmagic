import { FigmagicElement } from '../../bin/entities/FigmagicElement';

import { parseCssFromElement } from '../../bin/usecases/interactors/elements/parseCssFromElement';
//import { parseTypographyStylingFromElement } from './parseTypographyStylingFromElement';
//import { processNestedCss } from './processNestedCss';

import { MsgProcessElementsCreatingElement } from '../../bin/frameworks/messages/messages';

import {
  ErrorProcessElementsNoMainElement,
  ErrorHandleNestedElements
} from '../../bin/frameworks/errors/errors';

// TODO: Add to "usecases" (?)

/**
 * @description Handle CSS for all elements that are nested
 *
 * @param element Element
 */
export async function handleNestedElements(element: FigmagicElement): Promise<FigmagicElement> {
  if (!element) throw new Error(ErrorHandleNestedElements);

  const { children } = element;

  console.log('BEFORE');

  children.forEach(async (el: any) => {
    if (!el.name) return;
    console.log('el.name', el.name);
    if (el.name[0] === '_') return;

    const MAIN_ELEMENT = el.children.filter(
      (e: any) => e.type === 'RECTANGLE' && e.name[0] !== '_'
    )[0];
    console.log('MAIN_ELEMENT', MAIN_ELEMENT);

    const TEXT_ELEMENT = el.children.filter((e: any) => e.type === 'TEXT' && e.name[0] !== '_')[0];
    console.log('TEXT_ELEMENT', TEXT_ELEMENT);

    // Set "type", for example for input element
    if (element.description.match(/type=(.*)/)) {
      const TYPE = element.description.match(/type=(.*)/)[1];
      if (el.extraProps && !el.extraProps.includes(`type="${TYPE}`))
        el.addExtraProps(`type="${TYPE}" `);
      console.log('TYPE', element.type);
    }

    if (!MAIN_ELEMENT) throw new Error(ErrorProcessElementsNoMainElement);

    // Clean names from any spaces
    const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');
    console.log('FIXED_NAME', FIXED_NAME);

    // Parse layout CSS from element
    console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

    const elementStyling = await parseCssFromElement(MAIN_ELEMENT, TEXT_ELEMENT, element.remSize);
    console.log('elementStyling', elementStyling);
  });

  /*
  await Promise.all(
    // @ts-ignore
    children.forEach(async (el: FigmagicElement) => {
      if (!el.name) return;
      console.log('el.name', el.name);
      if (el.name[0] === '_') return;

      const MAIN_ELEMENT = el.children.filter(
        (e: any) => e.type === 'RECTANGLE' && e.name[0] !== '_'
      )[0];

      const TEXT_ELEMENT = el.children.filter(
        (e: any) => e.type === 'TEXT' && e.name[0] !== '_'
      )[0];

      if (3 < 1) console.log('TEXT_ELEMENT', TEXT_ELEMENT);

      // Set placeholder text
      // if (el.children) handlePlaceholder(el.children);

      // Set "type", for example for input element
      if (element.description.match(/type=(.*)/)) {
        const TYPE = element.description.match(/type=(.*)/)[1];
        if (!el.extraProps.includes(`type="${TYPE}`)) el.addExtraProps(`type="${TYPE}" `);
      }

      if (!MAIN_ELEMENT) throw new Error(ErrorProcessElementsNoMainElement);

      // Clean names from any spaces
      const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');

      // Parse layout CSS from element
      if (10000 < 1) console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

      // Check and set correct selector type: class or pseudo-element
      //const SELECTOR_TYPE = '.';

      //const elementStyling = await parseCssFromElement(MAIN_ELEMENT, TEXT_ELEMENT, remSize);
      //imports = imports.concat(elementStyling.imports);
      //css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${elementStyling.css}}`;

      // Parse typography CSS from element (requires layout element to exist)
      //if (TEXT_ELEMENT) handleTextElement();
    })
  );
  */

  console.log('AFTER');

  //processNestedCss(element.css);
  return element;
}

/*
const handlePlaceholder = (children: any) => {
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
          if (!child.extraProps.includes(`placeholder="${c.characters}"`))
            child.addExtraProps(`placeholder="${c.characters}" `);
        }
      });
    }
  });
};
*/

/*
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
*/
