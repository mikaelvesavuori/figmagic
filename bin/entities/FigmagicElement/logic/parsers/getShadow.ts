import { FRAME as Frame } from '../../../../contracts/Figma';

import { roundColorValue } from '../../../../frameworks/string/roundColorValue';

import { ErrorGetShadow } from '../../../../frameworks/errors/errors';

export function getShadow(element: Frame): string | null {
  if (!element) throw Error(ErrorGetShadow);
  if (!(element.effects && element.effects[0] && element.effects[0].type === 'DROP_SHADOW'))
    return null;

  const dropShadow = element.effects[0];

  const X = dropShadow.offset.x;
  const Y = dropShadow.offset.y;
  const radius = dropShadow.radius;
  const R = roundColorValue(dropShadow.color.r);
  const G = roundColorValue(dropShadow.color.g);
  const B = roundColorValue(dropShadow.color.b);
  const A = roundColorValue(dropShadow.color.a, 1);

  return `${X}px ${Y}px ${radius}px rgba(${R}, ${G}, ${B}, ${A})`;
}
