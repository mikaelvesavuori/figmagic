import { FRAME as Frame } from '../../../app/contracts/Figma';
import { makeBorderWidthTokens } from '../index';
import { BorderWidthTokens } from '../Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupBorderWidthTokensNoFrame,
  ErrorSetupBorderWidthTokensNoChildren,
  ErrorSetupBorderWidthTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma border widths into a clean object
 *
 * @param borderWidthFrame The border widths frame from Figma
 */
export function setupBorderWidthTokens(borderWidthFrame: Frame): BorderWidthTokens {
  if (!borderWidthFrame) throw new Error(ErrorSetupBorderWidthTokensNoFrame);
  if (!borderWidthFrame.children) throw new Error(ErrorSetupBorderWidthTokensNoChildren);

  const borderWidths: Record<string, unknown> = {};

  borderWidthFrame.children.forEach((item: Frame) => {
    if (!item.name || typeof item.strokeWeight === 'undefined')
      throw new Error(ErrorSetupBorderWidthTokensMissingProps);
    const name = camelize(item.name);
    borderWidths[name] = `${item.strokeWeight}px`;
  });

  const borderWidthTokens = makeBorderWidthTokens(borderWidths);
  return borderWidthTokens;
}
