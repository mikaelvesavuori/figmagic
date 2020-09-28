import * as path from 'path';

import { FRAME as Frame } from '../../../contracts/Figma';
import { UpdatedCssAndImports } from '../../../contracts/Imports';

import { getTokenMatch } from './getTokenMatch';
import { getFileContents } from './getFileContents';

import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import {
  ErrorParseTypographyStylingFromElement,
  ErrorGetFontColor
} from '../../../frameworks/errors/errors';

/**
 * @description Parse typography CSS from "element" (Figma component)
 */
export function parseTypographyStylingFromElement(
  textElement: Frame,
  remSize: number,
  outputFormatTokens: string,
  letterSpacingUnit: string,
  outputFolderTokens: string
): UpdatedCssAndImports {
  try {
    if (!textElement || !remSize) throw new Error(ErrorParseTypographyStylingFromElement);

    const PATH = process.env.IS_TEST ? path.join('testdata', 'tokens') : outputFolderTokens;

    const { colors, fontFamilies, fontSizes, fontWeights, letterSpacings, lineHeights } = getFiles(
      PATH,
      outputFormatTokens
    );

    let css = ``;
    let imports: Record<string, unknown>[] = [];

    const FONT_COLOR = calcFontColor(
      { textElement, css, imports, remSize } as CalcDataTypography,
      colors
    );
    css = FONT_COLOR.css;
    imports = FONT_COLOR.imports;

    const FONT_SIZE = calcFontSize(
      { textElement, css, imports, remSize } as CalcDataTypography,
      fontSizes
    );
    css = FONT_SIZE.css;
    imports = FONT_SIZE.imports;

    const fontSize = FONT_SIZE.fontSize;

    const FONT_FAMILY = calcFontFamily(
      {
        textElement,
        css,
        imports,
        remSize
      } as CalcDataTypography,
      fontFamilies
    );
    css = FONT_FAMILY.css;
    imports = FONT_FAMILY.imports;

    const FONT_WEIGHT = calcFontWeight(
      {
        textElement,
        css,
        imports,
        remSize
      } as CalcDataTypography,
      fontWeights
    );
    css = FONT_WEIGHT.css;
    imports = FONT_WEIGHT.imports;

    const FONT_LINEHEIGHT = calcFontLineHeight(
      {
        textElement,
        css,
        imports,
        remSize
      } as CalcDataTypography,
      lineHeights
    );
    css = FONT_LINEHEIGHT.css;
    imports = FONT_LINEHEIGHT.imports;

    const FONT_LETTERSPACING = calcLetterSpacing(
      { textElement, css, imports, remSize } as CalcDataTypography,
      letterSpacings,
      letterSpacingUnit,
      fontSize
    );
    css = FONT_LETTERSPACING.css;
    imports = FONT_LETTERSPACING.imports;

    css = calcFontAlignment({
      textElement,
      css,
      imports,
      remSize
    } as CalcDataTypography);

    css = calcFontCase({ textElement, css, imports, remSize } as CalcDataTypography);

    const NEW_CSS = reduceCssDuplicates(css);

    return { updatedCss: NEW_CSS, updatedImports: imports };
  } catch (error) {
    throw new Error(ErrorParseTypographyStylingFromElement);
  }
}

const getFiles = (path: string, outputFormatTokens: string): any => {
  try {
    const colors = getFileContents(path, 'colors', outputFormatTokens);
    const fontFamilies = getFileContents(path, 'fontFamilies', outputFormatTokens);
    const fontSizes = getFileContents(path, 'fontSizes', outputFormatTokens);
    const fontWeights = getFileContents(path, 'fontWeights', outputFormatTokens);
    const letterSpacings = getFileContents(path, 'letterSpacings', outputFormatTokens);
    const lineHeights = getFileContents(path, 'lineHeights', outputFormatTokens);

    return {
      colors,
      fontFamilies,
      fontSizes,
      fontWeights,
      letterSpacings,
      lineHeights
    };
  } catch (error) {
    throw new Error(error);
  }
};

const reduceCssDuplicates = (css: string) =>
  Array.from(new Set(css.split(/;/gi)))
    .toString()
    .replace(/,/gi, ';');

const getFontColor = (textElement: Frame) => {
  if (textElement.fills) {
    if (textElement.fills[0] && textElement.fills[0].type === 'SOLID') {
      if (!textElement.fills[0].color) throw new Error(ErrorGetFontColor);
      const R = roundColorValue(textElement.fills[0].color.r);
      const G = roundColorValue(textElement.fills[0].color.g);
      const B = roundColorValue(textElement.fills[0].color.b);
      const A = roundColorValue(textElement.fills[0].color.a, 1);
      return `rgba(${R}, ${G}, ${B}, ${A})`;
    }
  }
  return null;
};

const getFontSize = (textElement: Frame): number | null => {
  if (textElement.type === 'TEXT' && textElement.style)
    return parseFloat(textElement.style.fontSize);
  return null;
};

const getFontFamily = (textElement: Frame): string | null => {
  if (textElement.type === 'TEXT' && textElement.style) return textElement.style.fontPostScriptName;
  return null;
};

const getFontWeight = (textElement: Frame): string | null => {
  if (textElement.type === 'TEXT' && textElement.style) return textElement.style.fontWeight;
  return null;
};

const getFontLineHeight = (textElement: Frame): number | null => {
  if (textElement.type === 'TEXT') {
    if (textElement.style) {
      if (textElement.style.lineHeightPercentFontSize) {
        return textElement.style.lineHeightPercentFontSize / 100;
      } else return 1.0;
    }
  }
  return null;
};

const getFontAlignment = (textElement: Frame): string | null => {
  if (textElement.type === 'TEXT' && textElement.style)
    return textElement.style.textAlignHorizontal;
  return null;
};

const getFontLetterSpacing = (textElement: Frame): number | null => {
  if (textElement.type === 'TEXT' && textElement.style && textElement.style.letterSpacing)
    return parseFloat(textElement.style.letterSpacing);
  return null;
};

const getFontCase = (textElement: Frame): string | null => {
  if (textElement.type === 'TEXT' && textElement.style && textElement.style.textCase) {
    if (textElement.style.textCase === 'LOWER') return 'lowercase';
    if (textElement.style.textCase === 'UPPER') return 'uppercase';
    if (textElement.style.textCase === 'TITLE') return 'capitalize';
  }
  return null;
};

type CalcDataTypography = {
  textElement: Frame;
  css: string;
  imports: Record<string, unknown>[];
  remSize: number;
};

function calcFontColor(calcData: CalcDataTypography, colors: any) {
  const { textElement, remSize, imports } = calcData;
  let { css } = calcData;

  const FONT_COLOR = getFontColor(textElement);
  if (FONT_COLOR) {
    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      'color',
      FONT_COLOR,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i: any) => imports.push(i));
  }

  return { css, imports };
}

function calcFontSize(calcData: CalcDataTypography, fontSizes: any) {
  const { textElement, remSize, imports } = calcData;
  let { css } = calcData;

  const FONT_SIZE: number | null = getFontSize(textElement);
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

  return { css, imports, fontSize: FONT_SIZE };
}

function calcFontFamily(calcData: CalcDataTypography, fontFamilies: any) {
  const { textElement, remSize, imports } = calcData;
  let { css } = calcData;

  const FONT_FAMILY = getFontFamily(textElement);
  if (FONT_FAMILY) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontFamilies,
      'fontFamilies',
      'font-family',
      FONT_FAMILY,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i: any) => imports.push(i));
  }

  return { css, imports };
}

function calcFontWeight(calcData: CalcDataTypography, fontWeights: any) {
  const { textElement, remSize, imports } = calcData;
  let { css } = calcData;

  const FONT_WEIGHT = getFontWeight(textElement);
  if (FONT_WEIGHT) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontWeights,
      'fontWeights',
      'font-weight',
      FONT_WEIGHT,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i: any) => imports.push(i));
  }

  return { css, imports };
}

function calcFontLineHeight(calcData: CalcDataTypography, lineHeights: any) {
  const { textElement, remSize, imports } = calcData;
  let { css } = calcData;

  const FONT_LINE_HEIGHT = getFontLineHeight(textElement);
  if (FONT_LINE_HEIGHT) {
    const { updatedCss, updatedImports } = getTokenMatch(
      lineHeights,
      'lineHeights',
      'line-height',
      FONT_LINE_HEIGHT,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i: any) => imports.push(i));
  }

  return { css, imports };
}

function calcLetterSpacing(
  calcData: CalcDataTypography,
  letterSpacings: any,
  letterSpacingUnit: string,
  fontSize: number | null
) {
  const { textElement, remSize, imports } = calcData;
  let { css } = calcData;

  const LETTER_SPACING: number | null = getFontLetterSpacing(textElement);
  if (LETTER_SPACING && fontSize) {
    const SIZE = LETTER_SPACING / fontSize;
    const SIZE_STRING = `${SIZE}${letterSpacingUnit}`;

    const { updatedCss, updatedImports } = getTokenMatch(
      letterSpacings,
      'letterSpacings',
      'letter-spacing',
      SIZE_STRING,
      remSize
    );
    css += updatedCss;
    updatedImports.forEach((i: any) => imports.push(i));
  }

  return { css, imports };
}

function calcFontAlignment(calcData: CalcDataTypography) {
  const { textElement } = calcData;
  let { css } = calcData;

  const FONT_ALIGNMENT = getFontAlignment(textElement);
  if (FONT_ALIGNMENT) {
    const ALIGNMENT = FONT_ALIGNMENT.toLowerCase();
    css += `text-align: ${ALIGNMENT};\n`;
  }

  return css;
}

function calcFontCase(calcData: CalcDataTypography) {
  const { textElement } = calcData;
  let { css } = calcData;

  const FONT_CASE = getFontCase(textElement);
  if (FONT_CASE) css += `text-transform: ${FONT_CASE};\n`;

  return css;
}
