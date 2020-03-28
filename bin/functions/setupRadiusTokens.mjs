import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

import {
  errorSetupRadiusTokensNoFrame,
  errorSetupRadiusTokensNoChildren,
  errorSetupRadiusTokensMissingProps
} from '../meta/errors.mjs';

/**
 * Places all Figma radii into a clean object
 *
 * @exports
 * @function
 * @param {object} radiusFrame - The radii frame from Figma
 * @returns {object} - Returns an object with all the radii
 * @throws {error} - When there is no provided Figma frame
 */
export function setupRadiusTokens(radiusFrame) {
  if (!radiusFrame) throw new Error(errorSetupRadiusTokensNoFrame);
  if (!radiusFrame.children) throw new Error(errorSetupRadiusTokensNoChildren);

  let cornerRadiusObject = {};

  radiusFrame.children.forEach(type => {
    if (!type.name) throw new Error(errorSetupRadiusTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);

    const RADIUS = (() => {
      if (type.cornerRadius)
        return normalizeUnits(type.cornerRadius, 'cornerRadius', 'adjustedRadius');
      else return `0px`;
    })();

    cornerRadiusObject[name] = RADIUS;
  });

  return cornerRadiusObject;
}
