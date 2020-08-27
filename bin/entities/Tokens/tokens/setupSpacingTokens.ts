import { FRAME as Frame } from '../../../app/contracts/Figma';
import { makeSpacingTokens } from '../index';
import { SpacingTokens } from '../Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorSetupSpacingTokensNoFrame,
  ErrorSetupSpacingTokensNoChildren,
  ErrorSetupSpacingTokensNoUnits
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma spacings into a clean object
 *
 * @param spacingFrame The spacing frame from Figma
 * @param spacingUnit The spacing unit
 * @param remSize The body rem size
 */
export function setupSpacingTokens(
  spacingFrame: Frame,
  spacingUnit: string,
  remSize: number
): SpacingTokens {
  if (!spacingFrame) throw new Error(ErrorSetupSpacingTokensNoFrame);
  if (!spacingFrame.children) throw new Error(ErrorSetupSpacingTokensNoChildren);
  if (!spacingUnit || !remSize) throw new Error(ErrorSetupSpacingTokensNoUnits);

  const { children } = spacingFrame;
  const spacings: Record<string, unknown> = {};

  children.forEach((item: Frame) => {
    const name: string = camelize(item.name);
    const width: number =
      item.absoluteBoundingBox && item.absoluteBoundingBox.width
        ? item.absoluteBoundingBox.width
        : 0;
    const normalizedUnit = normalizeUnits(width, 'px', spacingUnit, remSize);
    spacings[name] = normalizedUnit;
  });

  const spacingTokens = makeSpacingTokens(spacings);
  return spacingTokens;
}
