import { camelize } from '../helpers/camelize.mjs';
import { normalizeUnits } from '../helpers/normalizeUnits.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupLetterSpacingTokensNoFrame,
  errorSetupLetterSpacingTokensNoChildren,
  errorSetupLetterSpacingTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma letter spacings into a clean object
 *
 * @exports
 * @function
 * @param {object} letterSpacingFrame - The letter spacings frame from Figma
 * @returns {object} - Returns an object with all the letter spacings
 * @throws {error} - When there is no provided Figma frame
 */
export function setupLetterSpacingTokens(letterSpacingFrame) {
  if (!letterSpacingFrame) throw new Error(errorSetupLetterSpacingTokensNoFrame);
  if (!letterSpacingFrame.children) throw new Error(errorSetupLetterSpacingTokensNoChildren);

  let letterSpacingObject = {};

  letterSpacingFrame.children.forEach(type => {
    if (!type.name || !type.style) throw new Error(errorSetupLetterSpacingTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);

    const LETTER_SPACING = (() => {
      if (type.style.letterSpacing !== 0 && type.style.letterSpacing !== undefined)
        return normalizeUnits(
          parseFloat(type.style.letterSpacing),
          'letterSpacing',
          'adjustedSpacing'
        );
      else return `0px`;
    })();

    letterSpacingObject[name] = LETTER_SPACING;
  });

  return letterSpacingObject;
}
