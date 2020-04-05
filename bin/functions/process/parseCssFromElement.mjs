import { roundColorValue } from '../helpers/roundColorValue.mjs';
import { getTokenMatch } from './getTokenMatch.mjs';
//import { warnParseCssFromElementNoTokenMatch } from '../meta/warnings.mjs';
import { errorParseCssFromElement } from '../../meta/errors.mjs';

/**
 * Parse layout CSS from "element" (Figma component)
 *
 * @exports
 * @async
 * @function
 * @param {object} element - Figma object representation of main layout element
 * @param {object} [textElement] - Figma object representation of the text field connected to the element/component
 * @param {object} image - Optional image
 * @param {number} remSize - HTML body REM size
 * @param {boolean} isTest - Check if this is test, in which case tokens need to be imported from a stable source
 * @returns {object} - Returns object with CSS and imports
 * @throws {errorParseCssFromElement} - Throws error if missing element or remSize arguments
 */
export async function parseCssFromElement(
  element,
  textElement,
  image = null,
  remSize,
  isTest = false
) {
  if (!element || !remSize) throw new Error(errorParseCssFromElement);

  // Dynamic imports
  const PATH = isTest ? `testdata/tokens` : `tokens`;
  const _borderWidths = await import(`${process.cwd()}/${PATH}/borderWidths.mjs`);
  const borderWidths = _borderWidths.default;
  const _colors = await import(`${process.cwd()}/${PATH}/colors.mjs`);
  const colors = _colors.default;
  const _radii = await import(`${process.cwd()}/${PATH}/radii.mjs`);
  const radii = _radii.default;
  const _shadows = await import(`${process.cwd()}/${PATH}/shadows.mjs`);
  const shadows = _shadows.default;
  const _spacing = await import(`${process.cwd()}/${PATH}/spacing.mjs`);
  const spacing = _spacing.default;
  // Not using media queries or Z indices

  let css = ``;
  let imports = [];

  css += `width: 100%;\n`;
  css += `box-sizing: border-box;\n`;

  /*
  // Background image
  const BACKGROUND_IMAGE = (() => {
    if (image) {
      console.log(image.fills[0]);
      const URL = `${image.fills[0].imageRef}`;
      return `background-image: url("${URL}")`;
    }
	})();

	console.log('BACKGROUND_IMAGE', BACKGROUND_IMAGE);
	*/

  // Paddings for top and bottom
  const PADDING_Y = (() => {
    if (textElement) {
      const PARENT_HEIGHT = element.absoluteBoundingBox.height;
      const TEXT_HEIGHT = textElement.absoluteBoundingBox.height;
      const PADDING_TOP = textElement.absoluteBoundingBox.y - element.absoluteBoundingBox.y;
      const PADDING_BOTTOM = PARENT_HEIGHT - (PADDING_TOP + TEXT_HEIGHT);

      return {
        top: Math.round(PADDING_TOP),
        bottom: Math.round(PADDING_BOTTOM)
      };
    }
  })();

  // Paddings for left and right
  const PADDING_X = (() => {
    if (textElement) {
      const PARENT_WIDTH = element.absoluteBoundingBox.width;
      const TEXT_WIDTH = textElement.absoluteBoundingBox.width;
      const PADDING_LEFT = textElement.absoluteBoundingBox.x - element.absoluteBoundingBox.x;
      const PADDING_RIGHT = PARENT_WIDTH - (PADDING_LEFT + TEXT_WIDTH);

      return {
        left: Math.round(PADDING_LEFT),
        right: Math.round(PADDING_RIGHT)
      };
    }
  })();

  const PADDING = {
    ...PADDING_Y,
    ...PADDING_X
  };

  if (PADDING && Object.keys(PADDING).length > 0) {
    const PADDINGS = Object.values(PADDING).map((p) => p);
    const IS_ZERO = PADDINGS.every((item) => item === 0);

    // Don't set paddings if all values are actually empty
    if (!IS_ZERO) {
      const { updatedCss, updatedImports } = getTokenMatch(
        spacing,
        'spacing',
        'padding',
        PADDING,
        remSize
      );
      css += updatedCss;
      updatedImports.forEach((i) => imports.push(i));
    }
  }

  const HEIGHT = (() => {
    if (element.absoluteBoundingBox) {
      return element.absoluteBoundingBox.height;
    }
  })();

  if (HEIGHT) {
    const { updatedCss, updatedImports } = getTokenMatch(
      spacing,
      'spacing',
      'height',
      HEIGHT,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i) => imports.push(i));
  }

  /**
   * Check for background color property
   * Prioritize solid color, then linear gradient
   * Expect only one value, and do so by only ever using the first fill match
   */
  const BACKGROUND_COLOR = (() => {
    if (element.fills) {
      // Check for solid fills
      // A solid fill will always be #1 priority

      const fills = element.fills.filter((f) => f.type === 'SOLID');

      if (fills.length > 0) {
        const R = roundColorValue(fills[0].color.r);
        const G = roundColorValue(fills[0].color.g);
        const B = roundColorValue(fills[0].color.b);
        const A = roundColorValue(fills[0].color.a, 1);
        return `rgba(${R}, ${G}, ${B}, ${A})`;
      }

      // Check for linear gradient fills
      // We will check for this only after checking that no solid fill color exists
      const gradients = element.fills.filter((f) => f.type === 'GRADIENT_LINEAR');

      if (fills.length === 0 && gradients.length > 0) {
        let str = `linear-gradient(`;

        gradients[0].gradientStops.forEach((fill, index) => {
          const R = roundColorValue(fill.color.r, 255);
          const G = roundColorValue(fill.color.g, 255);
          const B = roundColorValue(fill.color.b, 255);
          const A = roundColorValue(fill.color.a, 255);
          const POS = roundColorValue(fill.position, 100);

          if (index > 0) str += ` `;
          str += `rgba(${R}, ${G}, ${B}, ${A}) ${POS}%`;
          if (index < gradients[0].gradientStops.length - 1) str += `,`;
          if (index >= gradients[0].gradientStops.length - 1) str += `)`;
        });

        return str;
      }
    }
  })();

  if (BACKGROUND_COLOR) {
    const PROPERTY = BACKGROUND_COLOR.includes('gradient') ? 'background' : 'background-color';

    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      PROPERTY,
      BACKGROUND_COLOR,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i) => imports.push(i));
  }

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
      BORDER_WIDTH,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i) => imports.push(i));
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
      BORDER_COLOR,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i) => imports.push(i));
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
      BORDER_RADIUS,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i) => imports.push(i));
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
    const { updatedCss, updatedImports } = getTokenMatch(
      shadows,
      'shadows',
      'box-shadow',
      SHADOW,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i) => imports.push(i));
  }

  return { css, imports };
}
