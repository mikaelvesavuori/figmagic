import { FRAME as Frame } from '../../../app/contracts/Figma';
import { makeColorTokens } from '../index';
import { ColorTokens } from '../Tokens';

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

    // It seems RGBA alpha is actually not coming from "color.a", so the below fixes that
    const ALPHA = item.fills[0].opacity ? item.fills[0].opacity : item.fills[0].color.a;

    const COLOR_STRING = `rgba(${roundColorValue(item.fills[0].color.r, 255)}, ${roundColorValue(
      item.fills[0].color.g,
      255
    )}, ${roundColorValue(item.fills[0].color.b, 255)}, ${roundColorValue(ALPHA, 1)})`;

    const name = camelize(item.name);
    colors[name] = COLOR_STRING;
  });

  const colorTokens = makeColorTokens(colors);
  return colorTokens;
}
