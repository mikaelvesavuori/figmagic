import { camelize } from '../helpers/camelize';

import {
  ErrorSetupBorderWidthTokensNoFrame,
  ErrorSetupBorderWidthTokensNoChildren,
  ErrorSetupBorderWidthTokensMissingProps
} from '../../frameworks/errors/errors';

import { Frame } from '../../entities/Frame/Frame';
import { BorderWidthTokens } from '../../app/contracts/tokens/BorderWidthTokens';

/**
 * Places all Figma border widths into a clean object
 *
 * @param borderWidthFrame The border widths frame from Figma
 */
export function setupBorderWidthTokens(borderWidthFrame: Frame): BorderWidthTokens {
  if (!borderWidthFrame) throw new Error(ErrorSetupBorderWidthTokensNoFrame);
  if (!borderWidthFrame.children) throw new Error(ErrorSetupBorderWidthTokensNoChildren);

  let borderWidthObject = {};

  borderWidthFrame.children.forEach((type) => {
    if (!type.name || typeof type.strokeWeight === 'undefined')
      throw new Error(ErrorSetupBorderWidthTokensMissingProps);

    const name = camelize(type.name);

    borderWidthObject[name] = `${parseInt(type.strokeWeight, 10)}px`;
  });

  return borderWidthObject;
}
