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

  TOKENS.forEach((item: Frame) => {
    if (!item.fills) throw new Error(ErrorMakeColorTokensNoFills);
    if (!item.fills[0].color) throw new Error(ErrorMakeColorTokensNoFills);

    const ALPHA = item.opacity ? item.opacity : item.fills[0].color.a;
    const _R = item.fills[0].color.r;
    const _G = item.fills[0].color.g;
    const _B = item.fills[0].color.b;
    const COLOR_STRING = `rgba(${roundColorValue(_R, 255)}, ${roundColorValue(
      _G,
      255
    )}, ${roundColorValue(_B, 255)}, ${roundColorValue(ALPHA, 1)})`;

    const NAME = camelize(item.name);
    colors[NAME] = COLOR_STRING;
  });

  return colors;
}
