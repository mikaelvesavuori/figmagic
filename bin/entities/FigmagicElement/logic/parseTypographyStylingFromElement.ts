import * as path from 'path';

import { FRAME as Frame } from '../../../contracts/Figma';
import { Imports, UpdatedCssAndImports } from '../../../contracts/Imports';
import { TypographyElement } from '../../../contracts/TypographyElement';
import { OutputFormatColors } from '../../../contracts/Config';
import { Color, FileOutput } from '../../../contracts/Parsing';
import { TokenMatchRaw } from '../../../contracts/TokenMatch';

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
  typographyElement: TypographyElement
): UpdatedCssAndImports {
  const {
    textElement,
    remSize,
    outputFormatTokens,
    outputFormatColors,
    letterSpacingUnit,
    outputFolderTokens,
    usePostscriptFontNames
  } = typographyElement;
  if (!textElement || !remSize) throw Error(ErrorParseTypographyStylingFromElement);

  const PATH = process.env.IS_TEST ? path.join('testdata', 'tokens') : outputFolderTokens;

  const { colors, fontFamilies, fontSizes, fontWeights, letterSpacings, lineHeights } = getFiles(
    PATH,
    outputFormatTokens
  );

  let css = ``;
  let imports: Imports[] = []; // TODO

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
      remSize,
      outputFormatColors,
      usePostscriptFontNames
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
}

const getFiles = (filePath: string, outputFormatTokens: string): FileOutput => {
  const colors = getFileContents(filePath, 'colors', outputFormatTokens);
  const fontFamilies = getFileContents(filePath, 'fontFamilies', outputFormatTokens);
  const fontSizes = getFileContents(filePath, 'fontSizes', outputFormatTokens);
  const fontWeights = getFileContents(filePath, 'fontWeights', outputFormatTokens);
  const letterSpacings = getFileContents(filePath, 'letterSpacings', outputFormatTokens);
  const lineHeights = getFileContents(filePath, 'lineHeights', outputFormatTokens);

  return {
    colors,
    fontFamilies,
    fontSizes,
    fontWeights,
    letterSpacings,
    lineHeights
  };
};

const reduceCssDuplicates = (css: string) =>
  Array.from(new Set(css.split(/;/gi)))
    .toString()
    .replace(/,\n/gi, ';\n');

const getFontColor = (textElement: Frame) => {
  if (textElement.fills) {
    if (textElement.fills[0] && textElement.fills[0].type === 'SOLID') {
      if (!textElement.fills[0].color) throw Error(ErrorGetFontColor);
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

const getFontFamily = (textElement: Frame, usePostscriptFontNames = false): string | null => {
  if (textElement.type === 'TEXT' && textElement.style)
    return usePostscriptFontNames
      ? textElement.style.fontPostScriptName
      : textElement.style.fontFamily;
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
  css: string;
  imports: Imports[];
  remSize: number;
  textElement: Frame;
  outputFormatColors: OutputFormatColors;
  usePostscriptFontNames: boolean;
};

function calcFontColor(calcData: CalcDataTypography, colors: Color) {
  const { textElement, remSize, outputFormatColors, imports } = calcData;
  let { css } = calcData;

  const FONT_COLOR = getFontColor(textElement);
  if (FONT_COLOR && colors) {
    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      'color',
      FONT_COLOR,
      remSize,
      outputFormatColors
    );
    css += updatedCss;
    updatedImports.forEach((i: Imports) => imports.push(i));
  }

  return { css, imports };
}

function calcFontSize(calcData: CalcDataTypography, fontSizes: Record<string, string>) {
  const { textElement, remSize, outputFormatColors, imports } = calcData;
  let { css } = calcData;

  const FONT_SIZE: number | null = getFontSize(textElement);
  if (FONT_SIZE && fontSizes) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontSizes,
      'fontSizes',
      'font-size',
      FONT_SIZE,
      remSize,
      outputFormatColors
    );
    css += updatedCss;
    updatedImports.forEach((i: Imports) => imports.push(i));
  }

  return { css, imports, fontSize: FONT_SIZE };
}

function calcFontFamily(
  calcData: CalcDataTypography,
  fontFamilies: Record<string, string>
): TokenMatchRaw {
  const { textElement, remSize, outputFormatColors, usePostscriptFontNames, imports } = calcData;
  let { css } = calcData;

  const FONT_FAMILY = getFontFamily(textElement, usePostscriptFontNames);
  if (FONT_FAMILY && fontFamilies) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontFamilies,
      'fontFamilies',
      'font-family',
      FONT_FAMILY,
      remSize,
      outputFormatColors
    );
    css += updatedCss;
    updatedImports.forEach((i: Imports) => imports.push(i));
  }

  return { css, imports };
}

function calcFontWeight(calcData: CalcDataTypography, fontWeights: Record<string, string>) {
  const { textElement, remSize, outputFormatColors, imports } = calcData;
  let { css } = calcData;

  const FONT_WEIGHT = getFontWeight(textElement);
  if (FONT_WEIGHT && fontWeights) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontWeights,
      'fontWeights',
      'font-weight',
      FONT_WEIGHT,
      remSize,
      outputFormatColors
    );
    css += updatedCss;
    updatedImports.forEach((i: Imports) => imports.push(i));
  }

  return { css, imports };
}

function calcFontLineHeight(
  calcData: CalcDataTypography,
  lineHeights: Record<string, string>
): TokenMatchRaw {
  const { textElement, remSize, outputFormatColors, imports } = calcData;
  let { css } = calcData;

  const FONT_LINE_HEIGHT = getFontLineHeight(textElement);
  if (FONT_LINE_HEIGHT && lineHeights) {
    const { updatedCss, updatedImports } = getTokenMatch(
      lineHeights,
      'lineHeights',
      'line-height',
      FONT_LINE_HEIGHT,
      remSize,
      outputFormatColors
    );
    css += updatedCss;
    updatedImports.forEach((i: Imports) => imports.push(i));
  }

  return { css, imports };
}

function calcLetterSpacing(
  calcData: CalcDataTypography,
  letterSpacings: Record<string, string>,
  letterSpacingUnit: string,
  fontSize: number | null
): TokenMatchRaw {
  const { textElement, remSize, outputFormatColors, imports } = calcData;
  let { css } = calcData;

  const LETTER_SPACING: number | null = getFontLetterSpacing(textElement);
  if (LETTER_SPACING && fontSize && letterSpacings) {
    const SIZE = LETTER_SPACING / fontSize;
    const SIZE_STRING = `${SIZE}${letterSpacingUnit}`;

    const { updatedCss, updatedImports } = getTokenMatch(
      letterSpacings,
      'letterSpacings',
      'letter-spacing',
      SIZE_STRING,
      remSize,
      outputFormatColors
    );
    css += updatedCss;
    updatedImports.forEach((i: Imports) => imports.push(i));
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
