import { FRAME as Frame } from '../../../contracts/Figma';
import { makeColorTokens } from '../index';
import { ColorTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import {
  ErrorSetupColorTokensNoFrame,
  ErrorSetupColorTokensNoChildren,
  ErrorSetupColorTokensNoFills
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma color frames into a clean object
 *
 * @param colorFrame The color frame from Figma
 */
export function setupColorTokens(colorFrame: Frame): ColorTokens {
  if (!colorFrame) throw new Error(ErrorSetupColorTokensNoFrame);
  if (!colorFrame.children) throw new Error(ErrorSetupColorTokensNoChildren);

  const colors: Record<string, unknown> = {};

  colorFrame.children.forEach((item: Frame) => {
    if (!item.fills) throw new Error(ErrorSetupColorTokensNoFills);

    const ALPHA = item.opacity ? item.opacity : item.fills[0].color.a;
    const _R = item.fills[0].color.r;
    const _G = item.fills[0].color.g;
    const _B = item.fills[0].color.b;
    const COLOR_STRING = `rgba(${roundColorValue(_R, 255)}, ${roundColorValue(
      _G,
      255
    )}, ${roundColorValue(_B, 255)}, ${roundColorValue(ALPHA, 1)})`;

    const name = camelize(item.name);
    colors[name] = COLOR_STRING;
  });

  return makeColorTokens(colors);
}
