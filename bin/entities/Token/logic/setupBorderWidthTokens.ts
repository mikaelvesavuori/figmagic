import { FRAME as Frame } from '../../../contracts/Figma';
import { BorderWidthTokens } from '../../../contracts/Tokens';

import { makeBorderWidthTokens } from '../index';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupBorderWidthTokensNoFrame,
  ErrorSetupBorderWidthTokensNoChildren,
  ErrorSetupBorderWidthTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma border widths into a clean object
 */
export function setupBorderWidthTokens(borderWidthFrame: Frame): BorderWidthTokens {
  if (!borderWidthFrame) throw new Error(ErrorSetupBorderWidthTokensNoFrame);
  if (!borderWidthFrame.children) throw new Error(ErrorSetupBorderWidthTokensNoChildren);

  const borderWidths: Record<string, unknown> = {};

  const TOKENS = borderWidthFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || item.strokeWeight === undefined)
      throw new Error(ErrorSetupBorderWidthTokensMissingProps);
    const NAME = camelize(item.name);
    borderWidths[NAME] = `${item.strokeWeight}px`;
  });

  return makeBorderWidthTokens(borderWidths);
}
