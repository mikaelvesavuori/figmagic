import { FRAME as Frame } from '../../../contracts/Figma';
import { ColorTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import {
  ErrorMakeColorTokensNoFrame,
  ErrorMakeColorTokensNoChildren,
  ErrorMakeColorTokensNoFills
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma color frames into a clean object
 */
export function makeColorTokens(colorFrame: Frame): ColorTokens {
  if (!colorFrame) throw new Error(ErrorMakeColorTokensNoFrame);
  if (!colorFrame.children) throw new Error(ErrorMakeColorTokensNoChildren);

  const colors: Record<string, unknown> = {};
  const TOKENS = colorFrame.children;
  TOKENS.forEach((item: Frame) => makeColorToken(item, colors));

  return colors;
}

function makeColorToken(item: Frame, colors: Record<string, unknown>) {
  if (!item.fills) throw new Error(ErrorMakeColorTokensNoFills);
  if (!item.fills[0].color) throw new Error(ErrorMakeColorTokensNoFills);

  const R = roundColorValue(item.fills[0].color.r, 255);
  const G = roundColorValue(item.fills[0].color.g, 255);
  const B = roundColorValue(item.fills[0].color.b, 255);
  const A = roundColorValue(
    item.fills[0].opacity ? item.fills[0].opacity : item.fills[0].color.a,
    1
  );
  const NAME = camelize(item.name);
  colors[NAME] = `rgba(${R}, ${G}, ${B}, ${A})`;
}
