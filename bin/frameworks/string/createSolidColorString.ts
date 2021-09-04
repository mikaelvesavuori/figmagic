import { Paint } from '../../contracts/Figma';

import { roundColorValue } from '../../frameworks/string/roundColorValue';

import { ErrorCreateSolidColorString } from '../../frameworks/errors/errors';

/**
 * @description Create an RGBA-based CSS color string
 */
export function createSolidColorString(fills: Paint): string {
  if (!fills) throw Error(ErrorCreateSolidColorString);

  const R = roundColorValue(fills.color?.r, 255);
  const G = roundColorValue(fills.color?.g, 255);
  const B = roundColorValue(fills.color?.b, 255);
  const A = roundColorValue(fills.opacity ? fills.opacity : fills.color?.a, 1);
  return `rgba(${R}, ${G}, ${B}, ${A})`;
}
