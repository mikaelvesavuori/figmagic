import { camelize } from '../helpers/camelize.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupBorderWidthTokensNoFrame,
  errorSetupBorderWidthTokensNoChildren,
  errorSetupBorderWidthTokensMissingProps
} from '../../meta/errors.mjs';

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
export function setupBorderWidthTokens(borderWidthFrame) {
  if (!borderWidthFrame) throw new Error(errorSetupBorderWidthTokensNoFrame);
  if (!borderWidthFrame.children) throw new Error(errorSetupBorderWidthTokensNoChildren);

  let borderWidthObject = {};

  borderWidthFrame.children.forEach(type => {
    if (!type.name || !type.strokeWeight) throw new Error(errorSetupBorderWidthTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);

    borderWidthObject[name] = `${type.strokeWeight}px`;
  });

  return borderWidthObject;
}
