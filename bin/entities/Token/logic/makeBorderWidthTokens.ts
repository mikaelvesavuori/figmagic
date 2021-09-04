import { FRAME as Frame } from '../../../contracts/Figma';
import { BorderWidthTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorMakeBorderWidthTokensNoFrame,
  ErrorMakeBorderWidthTokensNoChildren,
  ErrorMakeBorderWidthTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma border widths into a clean object
 */
export function makeBorderWidthTokens(borderWidthFrame: Frame): BorderWidthTokens {
  if (!borderWidthFrame) throw Error(ErrorMakeBorderWidthTokensNoFrame);
  if (!borderWidthFrame.children) throw Error(ErrorMakeBorderWidthTokensNoChildren);

  const borderWidths: Record<string, unknown> = {};
  const TOKENS = borderWidthFrame.children.reverse();
  TOKENS.forEach((item: Frame) => makeBorderWidthToken(item, borderWidths));

  return borderWidths;
}

function makeBorderWidthToken(item: Frame, borderWidths: Record<string, unknown>) {
  if (!item.name || item.strokeWeight === undefined)
    throw Error(ErrorMakeBorderWidthTokensMissingProps);
  const NAME = camelize(item.name);
  borderWidths[NAME] = `${item.strokeWeight}px`;
}
