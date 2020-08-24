import { camelize } from '../helpers/camelize';
import { normalizeUnits } from '../helpers/normalizeUnits';

import {
  ErrorSetupRadiusTokensNoFrame,
  ErrorSetupRadiusTokensNoChildren,
  ErrorSetupRadiusTokensMissingProps
} from '../../frameworks/errors/errors';

import { Frame } from '../../entities/Frame/Frame';

/**
 * Places all Figma radii into a clean object
 *
 * @param radiusFrame The radii frame from Figma
 * @param remSize The body rem size
 */
export function setupRadiusTokens(radiusFrame: Frame, remSize: number): RadiusTokens {
  if (!radiusFrame) throw new Error(ErrorSetupRadiusTokensNoFrame);
  if (!radiusFrame.children) throw new Error(ErrorSetupRadiusTokensNoChildren);

  let cornerRadiusObject = {};

  radiusFrame.children.forEach((type) => {
    if (!type.name) throw new Error(ErrorSetupRadiusTokensMissingProps);
    const name: string = camelize(type.name);
    const cornerRadius: string = type.cornerRadius
      ? normalizeUnits(parseFloat(type.cornerRadius), 'cornerRadius', 'adjustedRadius', remSize)
      : '0px';
    cornerRadiusObject[name] = cornerRadius;
  });

  return cornerRadiusObject;
}
