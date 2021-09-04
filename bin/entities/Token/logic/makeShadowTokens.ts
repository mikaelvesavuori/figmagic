import { FRAME as Frame } from '../../../contracts/Figma';
import { ShadowTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';
import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import {
  ErrorMakeShadowTokensNoFrame,
  ErrorMakeShadowTokensNoChildren,
  ErrorMakeShadowTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma shadows into a clean object
 */
export function makeShadowTokens(shadowFrame: Frame): ShadowTokens {
  if (!shadowFrame) throw Error(ErrorMakeShadowTokensNoFrame);
  if (!shadowFrame.children) throw Error(ErrorMakeShadowTokensNoChildren);

  const shadows: Record<string, unknown> = {};
  const TOKENS = shadowFrame.children;
  TOKENS.forEach((item: Frame) => makeShadowToken(item, shadows));

  return shadows;
}

function makeShadowToken(item: Frame, shadows: Record<string, unknown>) {
  if (!item.name || !item.effects) throw Error(ErrorMakeShadowTokensMissingProps);

  const NAME = camelize(item.name);

  const EFFECTS = item.effects.map((effect) => {
    if (effect.type === 'DROP_SHADOW') return effect;
    return null;
  });

  shadows[NAME] = ``;

  if (EFFECTS.length > 0) {
    EFFECTS.forEach((effect, index) => {
      if (effect) {
        const X = effect.offset.x;
        const Y = effect.offset.y;
        const RADIUS = effect.radius;
        const R = roundColorValue(effect.color.r);
        const G = roundColorValue(effect.color.g);
        const B = roundColorValue(effect.color.b);
        const A = roundColorValue(effect.color.a, 1);

        shadows[NAME] += `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
        if (index !== EFFECTS.length - 1) shadows[NAME] += `, `;
      }
    });
  }
}
