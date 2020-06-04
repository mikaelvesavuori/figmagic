import { camelize } from '../helpers/camelize.mjs';
import { normalizeUnits } from '../helpers/normalizeUnits.mjs';

import {
  errorSetupRadiusTokensNoFrame,
  errorSetupRadiusTokensNoChildren,
  errorSetupRadiusTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma radii into a clean object
 *
 * @exports
 * @function
 * @param {object} radiusFrame - The radii frame from Figma
 * @returns {object} - Returns an object with all the radii
 * @throws {errorSetupRadiusTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupRadiusTokensNoChildren} - When missing children in Figma frame
 * @throws {errorSetupRadiusTokensMissingProps} - When missing required props in frame children
 */
export function setupRadiusTokens(radiusFrame) {
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
