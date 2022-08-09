import { FRAME as Frame } from '../../../contracts/Figma';
import { SpacingTokens } from '../../../contracts/Tokens';
import { SpacingUnit } from '../../../contracts/Config';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorMakeSpacingTokensNoFrame,
  ErrorMakeSpacingTokensNoChildren,
  ErrorMakeSpacingTokensNoUnits
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma spacings into a clean object
 */
export function makeSpacingTokens(
  spacingFrame: Frame,
  spacingUnit: SpacingUnit,
  remSize: number,
  camelizeTokenNames?: boolean
): SpacingTokens {
  if (!spacingFrame) throw Error(ErrorMakeSpacingTokensNoFrame);
  if (!spacingFrame.children) throw Error(ErrorMakeSpacingTokensNoChildren);
  if (!spacingUnit || !remSize) throw Error(ErrorMakeSpacingTokensNoUnits);

  const spacings: Record<string, string> = {};
  const tokens = spacingFrame.children.reverse();
  tokens.forEach((item: Frame) =>
    makeSpacingToken(item, spacings, spacingUnit, remSize, camelizeTokenNames)
  );

  return spacings as SpacingTokens;
}

function makeSpacingToken(
  item: Frame,
  spacings: Record<string, string>,
  spacingUnit: SpacingUnit,
  remSize: number,
  camelizeTokenNames?: boolean
) {
  const name: string = sanitizeString(item.name, camelizeTokenNames);
  if (!item.absoluteBoundingBox || !item.absoluteBoundingBox.width)
    throw Error(ErrorMakeSpacingTokensNoFrame);

  const width: number = item.absoluteBoundingBox.width;
  const spacing = (() => {
    if (spacingUnit === 'px') return width + spacingUnit;
    else return normalizeUnits(width, 'px', spacingUnit, remSize);
  })();

  spacings[name] = spacing;
}
