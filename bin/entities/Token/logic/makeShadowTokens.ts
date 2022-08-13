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

  const shadows: Record<string, string> = {};
  const tokens = shadowFrame.children.reverse();
  tokens.forEach((item: Frame) =>
    makeShadowToken(item, shadows, shadowUnit, remSize, camelizeTokenNames)
  );

  return shadows;
}

function makeShadowToken(
  item: Frame,
  shadows: Record<string, string>,
  shadowUnit: ShadowUnit,
  remSize: number,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.effects) throw Error(ErrorMakeShadowTokensMissingProps);

  const name = sanitizeString(item.name, camelizeTokenNames);

  let effects = item.effects.map((effect) => {
    if (effect.type === 'DROP_SHADOW') return effect;
    return null;
  });
  effects = effects.reverse();

  shadows[name] = ``;

  if (effects.length > 0) {
    effects.forEach((effect, index) => {
      if (effect) {
        const X = getShadowXY(shadowUnit, effect.offset.x, remSize);
        const Y = getShadowXY(shadowUnit, effect.offset.y, remSize);
        const radius = getShadowRadius(shadowUnit, effect.radius, remSize);

        const R = roundColorValue(effect.color.r);
        const G = roundColorValue(effect.color.g);
        const B = roundColorValue(effect.color.b);
        const A = roundColorValue(effect.color.a, 1);

        shadows[name] += `${X} ${Y} ${radius} rgba(${R}, ${G}, ${B}, ${A})`;
        if (index !== effects.length - 1) shadows[name] += `, `;
      }
    });
  }
}

function getShadowXY(shadowUnit: ShadowUnit, offset: number, remSize: number) {
  if (shadowUnit === 'px') return offset + shadowUnit;
  else return (offset as unknown as number) / remSize + shadowUnit;
}

function getShadowRadius(shadowUnit: ShadowUnit, radius: number, remSize: number) {
  if (shadowUnit === 'px') return radius + shadowUnit;
  else return (radius as unknown as number) / remSize + shadowUnit;
}
