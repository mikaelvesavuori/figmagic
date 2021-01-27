import { FRAME as Frame } from '../../../contracts/Figma';
import { LineHeightTokens } from '../../../contracts/Tokens';

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
export function makeLineHeightTokens(lineHeightFrame: Frame, remSize: number): LineHeightTokens {
  if (!lineHeightFrame) throw new Error(ErrorMakeLineHeightTokensNoFrame);
  if (!lineHeightFrame.children) throw new Error(ErrorMakeLineHeightTokensNoChildren);

  const TOKENS = lineHeightFrame.children;

  const lineHeights = TOKENS.reduce<Record<string, unknown>>((tokensDictionary, item: Frame) => {
    try {
      const { name, value } = makeLineHeightToken(item, remSize);
      tokensDictionary[name] = value;
    } catch (error) {
      console.error(error);
    }

    return tokensDictionary;
  }, {});

  return lineHeights;
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
function makeLineHeightToken(item: Frame, remSize: number): Token {
  if (!item.name || !item.style) throw new Error(ErrorMakeLineHeightTokensMissingProps);

  const NAME = camelize(item.name);
  const LINE_HEIGHT: string =
    typeof item.style.lineHeightPercentFontSize !== 'undefined'
      ? parseFloat(
          normalizeUnits(item.style.lineHeightPercentFontSize, 'percent', 'unitless', remSize)
        ).toFixed(2)
      : // Assuming this means Figma's "Auto" line-height was used, fallback to CSS "normal" keyword
        'normal';

  return {
    name: NAME,
    value: LINE_HEIGHT
  };
}
