import { FRAME as Frame } from '../../../contracts/Figma';
import { ColorTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import {
  ErrorSetupColorTokensNoFrame,
  ErrorSetupColorTokensNoChildren,
  ErrorSetupColorTokensNoFills
} from '../../../frameworks/errors/errors';

export const makeColorTokens = (frame: Frame): ColorTokens => setupColorTokens(frame);

/**
 * @description Places all Figma color frames into a clean object
 */
function setupColorTokens(colorFrame: Frame): ColorTokens {
  if (!colorFrame) throw new Error(ErrorSetupColorTokensNoFrame);
  if (!colorFrame.children) throw new Error(ErrorSetupColorTokensNoChildren);

  const colors: Record<string, unknown> = {};

  const TOKENS = colorFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.fills) throw new Error(ErrorSetupColorTokensNoFills);
    if (!item.fills[0].color) throw new Error(ErrorSetupColorTokensNoFills);

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

  // @ts-ignore
  return colors as ColorTokens;
}
