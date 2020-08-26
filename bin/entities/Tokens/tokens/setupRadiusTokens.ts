import { Frame } from '../../../app/contracts/Frame';
import { makeRadiusTokens } from '../index';
import { RadiusTokens } from '../Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorSetupRadiusTokensNoFrame,
  ErrorSetupRadiusTokensNoChildren,
  ErrorSetupRadiusTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma radii into a clean object
 *
 * @param radiusFrame The radii frame from Figma
 * @param remSize The body rem size
 */
export function setupRadiusTokens(radiusFrame: Frame, remSize: number): RadiusTokens {
  if (!radiusFrame) throw new Error(ErrorSetupRadiusTokensNoFrame);
  if (!radiusFrame.children) throw new Error(ErrorSetupRadiusTokensNoChildren);

  let cornerRadii = {};

  radiusFrame.children.forEach((type) => {
    if (!type.name) throw new Error(ErrorSetupRadiusTokensMissingProps);
    const name: string = camelize(type.name);
    const cornerRadius: string = type.cornerRadius
      ? normalizeUnits(parseFloat(type.cornerRadius), 'cornerRadius', 'adjustedRadius', remSize)
      : '0px';
    cornerRadii[name] = cornerRadius;
  });

  const radiusTokens = makeRadiusTokens(cornerRadii);
  return radiusTokens;
}
