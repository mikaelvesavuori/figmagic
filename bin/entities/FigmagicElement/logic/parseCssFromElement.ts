import * as path from 'path';

import { FRAME as Frame } from '../../../contracts/Figma';
import { UpdatedCssAndImports } from '../../../contracts/Imports';

import { getFileContents } from './getFileContents';
import {
  PaddingVertical,
  PaddingHorizontal,
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
} from './parsers';

import { ErrorParseCssFromElement } from '../../../frameworks/errors/errors';

/**
 * @description Parse layout CSS from "element" (Figma component)
 *
 * @param layoutElement Figma object representation of main layout element
 * @param textElement Figma object representation of the text field connected to the element/component
 * @param remSize HTML body REM size
 * @param outputTokenFormat Token output format
 */
// TODO: Refactor
export function parseCssFromElement(
  layoutElement: Frame,
  textElement: Frame | null,
  remSize: number,
  outputTokenFormat: string
): UpdatedCssAndImports {
  try {
    if (!layoutElement || !remSize || !outputTokenFormat) throw new Error(ErrorParseCssFromElement);

    // TODO/BUG: This hardcodes token path, which should be customizable
    const PATH = process.env.IS_TEST ? path.join(`testdata`, `tokens`) : path.join(`tokens`);

    // Get data from tokens
    // TODO: Create support function for loading and slicing
    const borderWidths = getFileContents(PATH, 'borderWidths', outputTokenFormat);
    const colors = getFileContents(PATH, 'colors', outputTokenFormat);
    const radii = getFileContents(PATH, 'radii', outputTokenFormat);
    const shadows = getFileContents(PATH, 'shadows', outputTokenFormat);
    const spacing = getFileContents(PATH, 'spacing', outputTokenFormat);

    // Start parsing
    let css = ``;
    let imports: any = [];

    // Add defaults
    css += `width: 100%;\nbox-sizing: border-box;\nborder: 0;\nborder-style: solid;\n`;

    const PADDING_Y: PaddingVertical | null = textElement
      ? getPaddingY(textElement, layoutElement)
      : null;
    const PADDING_X: PaddingHorizontal | null = textElement
      ? getPaddingX(textElement, layoutElement)
      : null;

    const PADDING = {
      ...PADDING_Y,
      ...PADDING_X
    };

    const PARSED_PADDING = parsePadding(css, imports, {
      padding: PADDING,
      spacing,
      remSize
    });

    css += PARSED_PADDING.css;
    if (PARSED_PADDING.imports) imports = imports.concat(PARSED_PADDING.imports);

    const HEIGHT = layoutElement.absoluteBoundingBox
      ? layoutElement.absoluteBoundingBox.height
      : null;
    if (HEIGHT) {
      const parsedValue = parseHeight(css, imports, { spacing, height: HEIGHT, remSize });
      css += parsedValue.css;
      if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
    }

    // Seem to get dual background-color for Checkbox? One should be color
    const BACKGROUND_COLOR = getBackgroundColor(layoutElement);
    if (BACKGROUND_COLOR) {
      const parsedValue = parseBackgroundColor(css, imports, {
        colors,
        backgroundColor: BACKGROUND_COLOR,
        remSize
      });
      css += parsedValue.css;
      if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
    }

    const BORDER_WIDTH = layoutElement.strokeWeight ? `${layoutElement.strokeWeight}px` : null;
    if (BORDER_WIDTH) {
      const parsedValue = parseBorderWidth(css, imports, {
        borderWidths,
        borderWidth: BORDER_WIDTH,
        remSize
      });
      css += parsedValue.css;
      if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
    }

    const BORDER_COLOR = getBorderColor(layoutElement);
    if (BORDER_COLOR) {
      const parsedValue = parseBorderColor(css, imports, {
        colors,
        borderColor: BORDER_COLOR,
        remSize
      });
      css += parsedValue.css;
      if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
    }

    const BORDER_RADIUS = layoutElement.cornerRadius ? `${layoutElement.cornerRadius}px` : null;
    if (BORDER_RADIUS) {
      const parsedValue = parseBorderRadius(css, imports, {
        radii,
        borderRadius: BORDER_RADIUS,
        remSize
      });
      css += parsedValue.css;
      if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
    }

    const SHADOW = getShadow(layoutElement);
    if (SHADOW) {
      const parsedValue = parseShadow(css, imports, { shadows, shadow: SHADOW, remSize });
      css += parsedValue.css;
      if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
    }

    // Reduce all duplicates
    const NEW_CSS = Array.from(new Set(css.split(/;/gi)))
      .toString()
      .replace(/,/gi, ';');

    return { updatedCss: NEW_CSS, updatedImports: imports };
  } catch (error) {
    throw new Error(ErrorParseCssFromElement);
  }
}
