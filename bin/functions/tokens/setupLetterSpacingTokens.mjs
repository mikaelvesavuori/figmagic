import { camelize } from '../helpers/camelize.mjs';

import {
  errorSetupLetterSpacingTokensNoFrame,
  errorSetupLetterSpacingTokensNoChildren,
  errorSetupLetterSpacingTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma letter spacings into a clean object
 *
 * Figma allows to provide (in the Figma document itself) letterSpacing in either "%" or "px".
 * The API internally converts the provided value in a number, which is the calculated value based on the font-size (no unit is provided, but the value corresponds to px)
 * Ex: if the font-size is 32px and the letterSpacing 4%, the exported value from the API will be 32 * 4 / 100 = 1.28.
 * In CSS however, the letter-spacing length allows either "px" or "em" units (or even "rem" even though it hardly make any sense for letter-spacing in practice):
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
 *
 * @exports
 * @function
 * @param {object} letterSpacingFrame - The letter spacings frame from Figma
 * @returns {object} - Returns an object with all the letter spacings
 * @throws {errorSetupLetterSpacingTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupLetterSpacingTokensNoChildren} - When missing children on Figma frame
 * @throws {errorSetupLetterSpacingTokensMissingProps} - When missing required props on frame children
 */
export function setupLetterSpacingTokens(letterSpacingFrame, letterSpacingUnit) {
  if (!letterSpacingFrame) throw new Error(errorSetupLetterSpacingTokensNoFrame);
  if (!letterSpacingFrame.children) throw new Error(errorSetupLetterSpacingTokensNoChildren);

  // Reduce the children array to a tokens object
  const letterSpacingObject = letterSpacingFrame.children.reduce(
    (tokens, type) => {
      if (!type.name || !type.style) throw new Error(errorSetupLetterSpacingTokensMissingProps);

      const name = camelize(type.name);

      // Assuming Figma API always export the node font-size as an integer in our case
      // https://www.figma.com/plugin-docs/api/TextNode/#fontsize
      const fontSize = parseInt(type.style.fontSize, 10);
      const letterSpacingValueInPx =
        typeof type.style.letterSpacing !== 'undefined'
          ? // Round the value to 2 decimals
            Math.round(parseFloat(type.style.letterSpacing) * 1000) / 1000
          : // if no letter-spacing is defined, set it to 0 by default (no letter-spacing)
            0;
      // actual token value to set
      let value = 0;

      switch (letterSpacingUnit) {
        case 'px':
          // value is already calculated, we just need to add the "px" unit
          value = `${letterSpacingValueInPx}px`;
          break;
        case 'em':
        default:
          // em conversion: rebase on the current font-size
          if (!fontSize) {
            throw new Error(errorSetupLetterSpacingTokensMissingProps);
          }
          // Figma already converted the value to a relative px value
          // Dividing the value by the current fontSize will give the %-based em value.
          // Ex: if the letterSpacing value is 1.28 and fontSize is 32, em value should be 1.28 / 32 = 0.04em.
          value = Math.round((1000 * letterSpacingValueInPx) / fontSize) / 1000;
          value = `${value}em`;
          break;
      }

      tokens[name] = value;

      return tokens;
    },
    // Initial shape: just an empty object
    {}
  );

  return letterSpacingObject;
}
