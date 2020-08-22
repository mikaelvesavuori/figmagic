import { camelize } from '../helpers/camelize';
import { roundColorValue } from '../helpers/roundColorValue';

import {
  errorSetupShadowTokensNoFrame,
  errorSetupShadowTokensNoChildren,
  errorSetupShadowTokensMissingProps
} from '../../frameworks/errors/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma shadows into a clean object
 *
 * @param shadowFrame The shadows frame from Figma
 */
export function setupShadowTokens(shadowFrame: Frame): ShadowFrame {
  if (!shadowFrame) throw new Error(errorSetupShadowTokensNoFrame);
  if (!shadowFrame.children) throw new Error(errorSetupShadowTokensNoChildren);

  let shadowObject = {};

  shadowFrame.children.forEach((type) => {
    if (!type.name || !type.effects) throw new Error(errorSetupShadowTokensMissingProps);

    const name = camelize(type.name);

    const effects = type.effects.map((effect) => {
      if (effect.type === 'DROP_SHADOW') return effect;
      return null;
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
