import { camelize } from '../helpers/camelize';
import { normalizeUnits } from '../helpers/normalizeUnits';

import {
  errorSetupRadiusTokensNoFrame,
  errorSetupRadiusTokensNoChildren,
  errorSetupRadiusTokensMissingProps
} from '../../meta/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma radii into a clean object
 *
 * @exports
 * @function
 * @param {Frame} radiusFrame - The radii frame from Figma
 * @returns {object} - Returns an object with all the radii
 * @throws {errorSetupRadiusTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupRadiusTokensNoChildren} - When missing children in Figma frame
 * @throws {errorSetupRadiusTokensMissingProps} - When missing required props in frame children
 */
export function setupRadiusTokens(radiusFrame: Frame): object {
  if (!radiusFrame) throw new Error(errorSetupRadiusTokensNoFrame);
  if (!radiusFrame.children) throw new Error(errorSetupRadiusTokensNoChildren);

  let cornerRadiusObject = {};

  radiusFrame.children.forEach((type) => {
    if (!type.name) throw new Error(errorSetupRadiusTokensMissingProps);

    const name = camelize(type.name);

    const RADIUS = (() => {
      if (type.cornerRadius)
        return normalizeUnits(type.cornerRadius, 'cornerRadius', 'adjustedRadius');
      else return `0px`;
    })();

    cornerRadiusObject[name] = RADIUS;
  });

  return cornerRadiusObject;
}
