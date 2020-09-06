import * as fs from 'fs';
import * as path from 'path';

//import { Css } from '../../../contracts/Css';
//import { Element } from '../../contracts/Element';
import { TextElement } from '../../../contracts/TextElement';

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
} from './parsers';

import { ErrorParseCssFromElement } from '../../../frameworks/errors/errors';

/**
 * @description Parse layout CSS from "element" (Figma component)
 *
 * @param element Figma object representation of main layout element
 * @param textElement Figma object representation of the text field connected to the element/component
 * @param remSize HTML body REM size
 */
export async function parseCssFromElement(
  element: any,
  textElement: TextElement,
  remSize: number,
  outputTokenFormat: string
): Promise<any> {
  if (!element || !remSize) throw new Error(ErrorParseCssFromElement);

  return new Promise(async (resolve, reject) => {
    try {
      const PATH = process.env.IS_TEST ? path.join(`testdata`, `tokens`) : path.join(`tokens`);
      const FORMAT = outputTokenFormat;

      // Get data from tokens
      const _borderWidths = path.join(`${process.cwd()}`, `${PATH}`, `borderwidths.${FORMAT}`);
      const borderWidths = sliceOutObject(_borderWidths);

      const _colors = path.join(`${process.cwd()}`, `${PATH}`, `colors.${FORMAT}`);
      const colors = sliceOutObject(_colors);

      const _radii = path.join(`${process.cwd()}`, `${PATH}`, `radii.${FORMAT}`);
      const radii = sliceOutObject(_radii);

      const _shadows = path.join(`${process.cwd()}`, `${PATH}`, `shadows.${FORMAT}`);
      const shadows = sliceOutObject(_shadows);

      const _spacing = path.join(`${process.cwd()}`, `${PATH}`, `spacing.${FORMAT}`);
      const spacing = sliceOutObject(_spacing);

      // Start parsing
      let css = ``;
      const imports: any = [];

      css += `width: 100%;\n`;
      css += `box-sizing: border-box;\n`;

      const PADDING_Y: Record<string, unknown> = getPaddingY(textElement, element);
      const PADDING_X: Record<string, unknown> = getPaddingX(textElement, element);

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
      if (BORDER_COLOR)
        parseBorderColor(css, imports, { colors, borderColor: BORDER_COLOR, remSize });

      const BORDER_RADIUS = element.cornerRadius ? `${element.cornerRadius}px` : null;
      if (BORDER_RADIUS)
        parseBorderRadius(css, imports, { radii, borderRadius: BORDER_RADIUS, remSize });

      const SHADOW = getShadow(element);
      if (SHADOW) parseShadow(css, imports, { shadows, shadow: SHADOW, remSize });

      resolve({ css, imports });
    } catch (error) {
      reject(error);
    }
  });
}

const sliceOutObject = (path: string): Record<string, unknown> => {
  const data = fs.readFileSync(path, 'utf8');
  const DATA = data.slice(data.indexOf('{'), data.indexOf('}') + 1);
  return JSON.parse(DATA);
};
