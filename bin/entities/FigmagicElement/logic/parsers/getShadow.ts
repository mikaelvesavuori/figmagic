import { FRAME as Frame } from '../../../../contracts/Figma';

import { roundColorValue } from '../../../../frameworks/string/roundColorValue';

import { ErrorGetShadow } from '../../../../frameworks/errors/errors';

export function getShadow(element: Frame): string | null {
  try {
    if (!element) throw Error(ErrorGetShadow);
    if (!(element.effects && element.effects[0] && element.effects[0].type === 'DROP_SHADOW'))
      return null;

    const DROP_SHADOW = element.effects[0];

    const X = DROP_SHADOW.offset.x;
    const Y = DROP_SHADOW.offset.y;
    const RADIUS = DROP_SHADOW.radius;
    const R = roundColorValue(DROP_SHADOW.color.r);
    const G = roundColorValue(DROP_SHADOW.color.g);
    const B = roundColorValue(DROP_SHADOW.color.b);
    const A = roundColorValue(DROP_SHADOW.color.a, 1);

    return `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
  } catch (error: any) {
    throw Error(error);
  }
}
