import { FRAME as Frame } from '../../../contracts/Figma';
import { TextElement } from '../../../contracts/TextElement';
import { ParsedElementMetadataInterface } from '../../../contracts/ParsedElementMetadataInterface';

import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import { getTokenMatch } from './getTokenMatch';

export type PaddingVertical = {
  top: number;
  bottom: number;
};

/**
 * @description Get vertical paddings
 *
 * @param textElement The Text element
 * @param element The element
 */
export function getPaddingY(textElement: TextElement, element: Frame): PaddingVertical | null {
  try {
    if (!textElement) return null;
    if (
      !element.absoluteBoundingBox ||
      !element.absoluteBoundingBox.height ||
      !element.absoluteBoundingBox.y ||
      !textElement.absoluteBoundingBox.height ||
      !textElement.absoluteBoundingBox.y
    )
      throw new Error('asdf'); // TODO: add real error

    const PARENT_HEIGHT = element.absoluteBoundingBox.height;
    const TEXT_HEIGHT = textElement.absoluteBoundingBox.height;
    const PADDING_TOP = textElement.absoluteBoundingBox.y - element.absoluteBoundingBox.y;
    const PADDING_BOTTOM = PARENT_HEIGHT - (PADDING_TOP + TEXT_HEIGHT);

    return {
      top: Math.round(PADDING_TOP),
      bottom: Math.round(PADDING_BOTTOM)
    };
  } catch (error) {
    throw new Error(error);
  }
}

export type PaddingHorizontal = {
  left: number;
  right: number;
};

/**
 * @description Get horizontal paddings
 *
 * @param textElement The Text element
 * @param element The element
 */
export function getPaddingX(textElement: TextElement, element: Frame): PaddingHorizontal | null {
  try {
    if (!textElement) return null;

    if (
      !element.absoluteBoundingBox ||
      !element.absoluteBoundingBox.width ||
      !element.absoluteBoundingBox.x ||
      !textElement.absoluteBoundingBox.width ||
      !textElement.absoluteBoundingBox.x
    )
      throw new Error('asdf'); // TODO: add real error

    const PARENT_WIDTH = element.absoluteBoundingBox.width;
    const TEXT_WIDTH = textElement.absoluteBoundingBox.width;
    const PADDING_LEFT = textElement.absoluteBoundingBox.x - element.absoluteBoundingBox.x;
    const PADDING_RIGHT = PARENT_WIDTH - (PADDING_LEFT + TEXT_WIDTH);

    return {
      left: Math.round(PADDING_LEFT),
      right: Math.round(PADDING_RIGHT)
    };
  } catch (error) {
    throw new Error(error);
  }
}

type PaddingParams = {
  padding: Record<string, unknown>;
  spacing: Record<string, unknown>;
  remSize: number;
};

/**
 * @description TODO
 *
 * @param css CSS as string
 * @param imports Array of imports
 */
export function parsePadding(
  css: string,
  imports: any[],
  params: PaddingParams
): ParsedElementMetadataInterface {
  try {
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
    throw new Error(error);
  }
}

type HeightParams = {
  spacing: Record<string, unknown>;
  height: number;
  remSize: number;
};

/**
 * @description TODO
 *
 * @param css CSS as string
 * @param imports Array of imports
 */
export function parseHeight(
  css: string,
  imports: any[],
  params: HeightParams
): ParsedElementMetadataInterface {
  try {
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
    throw new Error(error);
  }
}

/**
 * @description Check for background color property. Prioritize solid color, then linear gradient. Expect only one value, and do so by only ever using the first fill match
 */
// TODO: Fix this
export function getBackgroundColor(element: Frame): any {
  if (!element.fills) return null;

  // Check for solid fills
  // A solid fill will always be #1 priority

  const fills = element.fills.filter((f) => f.type === 'SOLID');

  if (fills.length > 0) {
    if (!fills[0].color) throw new Error('asdf'); // TODO: Add real error
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

/**
 * @description TODO
 *
 * @param css
 * @param imports
 * @param params
 */
export function parseBackgroundColor(
  css: string,
  imports: any[],
  params: BackgroundColorParams
): ParsedElementMetadataInterface {
  try {
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
    throw new Error(error);
  }
}

type BorderWidthParams = {
  borderWidths: Record<string, unknown>;
  borderWidth: string;
  remSize: number;
};

/**
 * @description TODO
 *
 * @param css
 * @param imports
 * @param params
 */
export function parseBorderWidth(
  css: string,
  imports: any[],
  params: BorderWidthParams
): ParsedElementMetadataInterface {
  try {
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
    throw new Error(error);
  }
}

/**
 * @description TODO
 *
 * @param element
 */
export function getBorderColor(element: Frame): string | null {
  if (!(element.strokes && element.strokes.length > 0 && element.strokes[0].type === 'SOLID'))
    return null;

  if (!element.strokes[0].color) throw new Error('asdf'); // TODO: add real error
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

/**
 * @description TODO
 *
 * @param css
 * @param imports
 * @param params
 */
export function parseBorderColor(
  css: string,
  imports: any[],
  params: BorderColorParams
): ParsedElementMetadataInterface {
  try {
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
    throw new Error(error);
  }
}

type BorderRadiusParams = {
  radii: Record<string, unknown>;
  borderRadius: string;
  remSize: number;
};

/**
 * @description TODO
 */
export function parseBorderRadius(
  css: string,
  imports: any[],
  params: BorderRadiusParams
): ParsedElementMetadataInterface {
  try {
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
    throw new Error(error);
  }
}

/**
 * @description TODO
 *
 * @param element
 */
export function getShadow(element: Frame): string | null {
  try {
    if (!(element.effects && element.effects[0] && element.effects[0].type === 'DROP_SHADOW'))
      return null;

    const dropShadow = element.effects[0];

    const X = dropShadow.offset.x;
    const Y = dropShadow.offset.y;
    const RADIUS = dropShadow.radius;
    const R = roundColorValue(dropShadow.color.r);
    const G = roundColorValue(dropShadow.color.g);
    const B = roundColorValue(dropShadow.color.b);
    const A = roundColorValue(dropShadow.color.a, 1);

    return `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
  } catch (error) {
    throw new Error(error);
  }
}

type ShadowParams = {
  shadows: Record<string, unknown>;
  shadow: string;
  remSize: number;
};

/**
 * @description TODO
 *
 * @param css
 * @param imports
 * @param params
 */
export function parseShadow(
  css: string,
  imports: any[],
  params: ShadowParams
): ParsedElementMetadataInterface {
  try {
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
    throw new Error(error);
  }
}

/**
 * @description TODO
 *
 * @param css
 * @param updatedCss
 * @param imports
 * @param updatedImports
 */
function updateParsing(
  css: string,
  updatedCss: string | null,
  imports: any[],
  updatedImports: any[] | null
): ParsedElementMetadataInterface {
  try {
    const CSS = updatedCss ? (css += updatedCss) : css;
    const IMPORTS = updatedImports ? updatedImports.forEach((i) => imports.push(i)) : imports;

    // TODO: makeParsedElementMetadataInterface(CSS, IMPORTS)
    return { css: CSS, imports: IMPORTS };
  } catch (error) {
    throw new Error(error);
  }
}
