import { FRAME as Frame } from '../../../contracts/Figma';
import { LineHeightTokens } from '../../../contracts/Tokens';
import { LineHeightUnit } from '../../../contracts/Config';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorMakeLineHeightTokensNoFrame,
  ErrorMakeLineHeightTokensNoChildren,
  ErrorMakeLineHeightTokensMissingProps,
  ErrorMakeLineHeightTokensNoName,
  ErrorMakeLineHeightTokensNoStyle
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma line heights into a clean object
 */
export function makeLineHeightTokens(
  lineHeightFrame: Frame,
  remSize: number,
  unitlessPrecision?: number,
  lineHeightUnit?: LineHeightUnit,
  camelizeTokenNames?: boolean
): LineHeightTokens {
  if (!lineHeightFrame) throw Error(ErrorMakeLineHeightTokensNoFrame);
  if (!lineHeightFrame.children) throw Error(ErrorMakeLineHeightTokensNoChildren);

  const tokens = lineHeightFrame.children.reverse();

  return tokens.reduce<LineHeightTokens>((tokensDictionary, item: Frame) => {
    if (!item.name) throw Error(ErrorMakeLineHeightTokensNoName);
    if (!item.style) throw Error(ErrorMakeLineHeightTokensNoStyle);
    const { name, value } = makeLineHeightToken(
      item,
      remSize,
      unitlessPrecision,
      lineHeightUnit,
      camelizeTokenNames
    );
    tokensDictionary[name] = value;

    return tokensDictionary;
  }, {});
}

interface Token {
  name: string;
  value: string | number;
}

/**
 * @description Compute a line-height value based on a Figma Frame object
 *
 * @note Figma allows for a non-CSS "Auto" value that would result in the CSS "normal" keyword.
 * @see https://help.figma.com/hc/en-us/articles/360040449893-Line-height-behavior
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#values
 */
function makeLineHeightToken(
  item: Frame,
  remSize: number,
  unitlessPrecision = 2,
  lineHeightUnit?: LineHeightUnit,
  camelizeTokenNames?: boolean
): Token {
  const name = sanitizeString(item.name, camelizeTokenNames);

  const fontSize = item.style.fontSize;

  const lineHeightValueInPx =
    typeof item.style.lineHeightPx !== 'undefined'
      ? Math.round(item.style.lineHeightPx * 1000) / 1000
      : 0;

  let value = '0';

  switch (lineHeightUnit) {
    case 'px':
      value = `${lineHeightValueInPx}px`;
      break;
    case 'em':
      if (!fontSize) {
        throw Error(ErrorMakeLineHeightTokensMissingProps);
      }
      /**
       * Dividing the value by the current fontSize will give the %-based em value.
       * Ex: if the letterSpacing value is 1.28 and fontSize is 32, em value should be 1.28 / 32 = 0.04em.
       */
      const valueCalcEm = Math.round((10000 * lineHeightValueInPx) / fontSize) / 10000;
      value = `${valueCalcEm}em`;
      break;
    case 'rem':
      const valueCalcRem = Math.round((10000 * lineHeightValueInPx) / remSize) / 10000;
      value = `${valueCalcRem}` + 'rem';
      break;
    default:
      value =
        typeof item.style.lineHeightPercentFontSize !== 'undefined'
          ? parseFloat(
              normalizeUnits(item.style.lineHeightPercentFontSize, 'percent', 'unitless', remSize)
            ).toFixed(unitlessPrecision)
          : // Assuming this means Figma's "Auto" line-height was used, fallback to CSS "normal" keyword
            'normal';
  }

  return {
    name,
    value
  };
}
