import { FRAME as Frame } from '../../../contracts/Figma';
import { LineHeightTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorMakeLineHeightTokensNoFrame,
  ErrorMakeLineHeightTokensNoChildren,
  ErrorMakeLineHeightTokensMissingProps,
  ErrorMakeLineHeightTokensMissingPercent
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma line heights into a clean object
 */
export function makeLineHeightTokens(lineHeightFrame: Frame, remSize: number): LineHeightTokens {
  if (!lineHeightFrame) throw new Error(ErrorMakeLineHeightTokensNoFrame);
  if (!lineHeightFrame.children) throw new Error(ErrorMakeLineHeightTokensNoChildren);

  const lineHeights: Record<string, unknown> = {};

  const TOKENS = lineHeightFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.style) throw new Error(ErrorMakeLineHeightTokensMissingProps);
    if (!item.style.lineHeightPercentFontSize)
      throw new Error(ErrorMakeLineHeightTokensMissingPercent);

    const NAME = camelize(item.name);
    const LINE_HEIGHT: string = normalizeUnits(
      item.style.lineHeightPercentFontSize,
      'percent',
      'unitless',
      remSize
    );

    // Do a tiny bit of rounding to avoid ugly numbers
    const lineHeight = parseFloat(LINE_HEIGHT).toFixed(2);
    lineHeights[NAME] = lineHeight;
  });

  // @ts-ignore
  return lineHeights as LineHeightTokens;
}
