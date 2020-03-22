import { getCssFromElement } from './getCssFromElement.mjs';
import { getTypographyStylingFromElement } from './getTypographyStylingFromElement.mjs';

export function getElements(elementsPage, config, components) {
  const _ELEMENTS = elementsPage.filter(element => element.type === 'COMPONENT');
  const ELEMENTS = addDescriptionToElements(_ELEMENTS, components);

  const PARSED_ELEMENTS = ELEMENTS.map(el => parseElement(el));

  console.log('PARSED_ELEMENTS');
  console.log(PARSED_ELEMENTS);

  return PARSED_ELEMENTS;
}

const addDescriptionToElements = (elements, components) => {
  return elements.map(element => {
    const _ELEMENT = element;
    _ELEMENT.description = components[element.id].description;
    return _ELEMENT;
  });
};

// TODO: Create CSS from: styles: { fill: '1:106', effect: '2657:135' }?

function parseElement(element) {
  let html = ``;
  let newElement = {};

  newElement.id = element.id;
  newElement.name = element.name;

  //absoluteBoundingBox: { x: 400, y: 0, width: 320, height: 48 },
  //constraints: { vertical: 'TOP', horizontal: 'LEFT' },

  let elementType = element.description;
  elementType = elementType.split('}}')[0].replace('{{', '');
  newElement.element = elementType;

  html += `<${elementType}>{{TEXT}}</${elementType}>`;
  newElement.html = html;

  // Since the Figma component has to put all the styling etc. on an item (ex. a rectangle) contained directly within it,
  // we need to also get the properties from THAT item in order to create/parse CSS.
  // Note: The item is expected to have the same name as the component overall, such as "Input", "Button", or "H1"
  const MAIN_ELEMENT = element.children.filter(e => e.name === element.name);
  if (MAIN_ELEMENT.length !== 1)
    throw new Error(`Did not find exactly 1 (one) match for element ${element.name}!`);
  let css = getCssFromElement(MAIN_ELEMENT[0]);

  const TEXT_ELEMENT = element.children.filter(e => e.name === 'Text');
  if (TEXT_ELEMENT.length > 1)
    throw new Error(
      `Found more than one match for "Text" node. Required: 0 or 1 text nodes as child of element ${element.name}!`
    );

  let text = ``;

  if (TEXT_ELEMENT.length === 1) {
    let typographyStyling = getTypographyStylingFromElement(TEXT_ELEMENT[0]);
    text = TEXT_ELEMENT[0].characters;
    css += typographyStyling;
  }

  html = html.replace('{{TEXT}}', text);

  newElement.css = css;

  return newElement;
}
