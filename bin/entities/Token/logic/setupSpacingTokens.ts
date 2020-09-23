import { FRAME as Frame } from '../../../contracts/Figma';
import { SpacingTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorSetupSpacingTokensNoFrame,
  ErrorSetupSpacingTokensNoChildren,
  ErrorSetupSpacingTokensNoUnits
} from '../../../frameworks/errors/errors';

export const makeSpacingTokens = (
  frame: Frame,
  spacingUnit: string,
  remSize: number
): SpacingTokens => setupSpacingTokens(frame, spacingUnit, remSize);

/**
 * @description Places all Figma spacings into a clean object
 */
function setupSpacingTokens(
  spacingFrame: Frame,
  spacingUnit: string,
  remSize: number
): SpacingTokens {
  if (!spacingFrame) throw new Error(ErrorSetupSpacingTokensNoFrame);
  if (!spacingFrame.children) throw new Error(ErrorSetupSpacingTokensNoChildren);
  if (!spacingUnit || !remSize) throw new Error(ErrorSetupSpacingTokensNoUnits);

  const spacings: Record<string, unknown> = {};

  const TOKENS = spacingFrame.children;

  TOKENS.forEach((item: Frame) => {
    const NAME: string = camelize(item.name);
    if (!item.absoluteBoundingBox || !item.absoluteBoundingBox.width)
      throw new Error(ErrorSetupSpacingTokensNoFrame);
    const WIDTH: number = item.absoluteBoundingBox.width;
    const NORMALIZED_UNIT = normalizeUnits(WIDTH, 'px', spacingUnit, remSize);
    spacings[NAME] = NORMALIZED_UNIT;
  });

  // @ts-ignore
  return spacings as SpacingTokens;
}
