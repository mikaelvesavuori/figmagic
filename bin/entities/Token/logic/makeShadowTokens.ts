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
  if (!shadowFrame) throw new Error(ErrorMakeShadowTokensNoFrame);
  if (!shadowFrame.children) throw new Error(ErrorMakeShadowTokensNoChildren);

  const shadows: Record<string, unknown> = {};

  const TOKENS = shadowFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.effects) throw new Error(ErrorMakeShadowTokensMissingProps);

    const NAME = camelize(item.name);

    const effects = item.effects.map((effect) => {
      if (effect.type === 'DROP_SHADOW') return effect;
      return null;
    });

    shadows[NAME] = ``;

    if (effects.length > 0) {
      effects.forEach((e, index) => {
        // Get rid of Typescript (strict) error
        if (e) {
          const X = e.offset.x;
          const Y = e.offset.y;
          const RADIUS = e.radius;
          const R = roundColorValue(e.color.r);
          const G = roundColorValue(e.color.g);
          const B = roundColorValue(e.color.b);
          const A = roundColorValue(e.color.a, 1);

          shadows[NAME] += `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
          if (index !== effects.length - 1) shadows[NAME] += `, `;
        }
      });
    }
  });

  // @ts-ignore
  return shadows as ShadowTokens;
}
