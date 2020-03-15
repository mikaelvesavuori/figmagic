import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { roundColorValue } from './roundColorValue.mjs';

import {
  errorSetupShadowTokensNoFrame,
  errorSetupShadowTokensNoChildren,
  errorSetupShadowTokensMissingProps
} from '../meta/errors.mjs';

/**
 * Places all Figma line heights into a clean object
 *
 * @exports
 * @function
 * @param {object} shadowFrame - The line heights frame from Figma
 * @returns {object} - Returns an object with all the line heights
 * @throws {error} - When there is no provided Figma frame
 */
export function setupShadowTokens(shadowFrame) {
  if (!shadowFrame) throw new Error(errorSetupShadowTokensNoFrame);
  if (!shadowFrame.children) throw new Error(errorSetupShadowTokensNoChildren);

  let shadowObject = {};

  shadowFrame.children.forEach(type => {
    if (!type.name || !type.effects) throw new Error(errorSetupShadowTokensMissingProps);

    // TODO: Improve so shadow does not have to be the first effect
    let name = camelize(type.name);
    name = formatName(name);

    const X = type.effects[0].offset.x;
    const Y = type.effects[0].offset.y;
    const RADIUS = type.effects[0].radius;
    const R = roundColorValue(type.effects[0].color.r);
    const G = roundColorValue(type.effects[0].color.g);
    const B = roundColorValue(type.effects[0].color.b);
    const A = roundColorValue(type.effects[0].color.a, 1);

    // TODO: Ensure it looks correct, and now 10px is hardcoded since no such value exists in Figma?
    shadowObject[name] = `${X}px ${Y}px 10px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
  });

  return shadowObject;
}
