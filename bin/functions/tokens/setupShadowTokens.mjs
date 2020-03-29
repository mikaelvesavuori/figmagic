import { camelize } from '../helpers/camelize.mjs';
import { roundColorValue } from '../helpers/roundColorValue.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupShadowTokensNoFrame,
  errorSetupShadowTokensNoChildren,
  errorSetupShadowTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma shadows into a clean object
 *
 * @exports
 * @function
 * @param {object} shadowFrame - The shadows frame from Figma
 * @returns {object} - Returns an object with all the shadows
 * @throws {error} - When there is no provided Figma frame
 */
export function setupShadowTokens(shadowFrame) {
  if (!shadowFrame) throw new Error(errorSetupShadowTokensNoFrame);
  if (!shadowFrame.children) throw new Error(errorSetupShadowTokensNoChildren);

  let shadowObject = {};

  shadowFrame.children.forEach(type => {
    if (!type.name || !type.effects) throw new Error(errorSetupShadowTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);
    let dropShadow = null;

    type.effects.map(effect => {
      if (effect.type === 'DROP_SHADOW') {
        dropShadow = effect;
      }
    });

    if (dropShadow) {
      const X = dropShadow.offset.x;
      const Y = dropShadow.offset.y;
      const RADIUS = dropShadow.radius;
      const R = roundColorValue(dropShadow.color.r);
      const G = roundColorValue(dropShadow.color.g);
      const B = roundColorValue(dropShadow.color.b);
      const A = roundColorValue(dropShadow.color.a, 1);

      shadowObject[name] = `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
    } else shadowObject[name] = ``;
  });

  return shadowObject;
}
