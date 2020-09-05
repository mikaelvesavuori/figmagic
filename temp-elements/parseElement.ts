import { FigmagicElement } from '../../../contracts/FigmagicElement';
import { ElementMetadataInterface } from '../../../contracts/ElementMetadataInterface';
//import { Element } from '../../contracts/Element';

import { getElementType } from './getElementType';
import { getDescription } from './getDescription';
import { handleNestedElements } from './handleNestedElements';
//import { handleNonNestedElements } from './handleNonNestedElements';

import { ErrorParseElement } from '../../../frameworks/errors/errors';

/**
 * @description Do the actual parsing and processing of an "element"-type component from Figma
 *
 * @param element Object representation of item
 * @param remSize The body rem size
 * @param data Element auxiliary data
 */
// TODO: Add real types
/*
Return {
  html = comp.html;
  css = comp.css;
  description = comp.description || ' ';
  name = toPascalCase(comp.name);
  folder = `${config.outputFolderElements}/${name}`;
  metadata = {}
}
*/
export async function parseElement(element: any, remSize: number): Promise<any> {
  if (!element || !remSize) throw new Error(ErrorParseElement);

  //const newElement: FigmagicElement = makeFigmagicElement(element);
  const elementType: string = getElementType(element);
  const html = `<${elementType}>{{TEXT}}</${elementType}>`;
  // The below fields are the things needed to create a set of valid HTML and CSS
  const data: ElementMetadataInterface = {
    css: ``,
    html: html,
    extraProps: ``,
    text: ``,
    imports: []
  };

  // Nested, layered, or "stateful" elements
  if (element.children.every((a) => a.type === 'GROUP')) {
    const css = await handleNestedElements(element, remSize, data);
  }
  // TODO: Add relevant return logic here for nested elements
  /*
  else {
    // Handle regular non-nested elements below
    const { updatedCss, updatedImports } = await handleNonNestedElements(element, remSize, data);

    // Flatten imports and remove duplicates
    imports = [...new Set(imports)];

    // Apply to new object
    newElement.css = css;
    newElement.html = html;
    newElement.extraProps = extraProps;
    newElement.text = text;
    newElement.imports = imports;

    return newElement;
  }
  */
}

const makeFigmagicElement = (element: any) => {
  const elementType: string = getElementType(element);
  const html = `<${elementType}>{{TEXT}}</${elementType}>`;

  return {
    id: element.id,
    name: element.name,
    description: getDescription(element),
    element: elementType,
    imports: [],
    css: ``,
    html: html,
    text: ``,
    extraProps: ``
  } as FigmagicElement;
};
