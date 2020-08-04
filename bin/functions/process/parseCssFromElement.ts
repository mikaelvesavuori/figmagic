import * as path from 'path';

import { errorParseCssFromElement } from '../../meta/errors';

import { Css } from '../../domain/Css/Css';
import { Element } from '../../domain/Element/Element';
import { TextElement } from '../../domain/Element/TextElement';

import {
  getPaddingY,
  getPaddingX,
  parsePadding,
  parseHeight,
  getBackgroundColor,
  parseBackgroundColor,
  parseBorderWidth,
  getBorderColor,
  parseBorderColor,
  parseBorderRadius,
  getShadow,
  parseShadow
} from './cssParsers/parsers';

/**
 * Parse layout CSS from "element" (Figma component)
 *
 * @exports
 * @async
 * @function
 * @param {Element} element - Figma object representation of main layout element
 * @param {TextElement} [textElement] - Figma object representation of the text field connected to the element/component
 * @param {number} remSize - HTML body REM size
 * @param {boolean} isTest - Check if this is a test, in which case tokens need to be imported from a stable source
 * @returns {object} - Returns object with CSS and imports
 * @throws {errorParseCssFromElement} - Throws error if missing element or remSize arguments
 */
export async function parseCssFromElement(
  element: Element,
  textElement: TextElement,
  remSize: number,
  isTest: boolean = false
): Promise<Css> {
  if (!element || !remSize) throw new Error(errorParseCssFromElement);

  // Dynamic imports
  const PATH = isTest ? path.join(`testdata`, `tokens`) : `tokens`;

  const _borderWidths = await import(path.join(`${process.cwd()}`, `${PATH}`, `borderWidths.ts`));
  const borderWidths = _borderWidths.default;

  const _colors = await import(path.join(`${process.cwd()}`, `${PATH}`, `colors.ts`));
  const colors = _colors.default;

  const _radii = await import(path.join(`${process.cwd()}`, `${PATH}`, `radii.ts`));
  const radii = _radii.default;

  const _shadows = await import(path.join(`${process.cwd()}`, `${PATH}`, `shadows.ts`));
  const shadows = _shadows.default;

  const _spacing = await import(path.join(`${process.cwd()}`, `${PATH}`, `spacing.ts`));
  const spacing = _spacing.default;

  let css: string = ``;
  let imports: any = [];

  css += `width: 100%;\n`;
  css += `box-sizing: border-box;\n`;

  const PADDING_Y: object = getPaddingY(textElement, element);
  const PADDING_X: object = getPaddingX(textElement, element);

  const PADDING = {
    ...PADDING_Y,
    ...PADDING_X
  };

  parsePadding(css, imports, {
    padding: PADDING,
    spacing,
    remSize
  });

  const HEIGHT = element.absoluteBoundingBox ? element.absoluteBoundingBox.height : null;
  if (HEIGHT) parseHeight(css, imports, { spacing, height: HEIGHT, remSize });

  const BACKGROUND_COLOR = getBackgroundColor(element);
  if (BACKGROUND_COLOR)
    parseBackgroundColor(css, imports, {
      colors,
      backgroundColor: BACKGROUND_COLOR,
      remSize
    });

  css += `border: 0;\n`;
  css += `border-style: solid;\n`;

  const BORDER_WIDTH = element.strokeWeight ? `${element.strokeWeight}px` : null;
  if (BORDER_WIDTH)
    parseBorderWidth(css, imports, { borderWidths, borderWidth: BORDER_WIDTH, remSize });

  const BORDER_COLOR = getBorderColor(element);
  if (BORDER_COLOR) parseBorderColor(css, imports, { colors, borderColor: BORDER_COLOR, remSize });

  const BORDER_RADIUS = element.cornerRadius ? `${element.cornerRadius}px` : null;
  if (BORDER_RADIUS)
    parseBorderRadius(css, imports, { radii, borderRadius: BORDER_RADIUS, remSize });

  const SHADOW = getShadow(element);
  if (SHADOW) parseShadow(css, imports, { shadows, shadow: SHADOW, remSize });

  return { css, imports };
}
