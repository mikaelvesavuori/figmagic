import { FRAME as Frame } from '../../../../contracts/Figma';

import { roundColorValue } from '../../../../frameworks/string/roundColorValue';

import { ErrorGetBorderColor } from '../../../../frameworks/errors/errors';

export function getBorderColor(element: Frame): string | null {
  if (!element) throw Error(ErrorGetBorderColor);
  if (!(element.strokes && element.strokes.length > 0 && element.strokes[0].type === 'SOLID'))
    return null;

  if (!element.strokes[0].color) throw Error(ErrorGetBorderColor);

  const R = roundColorValue(element.strokes[0].color.r);
  const G = roundColorValue(element.strokes[0].color.g);
  const B = roundColorValue(element.strokes[0].color.b);
  const A = roundColorValue(element.strokes[0].color.a, 1);

  return `rgba(${R}, ${G}, ${B}, ${A})`;
}
