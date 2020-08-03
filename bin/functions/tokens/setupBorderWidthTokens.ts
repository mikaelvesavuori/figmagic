import { camelize } from '../helpers/camelize';

import {
  errorSetupBorderWidthTokensNoFrame,
  errorSetupBorderWidthTokensNoChildren,
  errorSetupBorderWidthTokensMissingProps
} from '../../meta/errors';

import { BorderWidthFrame } from '../../app/contracts/frames/BorderWidthFrame';

/**
 * Places all Figma border widths into a clean object
 *
 * @exports
 * @function
 * @param {object} borderWidthFrame - The border widths frame from Figma
 * @returns {object} - Returns an object with all the border widths
 * @throws {errorSetupBorderWidthTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupBorderWidthTokensNoChildren} - When Figma frame is missing children
 */
export function setupBorderWidthTokens(borderWidthFrame: BorderWidthFrame): object {
  if (!borderWidthFrame) throw new Error(errorSetupBorderWidthTokensNoFrame);
  if (!borderWidthFrame.children) throw new Error(errorSetupBorderWidthTokensNoChildren);

  let borderWidthObject = {};

  borderWidthFrame.children.forEach((type) => {
    if (!type.name || typeof type.strokeWeight === 'undefined')
      throw new Error(errorSetupBorderWidthTokensMissingProps);

    const name = camelize(type.name);

    borderWidthObject[name] = `${parseInt(type.strokeWeight, 10)}px`;
  });

  return borderWidthObject;
}
