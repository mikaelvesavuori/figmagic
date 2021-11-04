import { FRAME as Frame } from '../../../contracts/Figma';
import { FontWeightTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeFontWeightTokensNoFrame,
  ErrorMakeFontWeightTokensNoChildren,
  ErrorMakeFontWeightTokensMissingProps,
  ErrorMakeFontWeightTokensMissingWeight
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma font weights into a clean object
 */
export function makeFontWeightTokens(
  fontWeightFrame: Frame,
  camelizeTokenNames?: boolean
): FontWeightTokens {
  if (!fontWeightFrame) throw Error(ErrorMakeFontWeightTokensNoFrame);
  if (!fontWeightFrame.children) throw Error(ErrorMakeFontWeightTokensNoChildren);

  const fontWeights: Record<string, unknown> = {};
  const TOKENS = fontWeightFrame.children.reverse();
  TOKENS.forEach((item: Frame) => makeFontWeightToken(item, fontWeights, camelizeTokenNames));

  return fontWeights;
}

function makeFontWeightToken(
  item: Frame,
  fontWeights: Record<string, unknown>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.style) throw Error(ErrorMakeFontWeightTokensMissingProps);
  if (!item.style.fontWeight) throw Error(ErrorMakeFontWeightTokensMissingWeight);

  const NAME = sanitizeString(item.name, camelizeTokenNames);
  fontWeights[NAME] = item.style.fontWeight;
}
