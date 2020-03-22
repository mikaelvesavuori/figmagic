import { roundColorValue } from './roundColorValue.mjs';

export function getCssFromElement(element) {
  let css = ``;

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
    if (element.fills) {
      if (element.fills[0]) {
        if (element.fills[0].type === 'SOLID') {
          const R = roundColorValue(element.fills[0].color.r);
          const G = roundColorValue(element.fills[0].color.g);
          const B = roundColorValue(element.fills[0].color.b);
          const A = roundColorValue(element.fills[0].color.a, 1);
          return `rgba(${R}, ${G}, ${B}, ${A})`;
        }
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
      if (element.strokes.length > 0) {
        if (element.strokes[0].type === 'SOLID') {
          const R = roundColorValue(element.strokes[0].color.r);
          const G = roundColorValue(element.strokes[0].color.g);
          const B = roundColorValue(element.strokes[0].color.b);
          const A = roundColorValue(element.strokes[0].color.a, 1);
          return `rgba(${R}, ${G}, ${B}, ${A})`;
        }
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
      if (element.effects[0]) {
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
    }
  })();

  if (SHADOW) css += `box-shadow: ${SHADOW};\n`;

  return css;
}
