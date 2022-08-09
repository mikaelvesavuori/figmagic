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

  const fontWeights: Record<string, string> = {};
  const tokens = fontWeightFrame.children.reverse();
  tokens.forEach((item: Frame) => makeFontWeightToken(item, fontWeights, camelizeTokenNames));

  return fontWeights as FontWeightTokens;
}

function makeFontWeightToken(
  item: Frame,
  fontWeights: Record<string, string>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.style) throw Error(ErrorMakeFontWeightTokensMissingProps);
  if (!item.style.fontWeight) throw Error(ErrorMakeFontWeightTokensMissingWeight);

  const name = sanitizeString(item.name, camelizeTokenNames);
  fontWeights[name] = item.style.fontWeight;
}
