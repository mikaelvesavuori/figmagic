import { parseCssFromElement } from './parseCssFromElement.mjs';
import { parseTypographyStylingFromElement } from './parseTypographyStylingFromElement.mjs';
import { processNestedCss } from './processNestedCss.mjs';

import {
  errorProcessElements,
  errorProcessElementsWrongElementCount,
  errorProcessElementsWrongTextElementCount
} from '../../meta/errors.mjs';

/**
 * Description
 *
 * @exports
 * @function
 * @param {array} elementsPage - Figma page for Elements
 * @param {object} components - Figma components
 * @param {object} config - User configuration
 * @returns {array} - List of parsed components with css and all
 * @throws {error} - When missing required arguments
 */
export async function processElements(elementsPage, components, config) {
  if (!elementsPage || !components || !config) throw new Error(errorProcessElements);

  const _ELEMENTS = elementsPage.filter(element => element.type === 'COMPONENT');
  const ELEMENTS = addDescriptionToElements(_ELEMENTS, components);
  const PARSED_ELEMENTS = await Promise.all(
    ELEMENTS.map(async el => await parseElement(el, config))
  );
  return PARSED_ELEMENTS;
}

const addDescriptionToElements = (elements, components) => {
  return elements.map(element => {
    const _ELEMENT = element;
    _ELEMENT.description = components[element.id].description;
    return _ELEMENT;
  });
};

/**
 * Description (TODO)
 *
 * @param element
 * @param config
 */
async function parseElement(element, config) {
  let html = ``;
  let newElement = {};
  let extraProps = ``; // Any extra properties, like "placeholder"
  let text = ``;
  let imports = [];

  const REM = config.remSize;

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
    const MARKER_LENGTH = 12; // "description=" is 12 characters
    description = description.slice(INDEX + MARKER_LENGTH, description.length);
    description.replace(/^\s*\n/gm, '');
    newElement.description = description;
  }

  html += `<${elementType}>{{TEXT}}</${elementType}>`;

  // Since the Figma component has to put all the styling etc. on an item (ex. a rectangle) contained directly
  // within it, we need to also get the properties from THAT item in order to create/parse CSS.
  // NOTE: The item is expected to have the same name as the component overall, such as "Input", "Button", or "H1"
  let css = ` `;

  // Nested, layered, or "stateful" elements
  // Requires that "element" (i.e. Figma component) has only groups at the base of the component
  // You can hide groups by adding a leading underscore to their name, like this: "_Redlines" (which would then be ignored below)
  if (element.children.every(a => a.type === 'GROUP')) {
    await Promise.all(
      element.children.map(async el => {
        // Ignore any groups with a leading underscore in their name
        if (el.name[0] !== '_') {
          const MAIN_ELEMENT = el.children.filter(e => e.type === 'RECTANGLE')[0];
          const TEXT_ELEMENT = el.children.filter(e => e.type === 'TEXT')[0];
          const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');
          console.log(`${MAIN_ELEMENT.name} > ${FIXED_NAME}`);

          // Parse layout CSS from element
          let elementStyling = await parseCssFromElement(MAIN_ELEMENT, TEXT_ELEMENT, REM);
          imports = imports.concat(elementStyling.imports);
          css += `\n.${FIXED_NAME} {\n${elementStyling.css}}`;

          // Parse typography CSS from element
          let typography = await parseTypographyStylingFromElement(TEXT_ELEMENT, REM);
          imports = imports.concat(typography.imports);
          css += `\n.${FIXED_NAME} {\n${typography.css}}`;
          text = TEXT_ELEMENT.characters;
        }
      })
    );
    css = processNestedCss(css);
  }
  // Handle regular non-nested elements below
  else {
    // Check for text elements
    const TEXT_ELEMENT = element.children.filter(e => e.name === 'Text');
    if (!TEXT_ELEMENT || TEXT_ELEMENT.length > 1)
      throw new Error(`${errorProcessElementsWrongTextElementCount} ${element.name}!`);

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
      let typography = await parseTypographyStylingFromElement(TEXT_ELEMENT[0], REM);
      imports = imports.concat(typography.imports);
      css += typography.css;
      text = TEXT_ELEMENT[0].characters;
    }

    html = html.replace('{{TEXT}}', text);

    // Process CSS for any component that has a self-named layer
    // This pattern is how we communicate that it's a layout element, e.g. input and not a H1
    const MAIN_ELEMENT = element.children.filter(e => e.name === element.name);
    if (MAIN_ELEMENT[0]) {
      if (MAIN_ELEMENT.length !== 1) {
        throw new Error(`${errorProcessElementsWrongElementCount} ${element.name}!`);
      }

      let elementStyling = await parseCssFromElement(MAIN_ELEMENT[0], TEXT_ELEMENT[0], REM);
      imports = imports.concat(elementStyling.imports);
      css += elementStyling.css;
    }
  }

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
