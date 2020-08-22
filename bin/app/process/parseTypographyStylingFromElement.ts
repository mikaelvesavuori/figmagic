import * as path from 'path';

import { roundColorValue } from '../helpers/roundColorValue';
import { getTokenMatch } from './getTokenMatch';

import { errorParseTypographyStylingFromElement } from '../../frameworks/errors/errors';

import { Element } from '../../entities/Element/Element';
import { FigmagicTypography } from '../../entities/FigmagicTypography/FigmagicTypography';

/**
 * @description Parse typography CSS from "element" (Figma component)
 *
 * @param element Figma object representation of element/component
 * @param remSize HTML body REM size
 * @param isTest Check if this is test, in which case tokens need to be imported from a stable source
 */
export async function parseTypographyStylingFromElement(
  element: Element,
  remSize: number,
  isTest: boolean = false
): Promise<FigmagicTypography> {
  if (!element || !remSize) throw new Error(errorParseTypographyStylingFromElement);

  // Dynamic imports
  const PATH = isTest ? path.join('testdata', 'tokens') : `tokens`;

  const _colors = await import(path.join(`${process.cwd()}`, `${PATH}`, `colors.ts`));
  const colors = _colors.default;
  const _fontFamilies = await import(path.join(`${process.cwd()}`, `${PATH}`, `fontFamilies.ts`));
  const fontFamilies = _fontFamilies.default;
  const _fontSizes = await import(path.join(`${process.cwd()}`, `${PATH}`, `fontSizes.ts`));
  const fontSizes = _fontSizes.default;
  const _fontWeights = await import(path.join(`${process.cwd()}`, `${PATH}`, `fontWeights.ts`));
  const fontWeights = _fontWeights.default;
  const _letterSpacings = await import(
    path.join(`${process.cwd()}`, `${PATH}`, `letterSpacings.ts`)
  );
  const letterSpacings = _letterSpacings.default;
  const _lineHeights = await import(path.join(`${process.cwd()}`, `${PATH}`, `lineHeights.ts`));
  const lineHeights = _lineHeights.default;

  let css = ``;
  let imports = [];

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
    updatedImports.forEach((i) => imports.push(i));
  }

  const FONT_SIZE: number | null = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return parseFloat(element.style.fontSize);
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
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.fontPostScriptName; //fontFamily;
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
    updatedImports.forEach((i) => imports.push(i));
  }

  const FONT_WEIGHT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.fontWeight;
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
    updatedImports.forEach((i) => imports.push(i));
  }

  const FONT_LINE_HEIGHT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        if (element.style.lineHeightPercentFontSize) {
          return element.style.lineHeightPercentFontSize / 100;
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
    updatedImports.forEach((i) => imports.push(i));
  }

  const FONT_ALIGNMENT = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        return element.style.textAlignHorizontal;
      }
    }
    return null;
  })();

  const LETTER_SPACING: number = (() => {
    if (element.type === 'TEXT') {
      if (element.style) {
        if (element.style.letterSpacing) {
          return parseFloat(element.style.letterSpacing);
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
    updatedImports.forEach((i) => imports.push(i));
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
    return null;
  })();

  if (FONT_CASE) css += `text-transform: ${FONT_CASE};\n`;

  return { css, imports };
}
