import { FRAME as Frame } from '../../../contracts/Figma';
import { ParsedElementMetadataInterface } from '../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from './getTokenMatch';

import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import {
  ErrorGetPaddingX,
  ErrorGetPaddingY,
  ErrorParseHeight,
  ErrorParsePadding,
  ErrorGetBackgroundColor,
  ErrorParseBackgroundColor,
  ErrorParseBorderWidth,
  ErrorGetBorderColor,
  ErrorParseBorderColor,
  ErrorParseBorderRadius,
  ErrorGetShadow,
  ErrorParseShadow,
  ErrorUpdateParsing
} from '../../../frameworks/errors/errors';

export type PaddingVertical = {
  top: number;
  bottom: number;
};

export function getPaddingY(textElement: Frame, element: Frame): PaddingVertical | null {
  try {
    if (!textElement) return null;
    if (
      !element.absoluteBoundingBox ||
      !element.absoluteBoundingBox.height ||
      !textElement.absoluteBoundingBox ||
      !textElement.absoluteBoundingBox.height
    )
      throw new Error(ErrorGetPaddingY);

    const PARENT_HEIGHT = element.absoluteBoundingBox.height;
    const TEXT_HEIGHT = textElement.absoluteBoundingBox.height;
    // @ts-ignore
    const PADDING_TOP = textElement.absoluteBoundingBox.y - element.absoluteBoundingBox.y;
    const PADDING_BOTTOM = PARENT_HEIGHT - (PADDING_TOP + TEXT_HEIGHT);

    return {
      top: Math.round(PADDING_TOP),
      bottom: Math.round(PADDING_BOTTOM)
    };
  } catch (error) {
    throw new Error(ErrorGetPaddingY);
  }
}

export type PaddingHorizontal = {
  left: number;
  right: number;
};

export function getPaddingX(textElement: Frame, element: Frame): PaddingHorizontal | null {
  try {
    if (!textElement || !element) return null;

    if (!textElement.absoluteBoundingBox || !element.absoluteBoundingBox)
      throw new Error(ErrorGetPaddingX);

    // TODO: Fix this
    // @ts-ignore
    const PARENT_WIDTH = element.absoluteBoundingBox.width;
    // @ts-ignore
    const TEXT_WIDTH = textElement.absoluteBoundingBox.width;
    // @ts-ignore
    const PADDING_LEFT = textElement.absoluteBoundingBox.x - element.absoluteBoundingBox.x;
    // @ts-ignore
    const PADDING_RIGHT = PARENT_WIDTH - (PADDING_LEFT + TEXT_WIDTH);

    return {
      left: Math.round(PADDING_LEFT),
      right: Math.round(PADDING_RIGHT)
    };
  } catch (error) {
    throw new Error(ErrorGetPaddingX);
  }
}

type PaddingParams = {
  padding: Record<string, unknown>;
  spacing: Record<string, unknown>;
  remSize: number;
};

export function parsePadding(
  css: string,
  imports: any[],
  params: PaddingParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParsePadding);
    const { padding, spacing, remSize } = params;

    if (!(padding && Object.keys(padding).length > 0)) return { css, imports };

    const PADDINGS = Object.values(padding).map((p) => p);
    if (PADDINGS.every((item) => item === 0)) return updateParsing(css, null, imports, null);

    const { updatedCss, updatedImports } = getTokenMatch(
      spacing,
      'spacing',
      'padding',
      padding,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(ErrorParsePadding);
  }
}

type HeightParams = {
  spacing: Record<string, unknown>;
  height: number;
  remSize: number;
};

export function parseHeight(
  css: string,
  imports: any[],
  params: HeightParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseHeight);
    const { spacing, height, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      spacing,
      'spacing',
      'height',
      height,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(ErrorParseHeight);
  }
}

export function getBackgroundColor(element: Frame): any {
  if (!element) throw new Error(ErrorGetBackgroundColor);
  if (!element.fills) return null;

  const fills = element.fills.filter((f) => f.type === 'SOLID');

  if (fills.length > 0) {
    if (!fills[0].color) throw new Error(ErrorGetBackgroundColor);
    const R = roundColorValue(fills[0].color.r);
    const G = roundColorValue(fills[0].color.g);
    const B = roundColorValue(fills[0].color.b);
    const A = roundColorValue(fills[0].color.a, 1);
    return `rgba(${R}, ${G}, ${B}, ${A})`;
  }

  // Check for linear gradient fills
  // We will check for this only after checking that no solid fill color exists
  const gradients = element.fills.filter((f) => f.type === 'GRADIENT_LINEAR');

  if (fills.length === 0 && gradients.length > 0) {
    let str = `linear-gradient(`;

    const GRADIENT_STOPS = gradients[0].gradientStops ? gradients[0].gradientStops : null;
    if (!GRADIENT_STOPS) throw new Error();

    GRADIENT_STOPS.forEach((fill, index) => {
      const R = roundColorValue(fill.color.r, 255);
      const G = roundColorValue(fill.color.g, 255);
      const B = roundColorValue(fill.color.b, 255);
      const A = roundColorValue(fill.color.a, 255);
      const POS = roundColorValue(fill.position, 100);

      if (index > 0) str += ` `;
      str += `rgba(${R}, ${G}, ${B}, ${A}) ${POS}%`;
      if (index < GRADIENT_STOPS.length - 1) str += `,`;
      if (index >= GRADIENT_STOPS.length - 1) str += `)`;
    });

    return str;
  }

  return null;
}

type BackgroundColorParams = {
  colors: Record<string, unknown>;
  backgroundColor: string;
  remSize: number;
};

export function parseBackgroundColor(
  css: string,
  imports: any[],
  params: BackgroundColorParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseBackgroundColor);

    const { colors, backgroundColor, remSize } = params;

    const PROPERTY = backgroundColor.includes('gradient') ? 'background' : 'background-color';

    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      PROPERTY,
      backgroundColor,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(ErrorParseBackgroundColor);
  }
}

type BorderWidthParams = {
  borderWidths: Record<string, unknown>;
  borderWidth: string;
  remSize: number;
};

export function parseBorderWidth(
  css: string,
  imports: any[],
  params: BorderWidthParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseBorderWidth);
    const { borderWidths, borderWidth, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      borderWidths,
      'borderWidths',
      'border-width',
      borderWidth,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(ErrorParseBorderWidth);
  }
}

export function getBorderColor(element: Frame): string | null {
  if (!element) throw new Error(ErrorGetBorderColor);
  if (!(element.strokes && element.strokes.length > 0 && element.strokes[0].type === 'SOLID'))
    return null;

  if (!element.strokes[0].color) throw new Error('asdf');
  const R = roundColorValue(element.strokes[0].color.r);
  const G = roundColorValue(element.strokes[0].color.g);
  const B = roundColorValue(element.strokes[0].color.b);
  const A = roundColorValue(element.strokes[0].color.a, 1);
  return `rgba(${R}, ${G}, ${B}, ${A})`;
}

type BorderColorParams = {
  colors: Record<string, unknown>;
  borderColor: string;
  remSize: number;
};

export function parseBorderColor(
  css: string,
  imports: any[],
  params: BorderColorParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseBorderColor);

    const { colors, borderColor, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      'border-color',
      borderColor,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(ErrorParseBorderColor);
  }
}

type BorderRadiusParams = {
  radii: Record<string, unknown>;
  borderRadius: string;
  remSize: number;
};

export function parseBorderRadius(
  css: string,
  imports: any[],
  params: BorderRadiusParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseBorderRadius);

    const { radii, borderRadius, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      radii,
      'radii',
      'border-radius',
      borderRadius,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(ErrorParseBorderRadius);
  }
}

export function getShadow(element: Frame): string | null {
  try {
    if (!element) throw new Error(ErrorGetShadow);
    if (!(element.effects && element.effects[0] && element.effects[0].type === 'DROP_SHADOW'))
      return null;

    const DROP_SHADOW = element.effects[0];

    const X = DROP_SHADOW.offset.x;
    const Y = DROP_SHADOW.offset.y;
    const RADIUS = DROP_SHADOW.radius;
    const R = roundColorValue(DROP_SHADOW.color.r);
    const G = roundColorValue(DROP_SHADOW.color.g);
    const B = roundColorValue(DROP_SHADOW.color.b);
    const A = roundColorValue(DROP_SHADOW.color.a, 1);

    return `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
  } catch (error) {
    throw new Error(ErrorGetShadow);
  }
}

type ShadowParams = {
  shadows: Record<string, unknown>;
  shadow: string;
  remSize: number;
};

export function parseShadow(
  css: string,
  imports: any[],
  params: ShadowParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseShadow);

    const { shadows, shadow, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      shadows,
      'shadows',
      'box-shadow',
      shadow,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(ErrorParseShadow);
  }
}

export function updateParsing(
  css: string,
  updatedCss: string | null,
  imports: any[],
  updatedImports: any[] | null
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports) throw new Error(ErrorUpdateParsing);

    const CSS = updatedCss ? (css += updatedCss) : css;
    const IMPORTS = updatedImports ? updatedImports.forEach((i) => imports.push(i)) : imports;

    return { css: CSS, imports: IMPORTS };
  } catch (error) {
    throw new Error(ErrorUpdateParsing);
  }
}
