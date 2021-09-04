import { FRAME as Frame } from '../../../contracts/Figma';
import { FontWeightTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorMakeFontWeightTokensNoFrame,
  ErrorMakeFontWeightTokensNoChildren,
  ErrorMakeFontWeightTokensMissingProps,
  ErrorMakeFontWeightTokensMissingWeight
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma font weights into a clean object
 */
export function makeFontWeightTokens(fontWeightFrame: Frame): FontWeightTokens {
  if (!fontWeightFrame) throw Error(ErrorMakeFontWeightTokensNoFrame);
  if (!fontWeightFrame.children) throw Error(ErrorMakeFontWeightTokensNoChildren);

  const fontWeights: Record<string, unknown> = {};
  const TOKENS = fontWeightFrame.children.reverse();
  TOKENS.forEach((item: Frame) => makeFontWeightToken(item, fontWeights));

  return fontWeights;
}

function makeFontWeightToken(item: Frame, fontWeights: Record<string, unknown>) {
  if (!item.name || !item.style) throw Error(ErrorMakeFontWeightTokensMissingProps);
  if (!item.style.fontWeight) throw Error(ErrorMakeFontWeightTokensMissingWeight);

  const NAME = camelize(item.name);
  fontWeights[NAME] = item.style.fontWeight;
}
