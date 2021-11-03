import { FRAME as Frame } from '../../../contracts/Figma';
import { BorderWidthTokens } from '../../../contracts/Tokens';
import { BorderWidthUnit } from '../../../contracts/Config';

import { camelize } from '../../../frameworks/string/camelize';

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
  remSize: number
): BorderWidthTokens {
  if (!borderWidthFrame) throw Error(ErrorMakeBorderWidthTokensNoFrame);
  if (!borderWidthFrame.children) throw Error(ErrorMakeBorderWidthTokensNoChildren);

  const borderWidths: Record<string, unknown> = {};
  const TOKENS = borderWidthFrame.children.reverse();
  TOKENS.forEach((item: Frame) =>
    makeBorderWidthToken(item, borderWidths, remSize, borderWidthUnit)
  );

  return borderWidths;
}

function makeBorderWidthToken(
  item: Frame,
  borderWidths: Record<string, unknown>,
  remSize: number,
  borderWidthUnit: string
) {
  if (!item.name || item.strokeWeight === undefined)
    throw Error(ErrorMakeBorderWidthTokensMissingProps);

  const NAME = camelize(item.name);
  const BORDER_WIDTH = (() => {
    if (borderWidthUnit === 'px') return item.strokeWeight + borderWidthUnit;
    else return (item.strokeWeight as unknown as number) / remSize + borderWidthUnit;
  })();

  borderWidths[NAME] = BORDER_WIDTH;
}
