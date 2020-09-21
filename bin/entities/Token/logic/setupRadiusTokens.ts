import { FRAME as Frame } from '../../../contracts/Figma';
import { RadiusTokens } from '../../../contracts/Tokens';

import { makeRadiusTokens } from '../index';

import { camelize } from '../../../frameworks/string/camelize';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorSetupRadiusTokensNoFrame,
  ErrorSetupRadiusTokensNoChildren,
  ErrorSetupRadiusTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma radii into a clean object
 */
export function setupRadiusTokens(radiusFrame: Frame, remSize: number): RadiusTokens {
  if (!radiusFrame) throw new Error(ErrorSetupRadiusTokensNoFrame);
  if (!radiusFrame.children) throw new Error(ErrorSetupRadiusTokensNoChildren);

  const cornerRadii: Record<string, unknown> = {};

  const TOKENS = radiusFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name) throw new Error(ErrorSetupRadiusTokensMissingProps);
    const NAME: string = camelize(item.name);
    const cornerRadius: string = item.cornerRadius
      ? normalizeUnits(item.cornerRadius, 'cornerRadius', 'adjustedRadius', remSize)
      : '0px';
    cornerRadii[NAME] = cornerRadius;
  });

  return makeRadiusTokens(cornerRadii);
}
