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

  newElement.id = element.id;
  newElement.name = element.name;

  //absoluteBoundingBox: { x: 400, y: 0, width: 320, height: 48 },
  //constraints: { vertical: 'TOP', horizontal: 'LEFT' },

  // Set element type
  let elementType = 'div';
  if (element.description.match(/\{\{(.*?)\}\}/))
    elementType = element.description.match(/\{\{(.*?)\}\}/)[1];
  newElement.element = elementType;

  // Set description
  let description = element.description ? element.description : ' ';
  if (description.match(/\{\{(.*?)\}\}/)) {
    description = description.replace(/\{\{(.*?)\}\}/gi, '');
  }
  description.replace(/^\s*\n/gm, '');
  newElement.description = description;

  html += `<${elementType}>{{TEXT}}</${elementType}>`;

  // Since the Figma component has to put all the styling etc. on an item (ex. a rectangle) contained directly within it,
  // we need to also get the properties from THAT item in order to create/parse CSS.
  // Note: The item is expected to have the same name as the component overall, such as "Input", "Button", or "H1"
  const MAIN_ELEMENT = element.children.filter(e => e.name === element.name);
  if (MAIN_ELEMENT.length !== 1)
    throw new Error(`${errorGetElementsWrongElementCount} ${element.name}!`);
  let css = getCssFromElement(MAIN_ELEMENT[0]);

  const TEXT_ELEMENT = element.children.filter(e => e.name === 'Text');
  if (TEXT_ELEMENT.length > 1)
    throw new Error(`${errorGetElementsWrongTextElementCount} ${element.name}!`);

  // Set placeholder text
  if (element.children) {
    element.children.filter(c => {
      if (c.type === 'TEXT' && c.name === 'Placeholder') {
        //html = html.replace('input>', `input placeholder="${c.characters}">`);
        extraProps += `placeholder="${c.characters}"`;
      }
    });
  }

  let text = ``;

  if (TEXT_ELEMENT.length === 1) {
    let typographyStyling = getTypographyStylingFromElement(TEXT_ELEMENT[0]);
    text = TEXT_ELEMENT[0].characters;
    css += typographyStyling;
  }

  html = html.replace('{{TEXT}}', text);

  newElement.css = css;
  newElement.html = html;
  newElement.extraProps = extraProps;

  return newElement;
}
