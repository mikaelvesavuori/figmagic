import { FigmagicElement } from '../../../entities/FigmagicElement/FigmagicElement';
import { ErrorParseElement } from '../../../frameworks/errors/errors';

import { ElementAuxData } from '../../contracts/ElementAuxData';

import { getElementType } from './getElementType';
import { getDescription } from './getDescription';
import { handleNestedElements } from './handleNestedElements';
import { handleNonNestedElements } from './handleNonNestedElements';

/**
 * @description Do the actual parsing and processing of an "element"-type component from Figma
 *
 * @param element Object representation of item
 * @param remSize The body rem size
 * @param data Element auxiliary data
 */
// TODO: Add real types
export async function parseElement(
  element: Element,
  remSize: number,
  isTest: boolean = false
): Promise<any> {
  if (!element || !remSize) throw new Error(ErrorParseElement);

  let newElement: FigmagicElement = {
    id: element.id,
    name: element.name
  };

  let html = ``;
  let extraProps = ``;
  let text = ``;
  let imports: any[] = [];

  const elementType = getElementType(element);
  newElement.element = elementType;

  const description = getDescription(element);
  newElement.element = elementType;

  html += `<${elementType}>{{TEXT}}</${elementType}>`;

  let css = ` `;

  // Nested, layered, or "stateful" elements
  if (element.children.every((a) => a.type === 'GROUP'))
    css = await handleNestedElements(element, remSize);
  // TODO: Add relevant return logic here for nested elements
  else {
    // Handle regular non-nested elements below
    const data: ElementAuxData = {
      css,
      html,
      extraProps,
      text,
      imports,
      isTest
    };
    const { updatedCss, updatedImports } = await handleNonNestedElements(element, remSize, data);

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
