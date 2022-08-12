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

  const tokenPath = process.env.IS_TEST ? path.join('testdata', 'tokens') : outputFolderTokens;

  const { colors, fontFamilies, fontSizes, fontWeights, letterSpacings, lineHeights } = getFiles(
    tokenPath,
    outputFormatTokens
  );

  let css = ``;
  let imports: Imports[] = []; // TODO

  const fontColor = calcFontColor(
    { textElement, css, imports, remSize } as CalcDataTypography,
    colors
  );
  css = fontColor.css;
  imports = fontColor.imports;

  const calcedFontSize = calcFontSize(
    { textElement, css, imports, remSize } as CalcDataTypography,
    fontSizes
  );
  css = calcedFontSize.css;
  imports = calcedFontSize.imports;

  const fontSize = calcedFontSize.fontSize;

  const fontFamily = calcFontFamily(
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
  css = fontFamily.css;
  imports = fontFamily.imports;

  const fontWeight = calcFontWeight(
    {
      textElement,
      css,
      imports,
      remSize
    } as CalcDataTypography,
    fontWeights
  );
  css = fontWeight.css;
  imports = fontWeight.imports;

  const fontLineHeight = calcFontLineHeight(
    {
      textElement,
      css,
      imports,
      remSize
    } as CalcDataTypography,
    lineHeights
  );
  css = fontLineHeight.css;
  imports = fontLineHeight.imports;

  const fontLetterSpacing = calcLetterSpacing(
    { textElement, css, imports, remSize } as CalcDataTypography,
    letterSpacings,
    letterSpacingUnit,
    fontSize
  );
  css = fontLetterSpacing.css;
  imports = fontLetterSpacing.imports;

  css = calcFontAlignment({
    textElement,
    css,
    imports,
    remSize
  } as CalcDataTypography);

  css = calcFontCase({ textElement, css, imports, remSize } as CalcDataTypography);

  const updatedCss = reduceCssDuplicates(css);

  return { updatedCss, updatedImports: imports };
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

  const fontSize: number | null = getFontSize(textElement);
  if (fontSize && fontSizes) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontSizes,
      'fontSizes',
      'font-size',
      fontSize,
      remSize,
      outputFormatColors
    );
    css += updatedCss;
    updatedImports.forEach((i: Imports) => imports.push(i));
  }

  return { css, imports, fontSize };
}

function calcFontFamily(
  calcData: CalcDataTypography,
  fontFamilies: Record<string, string>
): TokenMatchRaw {
  const { textElement, remSize, outputFormatColors, usePostscriptFontNames, imports } = calcData;
  let { css } = calcData;

  const fontFamily = getFontFamily(textElement, usePostscriptFontNames);
  if (fontFamily && fontFamilies) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontFamilies,
      'fontFamilies',
      'font-family',
      fontFamily,
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

  const fontWeight = getFontWeight(textElement);
  if (fontWeight && fontWeights) {
    const { updatedCss, updatedImports } = getTokenMatch(
      fontWeights,
      'fontWeights',
      'font-weight',
      fontWeight,
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

  const fontLineHeight = getFontLineHeight(textElement);
  if (fontLineHeight && lineHeights) {
    const { updatedCss, updatedImports } = getTokenMatch(
      lineHeights,
      'lineHeights',
      'line-height',
      fontLineHeight,
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

  const letterSpacing: number | null = getFontLetterSpacing(textElement);
  if (letterSpacing && fontSize && letterSpacings) {
    const size = letterSpacing / fontSize;
    const sizeString = `${size}${letterSpacingUnit}`;

    const { updatedCss, updatedImports } = getTokenMatch(
      letterSpacings,
      'letterSpacings',
      'letter-spacing',
      sizeString,
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

  const fontAlignment = getFontAlignment(textElement);
  if (fontAlignment) {
    const alignment = fontAlignment.toLowerCase();
    css += `text-align: ${alignment};\n`;
  }

  return css;
}

function calcFontCase(calcData: CalcDataTypography) {
  const { textElement } = calcData;
  let { css } = calcData;

  const fontCase = getFontCase(textElement);
  if (fontCase) css += `text-transform: ${fontCase};\n`;

  return css;
}
