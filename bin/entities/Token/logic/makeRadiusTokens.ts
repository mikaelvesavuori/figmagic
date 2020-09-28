import { FRAME as Frame } from '../../../contracts/Figma';
import { RadiusTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorMakeRadiusTokensNoFrame,
  ErrorMakeRadiusTokensNoChildren,
  ErrorMakeRadiusTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma radii into a clean object
 */
export function makeRadiusTokens(radiusFrame: Frame, remSize: number): RadiusTokens {
  if (!radiusFrame) throw new Error(ErrorMakeRadiusTokensNoFrame);
  if (!radiusFrame.children) throw new Error(ErrorMakeRadiusTokensNoChildren);

  const cornerRadii: Record<string, unknown> = {};
  const TOKENS = radiusFrame.children;
  TOKENS.forEach((item: Frame) => makeRadiusToken(item, cornerRadii, remSize));

  return cornerRadii;
}

function makeRadiusToken(item: Frame, cornerRadii: Record<string, unknown>, remSize: number) {
  if (!item.name) throw new Error(ErrorMakeRadiusTokensMissingProps);
  const NAME: string = camelize(item.name);
  const CORNER_RADIUS: string = item.cornerRadius
    ? normalizeUnits(item.cornerRadius, 'cornerRadius', 'adjustedRadius', remSize)
    : '0px';
  cornerRadii[NAME] = CORNER_RADIUS;
}
