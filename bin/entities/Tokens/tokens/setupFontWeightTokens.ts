import { FRAME as Frame } from '../../../contracts/Figma';
import { makeFontWeightTokens } from '../index';
import { FontWeightTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupFontWeightTokensNoFrame,
  ErrorSetupFontWeightTokensNoChildren,
  ErrorSetupFontWeightTokensMissingProps,
  ErrorSetupFontWeightTokensMissingWeight
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma font weights into a clean object
 *
 * @param fontWeightFrame The font weight frame from Figma
 */
export function setupFontWeightTokens(fontWeightFrame: Frame): FontWeightTokens {
  if (!fontWeightFrame) throw new Error(ErrorSetupFontWeightTokensNoFrame);
  if (!fontWeightFrame.children) throw new Error(ErrorSetupFontWeightTokensNoChildren);

  const fontWeights: Record<string, unknown> = {};

  fontWeightFrame.children.forEach((item: Frame) => {
    if (!item.name || !item.style) throw new Error(ErrorSetupFontWeightTokensMissingProps);
    if (!item.style.fontWeight) throw new Error(ErrorSetupFontWeightTokensMissingWeight);

    const name = camelize(item.name);
    const fontWeight = item.style.fontWeight;
    fontWeights[name] = fontWeight;
  });

  const fontWeightTokens = makeFontWeightTokens(fontWeights);
  return fontWeightTokens;
}
