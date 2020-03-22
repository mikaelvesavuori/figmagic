import { roundColorValue } from './roundColorValue.mjs';

// TODO: Map to Figma Styles instead?
export function getTypographyStylingFromElement(element) {
  let css = ``;

  const FONT_COLOR = (() => {
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

  if (FONT_COLOR) css += `color: ${FONT_COLOR};\n`;

  const FONT_SIZE = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.fontSize;
      }
    }
  })();

  if (FONT_SIZE) css += `font-size: ${FONT_SIZE}px;\n`;

  const FONT_FAMILY = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.fontFamily;
      }
    }
  })();

  if (FONT_FAMILY) css += `font-family: ${FONT_FAMILY};\n`;

  const FONT_WEIGHT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.fontWeight;
      }
    }
  })();

  if (FONT_WEIGHT) css += `font-weight: ${FONT_WEIGHT};\n`;

  const FONT_LINE_HEIGHT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.lineHeightPx;
      }
    }
  })();

  if (FONT_LINE_HEIGHT) css += `line-height: ${FONT_LINE_HEIGHT}px;\n`;

  const FONT_ALIGNMENT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.textAlignHorizontal;
      }
    }
  })();

  if (FONT_ALIGNMENT) css += `text-align: ${FONT_ALIGNMENT};\n`;

  const FONT_CASE = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        if (element.style.textCase) {
          if (element.style.textCase === 'LOWER') return 'lowercase';
          if (element.style.textCase === 'UPPER') return 'uppercase';
          if (element.style.textCase === 'TITLE') return 'capitalize';
        }
      }
    }
  })();

  if (FONT_CASE) css += `text-transform: ${FONT_CASE};\n`;

  return css;
}
