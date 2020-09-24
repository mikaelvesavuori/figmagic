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

import { ErrorParseCssFromElement, ErrorGetFiles } from '../../../frameworks/errors/errors';

/**
 * @description Parse layout CSS from "element" (Figma component)
 */
export function parseCssFromElement(
  layoutElement: Frame,
  textElement: Frame | null,
  remSize: number,
  outputTokenFormat: string,
  outputFolderTokens: string
): UpdatedCssAndImports {
  try {
    if (!layoutElement || !remSize || !outputTokenFormat) throw new Error(ErrorParseCssFromElement);

    const PATH = process.env.IS_TEST ? path.join(`testdata`, `tokens`) : outputFolderTokens;
    const { borderWidths, colors, radii, shadows, spacing } = getFiles(PATH, outputTokenFormat);

    // Start parsing, and add defaults
    let css = `width: 100%;\nbox-sizing: border-box;\nborder: 0;\nborder-style: solid;\n`;
    let imports: any = [];

    /**
     * Padding
     */
    const PADDING_Y: PaddingVertical | null = textElement
      ? getPaddingY(textElement, layoutElement)
      : null;
    const PADDING_X: PaddingHorizontal | null = textElement
      ? getPaddingX(textElement, layoutElement)
      : null;

    if (PADDING_Y && PADDING_X) {
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
    }

    /**
     * Heights
     */
    const HEIGHT = layoutElement.absoluteBoundingBox
      ? layoutElement.absoluteBoundingBox.height
      : null;
    if (HEIGHT) {
      const parsedValue = parseHeight(css, imports, { spacing, height: HEIGHT, remSize });
      css += parsedValue.css;
      if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
    }

    /**
     * Background color
     */
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

    /**
     * Border width
     */
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

    /**
     * Border color
     */
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

    /**
     * Border radius
     */
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

    /**
     * Shadows
     */
    const SHADOW = getShadow(layoutElement);
    if (SHADOW) {
      const parsedValue = parseShadow(css, imports, { shadows, shadow: SHADOW, remSize });
      css += parsedValue.css;
      if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
    }

    const NEW_CSS = reduceDuplicates(css);
    return { updatedCss: NEW_CSS, updatedImports: imports };
  } catch (error) {
    throw new Error(ErrorParseCssFromElement);
  }
}

const reduceDuplicates = (str: string) =>
  Array.from(new Set(str.split(/;/gi)))
    .toString()
    .replace(/,/gi, ';');

const getFiles = (path: string, outputTokenFormat: string): any => {
  try {
    const borderWidths = getFileContents(path, 'borderWidths', outputTokenFormat);
    const colors = getFileContents(path, 'colors', outputTokenFormat);
    const radii = getFileContents(path, 'radii', outputTokenFormat);
    const shadows = getFileContents(path, 'shadows', outputTokenFormat);
    const spacing = getFileContents(path, 'spacing', outputTokenFormat);

    return {
      borderWidths,
      colors,
      radii,
      shadows,
      spacing
    };
  } catch (error) {
    throw new Error(ErrorGetFiles);
  }
};
