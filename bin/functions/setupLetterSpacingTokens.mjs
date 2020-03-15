import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

import {
  errorSetupLetterSpacingTokensNoFrame,
  errorSetupLetterSpacingTokensNoChildren,
  errorSetupLetterSpacingTokensMissingProps
} from '../meta/errors.mjs';

/**
 * Places all Figma line heights into a clean object
 *
 * @exports
 * @function
 * @param {object} letterSpacingFrame - The line heights frame from Figma
 * @returns {object} - Returns an object with all the line heights
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
