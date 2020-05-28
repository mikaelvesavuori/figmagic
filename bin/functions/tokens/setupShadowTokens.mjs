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
 * @throws {errorSetupShadowTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupShadowTokensNoChildren} - When missing children in Figma frame
 * @throws {errorSetupShadowTokensMissingProps} - When missing required props in frame children
 */
export function setupShadowTokens(shadowFrame) {
  if (!shadowFrame) throw new Error(errorSetupShadowTokensNoFrame);
  if (!shadowFrame.children) throw new Error(errorSetupShadowTokensNoChildren);

  let shadowObject = {};

  shadowFrame.children.forEach((type) => {
    if (!type.name || !type.effects) throw new Error(errorSetupShadowTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);

    const effects = type.effects.map((effect) => {
      if (effect.type === 'DROP_SHADOW') return effect;
    });

    shadowObject[name] = ``;

    if (effects.length > 0) {
      effects.forEach((e, index) => {
        const X = e.offset.x;
        const Y = e.offset.y;
        const RADIUS = e.radius;
        const R = roundColorValue(e.color.r);
        const G = roundColorValue(e.color.g);
        const B = roundColorValue(e.color.b);
        const A = roundColorValue(e.color.a, 1);

        shadowObject[name] += `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
        if (index !== effects.length - 1) shadowObject[name] += `, `;
      });
    }
  });

  return shadowObject;
}
