import * as path from 'path';

import { FRAME as Frame } from '../../../contracts/Figma';
import { UpdatedCssAndImports } from '../../../contracts/Imports';

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
  try {
    if (!layoutElement || !remSize || !outputFormatToken || !outputFolderTokens)
      throw new Error(ErrorParseCssFromElement);

    const PATH = process.env.IS_TEST ? path.join(`testdata`, `tokens`) : outputFolderTokens;
    const { borderWidths, colors, radii, shadows, spacing } = getFiles(PATH, outputFormatToken);

    // Add defaults
    let css = `width: 100%;\nbox-sizing: border-box;\nborder: 0;\nborder-style: solid;\n`;

    // Assume all images are full bleed
    if (layoutElement.fills && layoutElement.fills.some((fill) => fill['type'] === 'IMAGE'))
      css += `object-fit: cover;\n`;

    let imports: any = [];

    const padding = calcPadding(
      { textElement, layoutElement, css, imports, remSize } as CalcData,
      spacing
    );
    css = padding.css;
    imports = padding.imports;

    const height = calcHeight({ layoutElement, css, imports, remSize } as CalcData, spacing);
    css = height.css;
    imports = height.imports;

    const bgColor = calcBackgroundColor(
      { layoutElement, css, imports, remSize } as CalcData,
      colors
    );
    css = bgColor.css;
    imports = bgColor.imports;

    const borderWidth = calcBorderWidth(
      { layoutElement, css, imports, remSize } as CalcData,
      borderWidths
    );
    css = borderWidth.css;
    imports = borderWidth.imports;

    const borderColor = calcBorderColor(
      { layoutElement, css, imports, remSize } as CalcData,
      colors
    );
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
  } catch (error: any) {
    throw new Error(error);
  }
}

type CalcData = {
  textElement?: Frame;
  layoutElement: Frame;
  css: string;
  imports: string[];
  remSize: number;
};

const reduceDuplicates = (str: string) =>
  Array.from(new Set(str.split(/;/gi)))
    .toString()
    .replace(/,\n/gi, ';\n');

const getFiles = (filePath: string, outputFormatToken: string): any => {
  try {
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
  } catch (error: any) {
    throw new Error(error);
  }
};

function calcPadding(calcData: CalcData, spacing: Record<string, unknown>) {
  const { textElement, layoutElement, remSize } = calcData;
  let { css, imports } = calcData;

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

  return { css, imports };
}

function calcHeight(calcData: CalcData, spacing: Record<string, unknown>) {
  const { layoutElement, remSize } = calcData;
  let { css, imports } = calcData;

  const HEIGHT = layoutElement.absoluteBoundingBox
    ? layoutElement.absoluteBoundingBox.height
    : null;
  if (HEIGHT) {
    const parsedValue = parseHeight(css, imports, { spacing, height: HEIGHT, remSize });
    css += parsedValue.css;
    if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
  }

  return { css, imports };
}

function calcBackgroundColor(calcData: CalcData, colors: Record<string, unknown>) {
  const { layoutElement, remSize } = calcData;
  let { css, imports } = calcData;

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

  return { css, imports };
}

function calcBorderWidth(calcData: CalcData, borderWidths: Record<string, unknown>) {
  const { layoutElement, remSize } = calcData;
  let { css, imports } = calcData;

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

  return { css, imports };
}

function calcBorderColor(calcData: CalcData, colors: Record<string, unknown>) {
  const { layoutElement, remSize } = calcData;
  let { css, imports } = calcData;

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

  return { css, imports };
}

function calcBorderRadius(calcData: CalcData, radii: Record<string, unknown>) {
  const { layoutElement, remSize } = calcData;
  let { css, imports } = calcData;

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

  return { css, imports };
}

function calcShadows(calcData: CalcData, shadows: Record<string, unknown>) {
  const { layoutElement, remSize } = calcData;
  let { css, imports } = calcData;

  const SHADOW = getShadow(layoutElement);
  if (SHADOW) {
    const parsedValue = parseShadow(css, imports, { shadows, shadow: SHADOW, remSize });
    css += parsedValue.css;
    if (parsedValue.imports) imports = imports.concat(parsedValue.imports);
  }

  return { css, imports };
}
