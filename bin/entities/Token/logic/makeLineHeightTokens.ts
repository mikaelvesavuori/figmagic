import { FRAME as Frame } from '../../../contracts/Figma';
import { LineHeightTokens } from '../../../contracts/Tokens';
import { LineHeightUnits } from '../../../contracts/Config';

import { camelize } from '../../../frameworks/string/camelize';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorMakeLineHeightTokensNoFrame,
  ErrorMakeLineHeightTokensNoChildren,
  ErrorMakeLineHeightTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma line heights into a clean object
 */
export function makeLineHeightTokens(
  lineHeightFrame: Frame,
  remSize: number,
  unitlessPrecision?: number,
  lineHeightUnit?: LineHeightUnits
): LineHeightTokens {
  if (!lineHeightFrame) throw new Error(ErrorMakeLineHeightTokensNoFrame);
  if (!lineHeightFrame.children) throw new Error(ErrorMakeLineHeightTokensNoChildren);

  const TOKENS = lineHeightFrame.children;

  return TOKENS.reduce<LineHeightTokens>((tokensDictionary, item: Frame) => {
    try {
      const { name, value } = makeLineHeightToken(item, remSize, unitlessPrecision, lineHeightUnit);
      tokensDictionary[name] = value;
    } catch (error) {
      console.error(error);
    }

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
  lineHeightUnit?: LineHeightUnits
): Token {
  const NAME = camelize(item.name);

  const FONT_SIZE = item.style.fontSize;

  const LINE_HEIGHT_VALUE_IN_PX =
    typeof item.style.lineHeightPx !== 'undefined'
      ? Math.round(item.style.lineHeightPx * 1000) / 1000
      : 0;

  let value = '0';
  console.log({ lineHeightUnit });
  switch (lineHeightUnit) {
    case 'px':
      value = `${LINE_HEIGHT_VALUE_IN_PX}px`;
      break;
    case 'em':
      if (!FONT_SIZE) {
        throw new Error(ErrorMakeLineHeightTokensMissingProps);
      }
      /**
       * Dividing the value by the current FONT_SIZE will give the %-based em value.
       * Ex: if the letterSpacing value is 1.28 and FONT_SIZE is 32, em value should be 1.28 / 32 = 0.04em.
       */
      const valueCalcEm = Math.round((10000 * LINE_HEIGHT_VALUE_IN_PX) / FONT_SIZE) / 10000;
      value = `${valueCalcEm}em`;
      break;
    case 'rem':
      const valueCalcRem = Math.round((10000 * LINE_HEIGHT_VALUE_IN_PX) / remSize) / 10000;
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
    name: NAME,
    value
  };
}
