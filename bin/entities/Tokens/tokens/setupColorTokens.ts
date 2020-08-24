import { camelize } from '../../../frameworks/string/camelize';
import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import {
  ErrorSetupColorTokensNoFrame,
  ErrorSetupColorTokensNoChildren,
  ErrorSetupColorTokensNoFills
} from '../../../frameworks/errors/errors';

import { Frame } from '../../../app/contracts/Frame';

/**
 * @description Places all Figma color frames into a clean object
 *
 * @param colorFrame The color frame from Figma
 */
export function setupColorTokens(colorFrame: Frame): ColorTokens {
  if (!colorFrame) throw new Error(ErrorSetupColorTokensNoFrame);
  if (!colorFrame.children) throw new Error(ErrorSetupColorTokensNoChildren);

  let colors = {};

  colorFrame.children.forEach((color) => {
    if (!color.fills) throw new Error(ErrorSetupColorTokensNoFills);

    // It seems RGBA alpha is actually not coming from "color.a", so the below fixes that
    const ALPHA = color.fills[0].opacity ? color.fills[0].opacity : color.fills[0].color.a;

    const COLOR_STRING = `rgba(${roundColorValue(color.fills[0].color.r, 255)}, ${roundColorValue(
      color.fills[0].color.g,
      255
    )}, ${roundColorValue(color.fills[0].color.b, 255)}, ${roundColorValue(ALPHA, 1)})`;

    const name = camelize(color.name);

    colors[name] = COLOR_STRING;
  });

  return colors;
}
