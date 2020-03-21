export function getTypographyStylingFromElement(element) {
  let css = ``;

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

  return css;
}
