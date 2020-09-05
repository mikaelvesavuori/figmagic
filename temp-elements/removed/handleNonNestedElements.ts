//import { ProcessedSelfnamedCss } from '../../../contracts/Css';
import { FigmagicElement } from '../../bin/entities/FigmagicElement';

//import { processCssSelfnamedLayer } from './processCssSelfnamedLayer';
//import { parseTypographyStylingFromElement } from './parseTypographyStylingFromElement';

import { ErrorProcessElementsWrongTextElementCount } from '../../bin/frameworks/errors/errors';

/**
 * @description Add description to list of elements
 *
 * @param elements String from Figma description block
 */
export async function handleNonNestedElements(element: FigmagicElement): Promise<FigmagicElement> {
  // Check for text elements
  const TEXT_ELEMENT = element.children.filter((el) => el.type === 'TEXT' && el.name[0] !== '_');
  if (TEXT_ELEMENT.length > 1)
    throw new Error(`${ErrorProcessElementsWrongTextElementCount} ${element.name}!`);

  // Set placeholder text
  if (element.children) {
    element.children.forEach((child) => {
      if (
        (child.type === 'TEXT' && child.name.toLowerCase() === 'placeholder') ||
        (child.type === 'TEXT' && child.name.toLowerCase() === ':placeholder')
      ) {
        element.addExtraProps(`placeholder="${child.characters}"`);
      }
    });
  }

  // Set "type", for example for input element
  if (element.description.match(/type=(.*)/)) {
    const TYPE = element.description.match(/type=(.*)/)[1];
    element.addExtraProps(` type="${TYPE}"`);
  }

  // Set text styling
  if (TEXT_ELEMENT.length === 1) {
    //const typography = await parseTypographyStylingFromElement(TEXT_ELEMENT[0], element.remSize);
    //element.addImports(imports.concat(typography.imports)); // Should not add; should equal/be (=)
    //element.addCss(typography.css);
    element.addText(TEXT_ELEMENT[0].characters); // Should not add; should equal/be (=)
  }

  element.replaceHtml('{{TEXT}}', element.text);

  // Process CSS for any component that has a self-named layer
  // This pattern is how we communicate that it's a layout element, e.g. input and not a H1
  /*
  const { updatedCss, updatedImports } = await processCssSelfnamedLayer(
    element,
    TEXT_ELEMENT,
    css,
    imports,
    remSize
  );
  */

  await processCssSelfnamedLayer(element, TEXT_ELEMENT);

  return element;
}

import { parseCssFromElement } from '../../bin/usecases/interactors/elements/parseCssFromElement';

import { MsgProcessElementsCreatingElement } from '../../bin/frameworks/messages/messages';
import { ErrorProcessElementsWrongElementCount } from '../../bin/frameworks/errors/errors';

/**
 * @description Process CSS for layer with same name as self
 *
 * @param element Element
 * @param textElement Text element
 * @param css CSS string
 * @param imports Imports array
 * @param remSize Rem size
 */
async function processCssSelfnamedLayer(element: FigmagicElement, textElement: any): Promise<void> {
  const MAIN_ELEMENT = element.children.filter((e) => e.name === element.name);
  const TEXT_ELEMENT = textElement;

  if (MAIN_ELEMENT[0]) {
    if (MAIN_ELEMENT.length !== 1)
      throw new Error(`${ErrorProcessElementsWrongElementCount} ${element.name}!`);

    const FIXED_NAME = MAIN_ELEMENT[0].name.replace(/\s/gi, '');
    console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT[0].name, FIXED_NAME));

    const elementStyling = await parseCssFromElement(
      MAIN_ELEMENT[0],
      TEXT_ELEMENT[0],
      element.remSize
    );

    element.addImports(elementStyling.imports);
    element.addCss(elementStyling.css);
    //updatedImports = updatedImports.concat(elementStyling.imports);
    //updatedCss += elementStyling.css;
  }
}
