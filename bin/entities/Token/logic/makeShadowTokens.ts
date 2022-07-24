import { FRAME as Frame } from '../../../contracts/Figma';
import { ShadowTokens } from '../../../contracts/Tokens';
import { ShadowUnit } from '../../../contracts/Config';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';
import { roundColorValue } from '../../../frameworks/string/roundColorValue';

import {
  ErrorMakeShadowTokensNoFrame,
  ErrorMakeShadowTokensNoChildren,
  ErrorMakeShadowTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma shadows into a clean object
 */
export function makeShadowTokens(
  shadowFrame: Frame,
  shadowUnit: ShadowUnit,
  remSize: number,
  camelizeTokenNames?: boolean
): ShadowTokens {
  if (!shadowFrame) throw Error(ErrorMakeShadowTokensNoFrame);
  if (!shadowFrame.children) throw Error(ErrorMakeShadowTokensNoChildren);

  const shadows: Record<string, unknown> = {};
  const TOKENS = shadowFrame.children.reverse();
  TOKENS.forEach((item: Frame) =>
    makeShadowToken(item, shadows, shadowUnit, remSize, camelizeTokenNames)
  );

  return shadows;
}

function makeShadowToken(
  item: Frame,
  shadows: Record<string, unknown>,
  shadowUnit: ShadowUnit,
  remSize: number,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.effects) throw Error(ErrorMakeShadowTokensMissingProps);

  const NAME = sanitizeString(item.name, camelizeTokenNames);

  let effects = item.effects.map((effect) => {
    if (effect.type === 'DROP_SHADOW') return effect;
    return null;
  });
  effects = effects.reverse();

  shadows[NAME] = ``;

  if (effects.length > 0) {
    effects.forEach((effect, index) => {
      if (effect) {
        const X = (() => {
          if (shadowUnit === 'px') return effect.offset.x + shadowUnit;
          else return (effect.offset.x as unknown as number) / remSize + shadowUnit;
        })();

        const Y = (() => {
          if (shadowUnit === 'px') return effect.offset.y + shadowUnit;
          else return (effect.offset.y as unknown as number) / remSize + shadowUnit;
        })();

        const RADIUS = (() => {
          if (shadowUnit === 'px') return effect.radius + shadowUnit;
          else return (effect.radius as unknown as number) / remSize + shadowUnit;
        })();

        const R = roundColorValue(effect.color.r);
        const G = roundColorValue(effect.color.g);
        const B = roundColorValue(effect.color.b);
        const A = roundColorValue(effect.color.a, 1);

        shadows[NAME] += `${X} ${Y} ${RADIUS} rgba(${R}, ${G}, ${B}, ${A})`;
        if (index !== effects.length - 1) shadows[NAME] += `, `;
      }
    });
  }
}
