import { roundColorValue } from './roundColorValue.mjs';
import { getTokenMatch } from './getTokenMatch.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

// MAYBE TODO: Map to Figma Styles instead?
export async function getTypographyStylingFromElement(element) {
  // Dynamic imports
  const _colors = await import('../../tokens/colors.mjs');
  const colors = _colors.default;
  const _fontFamilies = await import('../../tokens/fontFamilies.mjs');
  const fontFamilies = _fontFamilies.default;
  const _fontSizes = await import('../../tokens/fontSizes.mjs');
  const fontSizes = _fontSizes.default;
  const _fontWeights = await import('../../tokens/fontWeights.mjs');
  const fontWeights = _fontWeights.default;
  const _letterSpacings = await import('../../tokens/letterSpacings.mjs');
  const letterSpacings = _letterSpacings.default;
  const _lineHeights = await import('../../tokens/lineHeights.mjs');
  const lineHeights = _lineHeights.default;

  let css = ``;
  let imports = [];

  // TODO: Get this from config
  const REM = 16;

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

  if (FONT_COLOR) {
    const { updatedCss, updatedImports } = getTokenMatch(colors, 'colors', 'color', FONT_COLOR);
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  const FONT_SIZE = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.fontSize;
      }
    }
  })();

  if (FONT_SIZE) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontSizes,
      'fontSizes',
      'font-size',
      FONT_SIZE,
      REM
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  // BUG? Will only work correctly with Postscript name?
  const FONT_FAMILY = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.fontPostScriptName; //fontFamily;
      }
    }
  })();

  if (FONT_FAMILY) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontFamilies,
      'fontFamilies',
      'font-family',
      FONT_FAMILY
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  const FONT_WEIGHT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.fontWeight;
      }
    }
  })();

  if (FONT_WEIGHT) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontWeights,
      'fontWeights',
      'font-weight',
      FONT_WEIGHT
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  const FONT_LINE_HEIGHT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        if (element.style.lineHeightPercentFontSize) {
          return element.style.lineHeightPercentFontSize / 100;
        } else return 1.0;
      }
    }
  })();

  if (FONT_LINE_HEIGHT) {
    const { updatedCss, updatedImports } = getTokenMatch(
      lineHeights,
      'lineHeights',
      'line-height',
      FONT_LINE_HEIGHT
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  const FONT_ALIGNMENT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.textAlignHorizontal;
      }
    }
  })();

  const LETTER_SPACING = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        if (element.style.letterSpacing) {
          return element.style.letterSpacing;
        }
      }
    }
  })();

  if (LETTER_SPACING) {
    const { updatedCss, updatedImports } = getTokenMatch(
      letterSpacings,
      'letterSpacings',
      'letter-spacing',
      normalizeUnits(parseFloat(LETTER_SPACING), 'letterSpacing', 'adjustedSpacing')
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  if (FONT_ALIGNMENT) {
    const ALIGNMENT = FONT_ALIGNMENT.toLowerCase();
    css += `text-align: ${ALIGNMENT};\n`;
  }

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

  return { css, imports };
}
