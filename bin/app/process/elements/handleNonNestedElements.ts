import { ElementAuxData } from '../../../app/contracts/ElementAuxData/ElementAuxData';

import { ProcessedSelfnamedCss } from '../../../entities/Css/Css';

import { processCssSelfnamedLayer } from '../../process/elements/processCssSelfnamedLayer';
import { parseTypographyStylingFromElement } from '../parseTypographyStylingFromElement';

import { ErrorProcessElementsWrongTextElementCount } from '../../../app/errors/errors';

/**
 * @description Add description to list of elements
 *
 * @param elements String from Figma description block
 * @param remSize The body rem size
 * @param data Element auxiliary data
 */
export async function handleNonNestedElements(
  element: any,
  remSize: number,
  data: ElementAuxData
): Promise<ProcessedSelfnamedCss> {
  // Check for text elements
  const TEXT_ELEMENT = element.children.filter((e) => e.type === 'TEXT' && e.name[0] !== '_');
  if (TEXT_ELEMENT.length > 1)
    throw new Error(`${ErrorProcessElementsWrongTextElementCount} ${element.name}!`);

  let { css, html, extraProps, text, imports, isTest } = data;

  // Set placeholder text
  if (element.children) {
    element.children.forEach((c) => {
      if (
        (c.type === 'TEXT' && c.name.toLowerCase() === 'placeholder') ||
        (c.type === 'TEXT' && c.name.toLowerCase() === ':placeholder')
      ) {
        extraProps += `placeholder="${c.characters}"`;
      }
    });
  }

  // Set "type", for example for input element
  if (element.description.match(/type=(.*)/)) {
    const TYPE = element.description.match(/type=(.*)/)[1];
    extraProps += ` type="${TYPE}"`;
  }

  // Set text styling
  if (TEXT_ELEMENT.length === 1) {
    let typography = await parseTypographyStylingFromElement(TEXT_ELEMENT[0], remSize, isTest);
    imports = imports.concat(typography.imports);
    css += typography.css;
    text = TEXT_ELEMENT[0].characters;
  }

  html = html.replace('{{TEXT}}', text);

  // Process CSS for any component that has a self-named layer
  // This pattern is how we communicate that it's a layout element, e.g. input and not a H1
  const { updatedCss, updatedImports } = await processCssSelfnamedLayer(
    element,
    TEXT_ELEMENT,
    css,
    imports,
    remSize,
    isTest
  );

  return { updatedCss, updatedImports };
}
