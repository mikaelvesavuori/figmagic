import * as path from 'path';

//import { Css } from '../../../contracts/Css';
//import { Element } from '../../contracts/Element';
import { TextElement } from '../../../contracts/TextElement';

import { sliceOutObjectFromFile } from './sliceOutObjectFromFile';

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
 * @param element Figma object representation of main layout element
 * @param textElement Figma object representation of the text field connected to the element/component
 * @param remSize HTML body REM size
 */
// TODO: Refactor
export function parseCssFromElement(
  element: any,
  textElement: TextElement,
  remSize: number,
  outputTokenFormat: string
): any {
  try {
    if (!element || !remSize) throw new Error(ErrorParseCssFromElement);

    const PATH = process.env.IS_TEST ? path.join(`testdata`, `tokens`) : path.join(`tokens`);
    const FORMAT = outputTokenFormat;

    // Get data from tokens
    // TODO: Camel-casing seems to be broken? (somewhere else; in write?)
    const _borderWidths = path.join(`${process.cwd()}`, `${PATH}`, `borderWidths.${FORMAT}`);
    const borderWidths = sliceOutObjectFromFile(_borderWidths);

    const _colors = path.join(`${process.cwd()}`, `${PATH}`, `colors.${FORMAT}`);
    const colors = sliceOutObjectFromFile(_colors);

    const _radii = path.join(`${process.cwd()}`, `${PATH}`, `radii.${FORMAT}`);
    const radii = sliceOutObjectFromFile(_radii);

    const _shadows = path.join(`${process.cwd()}`, `${PATH}`, `shadows.${FORMAT}`);
    const shadows = sliceOutObjectFromFile(_shadows);

    const _spacing = path.join(`${process.cwd()}`, `${PATH}`, `spacing.${FORMAT}`);
    const spacing = sliceOutObjectFromFile(_spacing);

    // Start parsing
    let css = ``;
    const imports: any = [];

    // Add defaults
    css += `width: 100%;\nbox-sizing: border-box;\nborder: 0;\nborder-style: solid;\n`;

    const PADDING_Y: PaddingVertical | null = getPaddingY(textElement, element);
    const PADDING_X: PaddingHorizontal | null = getPaddingX(textElement, element);
    if (!PADDING_Y || !PADDING_X) throw new Error(); // TODO: add real error

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
    if (HEIGHT) {
      const a = parseHeight(css, imports, { spacing, height: HEIGHT, remSize });
      css += a.css;
      imports.concat(a.imports);
    }

    const BACKGROUND_COLOR = getBackgroundColor(element);
    if (BACKGROUND_COLOR) {
      const a = parseBackgroundColor(css, imports, {
        colors,
        backgroundColor: BACKGROUND_COLOR,
        remSize
      });
      css += a.css;
      imports.concat(a.imports);
    }

    const BORDER_WIDTH = element.strokeWeight ? `${element.strokeWeight}px` : null;
    if (BORDER_WIDTH) {
      const a = parseBorderWidth(css, imports, {
        borderWidths,
        borderWidth: BORDER_WIDTH,
        remSize
      });
      css += a.css;
      imports.concat(a.imports);
    }

    const BORDER_COLOR = getBorderColor(element);
    if (BORDER_COLOR) {
      const a = parseBorderColor(css, imports, { colors, borderColor: BORDER_COLOR, remSize });
      css += a.css;
      imports.concat(a.imports);
    }

    const BORDER_RADIUS = element.cornerRadius ? `${element.cornerRadius}px` : null;
    if (BORDER_RADIUS) {
      const a = parseBorderRadius(css, imports, { radii, borderRadius: BORDER_RADIUS, remSize });
      css += a.css;
      imports.concat(a.imports);
    }

    const SHADOW = getShadow(element);
    if (SHADOW) {
      const a = parseShadow(css, imports, { shadows, shadow: SHADOW, remSize });
      css += a.css;
      imports.concat(a.imports);
    }

    return { css, imports };
  } catch (error) {
    throw new Error(error);
  }
}
