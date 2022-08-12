import * as path from 'path';

import { FRAME as Frame } from '../../../contracts/Figma';
import { Imports, UpdatedCssAndImports } from '../../../contracts/Imports';
import { OutputFormatColors } from '../../../contracts/Config';
import { Color } from '../../../contracts/Parsing';
import { FileContents } from '../../../contracts/Files';

import { getFileContents } from './getFileContents';
import { getPaddingY, PaddingVertical } from './parsers/getPaddingY';
import { getPaddingX, PaddingHorizontal } from './parsers/getPaddingX';
import { parsePadding } from './parsers/parsePadding';
import { parseHeight } from './parsers/parseHeight';
import { getBackgroundColor } from './parsers/getBackgroundColor';
import { parseBackgroundColor } from './parsers/parseBackgroundColor';
import { parseBorderWidth } from './parsers/parseBorderWidth';
import { getBorderColor } from './parsers/getBorderColor';
import { parseBorderColor } from './parsers/parseBorderColor';
import { parseBorderRadius } from './parsers/parseBorderRadius';
import { getShadow } from './parsers/getShadow';
import { parseShadow } from './parsers/parseShadow';

import { ErrorParseCssFromElement } from '../../../frameworks/errors/errors';

/**
 * @description Parse layout CSS from "element" (Figma component)
 */
export function parseCssFromElement(
  layoutElement: Frame,
  textElement: Frame | null,
  remSize: number,
  outputFormatToken: string,
  outputFolderTokens: string
): UpdatedCssAndImports {
  if (!layoutElement || !remSize || !outputFormatToken || !outputFolderTokens)
    throw Error(ErrorParseCssFromElement);

  const tokenPath = process.env.IS_TEST ? path.join(`testdata`, `tokens`) : outputFolderTokens;
  const { borderWidths, colors, radii, shadows, spacing } = getFiles(tokenPath, outputFormatToken);

  // Add defaults
  let css = `width: 100%;\nbox-sizing: border-box;\nborder: 0;\nborder-style: solid;\n`;

  // Assume all images are full bleed
  if (layoutElement.fills && layoutElement.fills.some((fill) => fill['type'] === 'IMAGE'))
    css += `object-fit: cover;\n`;

  let imports: Imports[] = [];

  const padding = calcPadding(
    { textElement, layoutElement, css, imports, remSize } as CalcData,
    spacing
  );
  css = padding.css;
  imports = padding.imports;

  const height = calcHeight({ layoutElement, css, imports, remSize } as CalcData, spacing);
  css = height.css;
  imports = height.imports;

  const bgColor = calcBackgroundColor({ layoutElement, css, imports, remSize } as CalcData, colors);
  css = bgColor.css;
  imports = bgColor.imports;

  const borderWidth = calcBorderWidth(
    { layoutElement, css, imports, remSize } as CalcData,
    borderWidths
  );
  css = borderWidth.css;
  imports = borderWidth.imports;

  const borderColor = calcBorderColor({ layoutElement, css, imports, remSize } as CalcData, colors);
  css = borderColor.css;
  imports = borderColor.imports;

  const borderRadius = calcBorderRadius(
    { layoutElement, css, imports, remSize } as CalcData,
    radii
  );
  css = borderRadius.css;
  imports = borderRadius.imports;

  const shadow = calcShadows({ layoutElement, css, imports, remSize } as CalcData, shadows);
  css = shadow.css;
  imports = shadow.imports;

  const NEW_CSS = reduceDuplicates(css);
  return { updatedCss: NEW_CSS, updatedImports: imports };
}

type CalcData = {
  textElement?: Frame;
  layoutElement: Frame;
  css: string;
  imports: Imports[];
  remSize: number;
  outputFormatColors: OutputFormatColors;
};

const reduceDuplicates = (str: string) =>
  Array.from(new Set(str.split(/;/gi)))
    .toString()
    .replace(/,\n/gi, ';\n');

const getFiles = (filePath: string, outputFormatToken: string): FileContents => {
  const borderWidths = getFileContents(filePath, 'borderWidths', outputFormatToken);
  const colors = getFileContents(filePath, 'colors', outputFormatToken);
  const radii = getFileContents(filePath, 'radii', outputFormatToken);
  const shadows = getFileContents(filePath, 'shadows', outputFormatToken);
  const spacing = getFileContents(filePath, 'spacing', outputFormatToken);

  return {
    borderWidths,
    colors,
    radii,
    shadows,
    spacing
  };
};

function calcPadding(calcData: CalcData, spacing: Record<string, string>) {
  const { textElement, layoutElement, remSize } = calcData;
  let { css, imports } = calcData;

  const paddingY: PaddingVertical | null = textElement
    ? getPaddingY(textElement, layoutElement)
    : null;
  const paddingX: PaddingHorizontal | null = textElement
    ? getPaddingX(textElement, layoutElement)
    : null;

  if (paddingY && paddingX) {
    const padding = {
      ...paddingY,
      ...paddingX
    };

    const parsedPadding = parsePadding(css, imports, {
      padding,
      spacing,
      remSize
    });

    css += parsedPadding.css;
    if (parsedPadding.imports) imports = imports.concat(parsedPadding.imports);
  }

  return { css, imports };
}

function calcHeight(calcData: CalcData, spacing: Record<string, string>) {
  const { layoutElement, remSize, outputFormatColors } = calcData;
  let { css, imports } = calcData;

  const height = layoutElement.absoluteBoundingBox
    ? layoutElement.absoluteBoundingBox.height
    : null;
  if (height) {
    const parsedValue = parseHeight(css, imports, {
      spacing,
      height,
      remSize,
      outputFormatColors
    });
    css += parsedValue.css;
    if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
  }

  return { css, imports };
}

function calcBackgroundColor(calcData: CalcData, colors: Color) {
  const { layoutElement, remSize, outputFormatColors } = calcData;
  let { css, imports } = calcData;

  const backgroundColor = getBackgroundColor(layoutElement, outputFormatColors);
  if (backgroundColor) {
    const parsedValue = parseBackgroundColor(css, imports, {
      colors,
      backgroundColor,
      remSize,
      outputFormatColors
    });
    css += parsedValue.css;
    if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
  }

  return { css, imports };
}

function calcBorderWidth(calcData: CalcData, borderWidths: Record<string, string>) {
  const { layoutElement, remSize, outputFormatColors } = calcData;
  let { css, imports } = calcData;

  const borderWidth = layoutElement.strokeWeight ? `${layoutElement.strokeWeight}px` : null;
  if (borderWidth) {
    const parsedValue = parseBorderWidth(css, imports, {
      borderWidths,
      borderWidth,
      remSize,
      outputFormatColors
    });
    css += parsedValue.css;
    if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
  }

  return { css, imports };
}

function calcBorderColor(calcData: CalcData, colors: Color) {
  const { layoutElement, remSize, outputFormatColors } = calcData;
  let { css, imports } = calcData;

  const borderColor = getBorderColor(layoutElement);
  if (borderColor) {
    const parsedValue = parseBorderColor(css, imports, {
      colors,
      borderColor,
      remSize,
      outputFormatColors
    });
    css += parsedValue.css;
    if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
  }

  return { css, imports };
}

function calcBorderRadius(calcData: CalcData, radii: Record<string, string>) {
  const { layoutElement, remSize, outputFormatColors } = calcData;
  let { css, imports } = calcData;

  const borderRadius = layoutElement.cornerRadius ? `${layoutElement.cornerRadius}px` : null;
  if (borderRadius) {
    const parsedValue = parseBorderRadius(css, imports, {
      radii,
      borderRadius,
      remSize,
      outputFormatColors
    });
    css += parsedValue.css;
    if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
  }

  return { css, imports };
}

function calcShadows(calcData: CalcData, shadows: Record<string, string>) {
  const { layoutElement, remSize, outputFormatColors } = calcData;
  let { css, imports } = calcData;

  const shadow = getShadow(layoutElement);
  if (shadow) {
    const parsedValue = parseShadow(css, imports, {
      shadows,
      shadow,
      remSize,
      outputFormatColors
    });
    css += parsedValue.css;
    if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
  }

  return { css, imports };
}
