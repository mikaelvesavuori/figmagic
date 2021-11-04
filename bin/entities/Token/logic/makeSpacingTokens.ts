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

  const spacings: Record<string, unknown> = {};
  const TOKENS = spacingFrame.children.reverse();
  TOKENS.forEach((item: Frame) =>
    makeSpacingToken(item, spacings, spacingUnit, remSize, camelizeTokenNames)
  );

  return spacings;
}

function makeSpacingToken(
  item: Frame,
  spacings: Record<string, unknown>,
  spacingUnit: SpacingUnit,
  remSize: number,
  camelizeTokenNames?: boolean
) {
  const NAME: string = sanitizeString(item.name, camelizeTokenNames);
  if (!item.absoluteBoundingBox || !item.absoluteBoundingBox.width)
    throw Error(ErrorMakeSpacingTokensNoFrame);

  const WIDTH: number = item.absoluteBoundingBox.width;
  const SPACING = (() => {
    if (spacingUnit === 'px') return WIDTH + spacingUnit;
    else return normalizeUnits(WIDTH, 'px', spacingUnit, remSize);
  })();

  spacings[NAME] = SPACING;
}
