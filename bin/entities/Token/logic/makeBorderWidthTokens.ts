import { FRAME as Frame } from '../../../contracts/Figma';
import { BorderWidthTokens } from '../../../contracts/Tokens';
import { BorderWidthUnit } from '../../../contracts/Config';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeBorderWidthTokensNoFrame,
  ErrorMakeBorderWidthTokensNoChildren,
  ErrorMakeBorderWidthTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma border widths into a clean object
 */
export function makeBorderWidthTokens(
  borderWidthFrame: Frame,
  borderWidthUnit: BorderWidthUnit,
  remSize: number,
  camelizeTokenNames?: boolean
): BorderWidthTokens {
  if (!borderWidthFrame) throw Error(ErrorMakeBorderWidthTokensNoFrame);
  if (!borderWidthFrame.children) throw Error(ErrorMakeBorderWidthTokensNoChildren);

  const borderWidths: Record<string, number> = {};
  const tokens = borderWidthFrame.children.reverse();
  tokens.forEach((item: Frame) =>
    makeBorderWidthToken(item, borderWidths, remSize, borderWidthUnit, camelizeTokenNames)
  );

  return borderWidths as BorderWidthTokens;
}

function makeBorderWidthToken(
  item: Frame,
  borderWidths: Record<string, unknown>,
  remSize: number,
  borderWidthUnit: string,
  camelizeTokenNames?: boolean
) {
  if (!item.name || item.strokeWeight === undefined)
    throw Error(ErrorMakeBorderWidthTokensMissingProps);

  const name = sanitizeString(item.name, camelizeTokenNames);
  const borderWidth = (() => {
    if (borderWidthUnit === 'px') return item.strokeWeight + borderWidthUnit;
    else return (item.strokeWeight as unknown as number) / remSize + borderWidthUnit;
  })();

  borderWidths[name] = borderWidth;
}
