import { FRAME as Frame } from '../../../contracts/Figma';
import { SpacingTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
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
  spacingUnit: string,
  remSize: number
): SpacingTokens {
  if (!spacingFrame) throw Error(ErrorMakeSpacingTokensNoFrame);
  if (!spacingFrame.children) throw Error(ErrorMakeSpacingTokensNoChildren);
  if (!spacingUnit || !remSize) throw Error(ErrorMakeSpacingTokensNoUnits);

  const spacings: Record<string, unknown> = {};
  const TOKENS = spacingFrame.children;
  TOKENS.forEach((item: Frame) => makeSpacingToken(item, spacings, spacingUnit, remSize));

  return spacings;
}

function makeSpacingToken(
  item: Frame,
  spacings: Record<string, unknown>,
  spacingUnit: string,
  remSize: number
) {
  const NAME: string = camelize(item.name);
  if (!item.absoluteBoundingBox || !item.absoluteBoundingBox.width)
    throw Error(ErrorMakeSpacingTokensNoFrame);

  const WIDTH: number = item.absoluteBoundingBox.width;
  const UNIT = (() => {
    if (spacingUnit === 'px') return WIDTH + spacingUnit;
    else return normalizeUnits(WIDTH, 'px', spacingUnit, remSize);
  })();

  spacings[NAME] = UNIT;
}
