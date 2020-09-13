import * as path from 'path';

import { FRAME as Frame } from '../../../contracts/Figma';
import { UpdatedCssAndImports } from '../../../contracts/Imports';

import { getTokenMatch } from './getTokenMatch';
import { getFileContents } from './getFileContents';

import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import { ErrorParseTypographyStylingFromElement } from '../../../frameworks/errors/errors';

/**
 * @description Parse typography CSS from "element" (Figma component)
 *
 * @param textElement Figma object representation of text element/component
 * @param remSize HTML body REM size
 */
export function parseTypographyStylingFromElement(
  textElement: Frame,
  remSize: number,
  outputTokenFormat: string
): UpdatedCssAndImports {
  try {
    if (!textElement || !remSize) throw new Error(ErrorParseTypographyStylingFromElement);

    // TODO/BUG: This hardcodes token path, which should be customizable
    const PATH = process.env.IS_TEST ? path.join('testdata', 'tokens') : `tokens`;

    // Get data from tokens
    const colors = getFileContents(PATH, 'colors', outputTokenFormat);
    const fontFamilies = getFileContents(PATH, 'fontFamilies', outputTokenFormat);
    const fontSizes = getFileContents(PATH, 'fontSizes', outputTokenFormat);
    const fontWeights = getFileContents(PATH, 'fontWeights', outputTokenFormat);
    const letterSpacings = getFileContents(PATH, 'letterSpacings', outputTokenFormat);
    const lineHeights = getFileContents(PATH, 'lineHeights', outputTokenFormat);

    let css = ``;
    const imports: Record<string, unknown>[] = [];

    const FONT_COLOR = (() => {
      if (textElement.fills) {
        if (textElement.fills[0]) {
          if (textElement.fills[0].type === 'SOLID') {
            if (!textElement.fills[0].color) throw new Error('asdf'); // TODO: add real error
            const R = roundColorValue(textElement.fills[0].color.r);
            const G = roundColorValue(textElement.fills[0].color.g);
            const B = roundColorValue(textElement.fills[0].color.b);
            const A = roundColorValue(textElement.fills[0].color.a, 1);
            return `rgba(${R}, ${G}, ${B}, ${A})`;
          }
        }
      }
      return null;
    })();

    if (FONT_COLOR) {
      const { updatedCss, updatedImports } = getTokenMatch(
        colors,
        'colors',
        'color',
        FONT_COLOR,
        remSize
      );
      css += updatedCss;
      updatedImports.forEach((i: Record<string, unknown>) => imports.push(i));
    }

    const FONT_SIZE: number | null = (() => {
      if (textElement.type === 'TEXT') {
        if (textElement.style) {
          return parseFloat(textElement.style.fontSize);
        }
      }
      return null;
    })();

    if (FONT_SIZE) {
      const { updatedCss, updatedImports } = getTokenMatch(
        fontSizes,
        'fontSizes',
        'font-size',
        FONT_SIZE,
        remSize
      );
      css += updatedCss;
      updatedImports.forEach((i: any) => imports.push(i));
    }

    // BUG? Will only work correctly with Postscript name?
    const FONT_FAMILY = (() => {
      if (textElement.type === 'TEXT') {
        if (textElement.style) {
          return textElement.style.fontPostScriptName; //fontFamily;
        }
      }
      return null;
    })();

    if (FONT_FAMILY) {
      const { updatedCss, updatedImports } = getTokenMatch(
        fontFamilies,
        'fontFamilies',
        'font-family',
        FONT_FAMILY,
        remSize
      );
      css += updatedCss;
      updatedImports.forEach((i: Record<string, unknown>) => imports.push(i));
    }

    const FONT_WEIGHT = (() => {
      if (textElement.type === 'TEXT') {
        if (textElement.style) {
          return textElement.style.fontWeight;
        }
      }
      return null;
    })();

    if (FONT_WEIGHT) {
      const { updatedCss, updatedImports } = getTokenMatch(
        fontWeights,
        'fontWeights',
        'font-weight',
        FONT_WEIGHT,
        remSize
      );
      css += updatedCss;
      updatedImports.forEach((i: Record<string, unknown>) => imports.push(i));
    }

    const FONT_LINE_HEIGHT = (() => {
      if (textElement.type === 'TEXT') {
        if (textElement.style) {
          if (textElement.style.lineHeightPercentFontSize) {
            return textElement.style.lineHeightPercentFontSize / 100;
          } else return 1.0;
        }
      }
      return null;
    })();

    if (FONT_LINE_HEIGHT) {
      const { updatedCss, updatedImports } = getTokenMatch(
        lineHeights,
        'lineHeights',
        'line-height',
        FONT_LINE_HEIGHT,
        remSize
      );
      css += updatedCss;
      updatedImports.forEach((i: Record<string, unknown>) => imports.push(i));
    }

    const FONT_ALIGNMENT = (() => {
      if (textElement.type === 'TEXT') {
        if (textElement.style) {
          return textElement.style.textAlignHorizontal;
        }
      }
      return null;
    })();

    const LETTER_SPACING: number | null = (() => {
      if (textElement.type === 'TEXT') {
        if (textElement.style) {
          if (textElement.style.letterSpacing) {
            return parseFloat(textElement.style.letterSpacing);
          }
        }
      }
      return null;
    })();

    if (LETTER_SPACING && FONT_SIZE) {
      // TODO: this duplicates the internal logic of the letter-spacing token processing, and makes the heavy assumption the expected unit is "em"
      const size = LETTER_SPACING / FONT_SIZE;
      const sizeString = `${size}em`;

      const { updatedCss, updatedImports } = getTokenMatch(
        letterSpacings,
        'letterSpacings',
        'letter-spacing',
        sizeString,
        remSize
      );
      css += updatedCss;
      updatedImports.forEach((i: Record<string, unknown>) => imports.push(i));
    }

    if (FONT_ALIGNMENT) {
      const ALIGNMENT = FONT_ALIGNMENT.toLowerCase();
      css += `text-align: ${ALIGNMENT};\n`;
    }

    const FONT_CASE = (() => {
      if (textElement.type === 'TEXT') {
        if (textElement.style) {
          if (textElement.style.textCase) {
            if (textElement.style.textCase === 'LOWER') return 'lowercase';
            if (textElement.style.textCase === 'UPPER') return 'uppercase';
            if (textElement.style.textCase === 'TITLE') return 'capitalize';
          }
        }
      }
      return null;
    })();

    if (FONT_CASE) css += `text-transform: ${FONT_CASE};\n`;

    return { updatedCss: css, updatedImports: imports };
  } catch (error) {
    throw new Error(error);
  }
}
