import { FRAME as Frame } from '../../../contracts/Figma';
import { LetterSpacingTokens } from '../../../contracts/Tokens';
import { LetterSpacingUnit } from '../../../contracts/Config';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeLetterSpacingTokensNoFrame,
  ErrorMakeLetterSpacingTokensNoChildren,
  ErrorMakeLetterSpacingTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma letter spacings into a clean object
 *
 * Figma allows to provide (in the Figma document itself) letterSpacing in either "%" or "px".
 * The API internally converts the provided value in a number, which is the calculated value based on the font-size (no unit is provided, but the value corresponds to px)
 * Ex: if the font-size is 32px and the letterSpacing 4%, the exported value from the API will be 32 * 4 / 100 = 1.28.
 * In CSS however, the letter-spacing length allows either "px" or "em" units (or even "rem" even though it hardly make any sense for letter-spacing in practice):
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
 * @todo Refactor
 */
export function makeLetterSpacingTokens(
  letterSpacingFrame: Frame,
  letterSpacingUnit: LetterSpacingUnit,
  camelizeTokenNames?: boolean
): LetterSpacingTokens {
  if (!letterSpacingFrame) throw Error(ErrorMakeLetterSpacingTokensNoFrame);
  if (!letterSpacingFrame.children) throw Error(ErrorMakeLetterSpacingTokensNoChildren);

  const tokens = letterSpacingFrame.children.reverse();

  const letterSpacings = tokens.reduce(
    (_tokens: { [index: string]: string | number }, item: Frame) => {
      if (!item.name || !item.style) throw Error(ErrorMakeLetterSpacingTokensMissingProps);

      const name = sanitizeString(item.name, camelizeTokenNames);

      /**
       * Assuming Figma API always export the node font-size as an integer in our case
       * @see https://www.figma.com/plugin-docs/api/TextNode/#fontsize
       */
      const fontSize = item.style.fontSize;
      const letterSpacingValueInPx =
        typeof item.style.letterSpacing !== 'undefined'
          ? Math.round(item.style.letterSpacing * 1000) / 1000
          : 0;
      let value = '0';

      switch (letterSpacingUnit) {
        case 'px':
          value = `${letterSpacingValueInPx}px`;
          break;
        case 'em':
        default:
          if (!fontSize) {
            throw Error(ErrorMakeLetterSpacingTokensMissingProps);
          }
          /**
           * Dividing the value by the current fontSize will give the %-based em value.
           * Ex: if the letterSpacing value is 1.28 and fontSize is 32, em value should be 1.28 / 32 = 0.04em.
           */
          const valueCalc = Math.round((10000 * letterSpacingValueInPx) / fontSize) / 10000;
          value = `${valueCalc}em`;
          break;
      }

      _tokens[name] = value;

      return _tokens;
    },
    {}
  );

  return letterSpacings;
}
