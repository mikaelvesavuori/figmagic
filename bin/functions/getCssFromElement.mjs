import { roundColorValue } from './roundColorValue.mjs';
import { getTokenMatch } from './getTokenMatch.mjs';
//import { warnGetCssFromElementNoTokenMatch } from '../meta/warnings.mjs';

// TODO: Will these paths break?
import borderWidths from '../../tokens/borderWidths.mjs';
import colors from '../../tokens/colors.mjs';
import radii from '../../tokens/radii.mjs';
import shadows from '../../tokens/shadows.mjs';
import spacing from '../../tokens/spacing.mjs';
//import mediaQueries from '../../tokens/mediaQueries.mjs';
//import zIndices from '../../tokens/zIndices.mjs';

export function getCssFromElement(element, textElement) {
  let css = ``;
  let imports = [];

  const REM = 16;

  // TODO: Change?
  // Set full width
  css += `width: 100%;\n`;

  // TODO: Create PADDING_Y
  const PADDING_X = (() => {
    if (textElement) {
      return Math.round(textElement.absoluteBoundingBox.x - element.absoluteBoundingBox.x);
    }
  })();

  if (PADDING_X > 0) {
    const { updatedCss, updatedImports } = getTokenMatch(
      spacing,
      'spacing',
      'padding',
      PADDING_X,
      REM
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  const HEIGHT = (() => {
    if (element.absoluteBoundingBox) {
      return element.absoluteBoundingBox.height;
    }
  })();

  if (HEIGHT) {
    const { updatedCss, updatedImports } = getTokenMatch(spacing, 'spacing', 'height', HEIGHT, REM);
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

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

  if (BACKGROUND_COLOR) {
    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      'background-color',
      BACKGROUND_COLOR
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  // TODO: Are these OK as "resets"?
  css += `border: 0;\n`;
  css += `border-style: solid;\n`;

  const BORDER_WIDTH = (() => {
    if (element.strokeWeight) {
      return `${element.strokeWeight}px`;
    }
  })();

  if (BORDER_WIDTH) {
    const { updatedCss, updatedImports } = getTokenMatch(
      borderWidths,
      'borderWidths',
      'border-width',
      BORDER_WIDTH
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

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

  if (BORDER_COLOR) {
    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      'border-color',
      BORDER_COLOR
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  const BORDER_RADIUS = (() => {
    if (element.cornerRadius) {
      return `${element.cornerRadius}px`;
    }
  })();

  if (BORDER_RADIUS) {
    const { updatedCss, updatedImports } = getTokenMatch(
      radii,
      'radii',
      'border-radius',
      BORDER_RADIUS
    );
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

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

  if (SHADOW) {
    const { updatedCss, updatedImports } = getTokenMatch(shadows, 'shadows', 'box-shadow', SHADOW);
    css += updatedCss;
    updatedImports.forEach(i => imports.push(i));
  }

  return { css, imports };
}
