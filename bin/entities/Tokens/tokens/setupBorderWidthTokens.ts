import { Frame } from '../../../app/contracts/Frame';
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

  let borderWidths: object = {};

  borderWidthFrame.children.forEach((type) => {
    if (!type.name || typeof type.strokeWeight === 'undefined')
      throw new Error(ErrorSetupBorderWidthTokensMissingProps);
    const name = camelize(type.name);
    borderWidths[name] = `${type.strokeWeight}px`;
  });

  const borderWidthTokens = makeBorderWidthTokens(borderWidths);
  return borderWidthTokens;
}
