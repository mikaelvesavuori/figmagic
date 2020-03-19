import { roundColorValue } from './roundColorValue.mjs';

export function getElements(elementsPage, config, components) {
  const _ELEMENTS = elementsPage.filter(element => element.type === 'COMPONENT');
  const ELEMENTS = addDescriptionToElements(_ELEMENTS, components);

  const PARSED_ELEMENTS = ELEMENTS.map(el => {
    return parseElement(el);
  });

  console.log(PARSED_ELEMENTS);

  return PARSED_ELEMENTS;
}

const addDescriptionToElements = (elements, components) => {
  return elements.map(el => {
    const a = el;
    a.description = components[el.id].description;
    return a;
  });
};

// Create CSS from: styles: { fill: '1:106', effect: '2657:135' }?

function parseElement(element) {
  let html = ``;

  let elementType = element.description;
  elementType = elementType.split('}}')[0].replace('{{', '');
  //console.log(elementType);

  html += `<${elementType}></${elementType}>`;
  element.html = html;

  let css = getCssFromElement(element);
  element.css = css;

  return element;
}

function getCssFromElement(element) {
  let css = ``;

  console.log(element);

  css += `width: 100%;\n`;

  const PADDING_X = (() => {
    if (element.children) {
      return Math.round(element.children[0].absoluteBoundingBox.x - element.absoluteBoundingBox.x);
    }
  })();

  if (PADDING_X) css += `padding: 0 ${PADDING_X}px;\n`;

  const HEIGHT = (() => {
    if (element.absoluteBoundingBox) {
      return element.absoluteBoundingBox.height;
    }
  })();

  if (HEIGHT) css += `height: ${HEIGHT}px;\n`;

  const BACKGROUND_COLOR = (() => {
    if (element.fills[0]) {
      if (element.fills[0].type === 'SOLID') {
        const R = roundColorValue(element.fills[0].color.r);
        const G = roundColorValue(element.fills[0].color.g);
        const B = roundColorValue(element.fills[0].color.b);
        const A = roundColorValue(element.fills[0].color.a, 1);
        return `rgba(${R}, ${G}, ${B}, ${A})`;
      }
    }
  })();

  if (BACKGROUND_COLOR) css += `background-color: ${BACKGROUND_COLOR};\n`;

  css += `border: 0;\n`;
  css += `border-style: solid;\n`;

  const BORDER_WIDTH = (() => {
    if (element.strokeWeight) {
      return element.strokeWeight;
    }
  })();

  if (BORDER_WIDTH) css += `border-width: ${BORDER_WIDTH}px;\n`;

  const BORDER_COLOR = (() => {
    if (element.strokes) {
      if (element.strokes[0].type === 'SOLID') {
        const R = roundColorValue(element.strokes[0].color.r);
        const G = roundColorValue(element.strokes[0].color.g);
        const B = roundColorValue(element.strokes[0].color.b);
        const A = roundColorValue(element.strokes[0].color.a, 1);
        return `rgba(${R}, ${G}, ${B}, ${A})`;
      }
    }
  })();

  if (BORDER_COLOR) css += `border-color: ${BORDER_COLOR};\n`;

  const BORDER_RADIUS = (() => {
    if (element.cornerRadius) {
      return element.cornerRadius;
    }
  })();

  if (BORDER_RADIUS) css += `border-radius: ${BORDER_RADIUS}px;\n`;

  const SHADOW = (() => {
    if (element.effects) {
      if (element.effects[0].type === 'DROP_SHADOW') {
        const dropShadow = element.effects[0];

        const X = dropShadow.offset.x;
        const Y = dropShadow.offset.y;
        const RADIUS = dropShadow.radius;
        const R = roundColorValue(dropShadow.color.r);
        const G = roundColorValue(dropShadow.color.g);
        const B = roundColorValue(dropShadow.color.b);
        const A = roundColorValue(dropShadow.color.a, 1);

        return `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
      }
    }
  })();

  if (SHADOW) css += `box-shadow: ${SHADOW};\n`;

  const FONT_SIZE = (() => {
    if (element.children[0].type === 'TEXT') {
      if (element.children[0].style) {
        return element.children[0].style.fontSize;
      }
    }
  })();

  if (FONT_SIZE) css += `font-size: ${FONT_SIZE}px;\n`;

  const FONT_FAMILY = (() => {
    if (element.children[0].type === 'TEXT') {
      if (element.children[0].style) {
        return element.children[0].style.fontFamily;
      }
    }
  })();

  if (FONT_FAMILY) css += `font-family: ${FONT_FAMILY};\n`;

  const FONT_WEIGHT = (() => {
    if (element.children[0].type === 'TEXT') {
      if (element.children[0].style) {
        return element.children[0].style.fontWeight;
      }
    }
  })();

  if (FONT_WEIGHT) css += `font-weight: ${FONT_WEIGHT};\n`;

  const FONT_LINE_HEIGHT = (() => {
    if (element.children[0].type === 'TEXT') {
      if (element.children[0].style) {
        return element.children[0].style.lineHeightPx;
      }
    }
  })();

  if (FONT_LINE_HEIGHT) css += `line-height: ${FONT_LINE_HEIGHT}px;\n`;

  const FONT_ALIGNMENT = (() => {
    if (element.children[0].type === 'TEXT') {
      if (element.children[0].style) {
        return element.children[0].style.textAlignHorizontal;
      }
    }
  })();

  if (FONT_ALIGNMENT) css += `text-align: ${FONT_ALIGNMENT};\n`;

  console.log('asdf', element.children);

  return css;
}
