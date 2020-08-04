import { FigmagicElement } from '../../../domain/FigmagicElement/FigmagicElement';
import { errorParseElement } from '../../../meta/errors';

import { getElementType } from './getElementType';
import { getDescription } from './getDescription';
import { handleNestedElements } from './handleNestedElements';
import { handleNonNestedElements } from './handleNonNestedElements';

/**
 * Do the actual parsing and processing of an "element"-type component from Figma
 *
 * @export
 * @async
 * @function
 * @param {object} element - Object representation of item
 * @param {number} remSize - HTML body REM size
 * @param {boolean} isTest - Check if this is test
 * @returns {Promise<any>} - Return new element as object
 * @throws {errorParseElement} - Throw error if not provided element or config
 */
export async function parseElement(element, remSize, isTest = false): Promise<any> {
  if (!element || !remSize) throw new Error(errorParseElement);

  let newElement: FigmagicElement = {
    id: element.id,
    name: element.name
  };

  let html = ``;
  let extraProps = ``;
  let text = ``;
  let imports = [];

  const elementType = getElementType(element);
  newElement.element = elementType;

  const description = getDescription(element);
  newElement.element = elementType;

  html += `<${elementType}>{{TEXT}}</${elementType}>`;

  let css = ` `;

  // Nested, layered, or "stateful" elements
  if (element.children.every((a) => a.type === 'GROUP')) css = await handleNestedElements(element);
  // TODO: Add relevant return logic here for nested elements
  else {
    // Handle regular non-nested elements below
    const { updatedCss, updatedImports } = await handleNonNestedElements(element);

    // Flatten imports and remove duplicates
    imports = [...new Set(imports)];

    // Apply to new object
    newElement.css = css;
    newElement.html = html;
    newElement.extraProps = extraProps;
    newElement.text = text;
    newElement.imports = imports;
    // makeFigmagicElement(newElement)?

    return newElement;
  }
}
