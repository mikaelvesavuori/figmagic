import { getCssFromElement } from './getCssFromElement.mjs';
import { getTypographyStylingFromElement } from './getTypographyStylingFromElement.mjs';

import { errorGetElementsWrongElementCount } from '../meta/errors.mjs';
import { errorGetElementsWrongTextElementCount } from '../meta/errors.mjs';

export function getElements(elementsPage, config, components) {
  const _ELEMENTS = elementsPage.filter(element => element.type === 'COMPONENT');
  const ELEMENTS = addDescriptionToElements(_ELEMENTS, components);
  const PARSED_ELEMENTS = ELEMENTS.map(el => parseElement(el));
  return PARSED_ELEMENTS;
}

const addDescriptionToElements = (elements, components) => {
  return elements.map(element => {
    const _ELEMENT = element;
    _ELEMENT.description = components[element.id].description;
    return _ELEMENT;
  });
};

function parseElement(element) {
  let html = ``;
  let newElement = {};
  let extraProps = ``; // Any extra properties, like "placeholder"
  let text = ``;

  // Set up the absolute essentials
  newElement.id = element.id;
  newElement.name = element.name;

  // Set element type
  let elementType = 'div';
  if (element.description.match(/element=(.*)/)) {
    elementType = element.description.match(/element=(.*)/)[1];
  }
  newElement.element = elementType;

  // Set description
  let description = element.description;
  if (element.description.match(/description=(.*)/)) {
    const INDEX = element.description.indexOf('description=');
    const MARKER_LENGTH = 12;
    description = description.slice(INDEX + MARKER_LENGTH, description.length);
    description.replace(/^\s*\n/gm, '');
    newElement.description = description;
  }

  html += `<${elementType}>{{TEXT}}</${elementType}>`;

  // Since the Figma component has to put all the styling etc. on an item (ex. a rectangle) contained directly within it,
  // we need to also get the properties from THAT item in order to create/parse CSS.
  // Note: The item is expected to have the same name as the component overall, such as "Input", "Button", or "H1"
  let css = ` `;

  // Check for text elements
  const TEXT_ELEMENT = element.children.filter(e => e.name === 'Text');
  if (TEXT_ELEMENT.length > 1)
    throw new Error(`${errorGetElementsWrongTextElementCount} ${element.name}!`);

  // Set placeholder text
  if (element.children) {
    element.children.filter(c => {
      if (c.type === 'TEXT' && c.name === 'Placeholder') {
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
    let typographyStyling = getTypographyStylingFromElement(TEXT_ELEMENT[0]);
    text = TEXT_ELEMENT[0].characters;
    css += typographyStyling;
  }

  html = html.replace('{{TEXT}}', text);

  // Process CSS for any component that has a self-named layer
  // This pattern is how we communicate that it's a layout element, eg. input and not a H1
  const MAIN_ELEMENT = element.children.filter(e => e.name === element.name);
  if (MAIN_ELEMENT[0]) {
    if (MAIN_ELEMENT.length !== 1) {
      throw new Error(`${errorGetElementsWrongElementCount} ${element.name}!`);
    }

    css += getCssFromElement(MAIN_ELEMENT[0], TEXT_ELEMENT[0]);
  }

  // Apply to new object
  newElement.css = css;
  newElement.html = html;
  newElement.extraProps = extraProps;
  newElement.text = text;

  return newElement;
}
