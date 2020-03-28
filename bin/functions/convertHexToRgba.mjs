import { roundColorValue } from './roundColorValue.mjs';

import { errorConvertHexToRgba } from '../meta/errors.mjs';

/**
 * Description (TODO)
 *
 * @param r
 * @param g
 * @param b
 * @param a
 */
export function convertHexToRgba(r, g, b, a) {
  if (!r && !g && !b && !a) throw new Error(errorConvertHexToRgba);

  const R = roundColorValue(r, 255);
  const G = roundColorValue(g, 255);
  const B = roundColorValue(b, 255);
  const A = roundColorValue(a, 1);

  return `rgba(${R}, ${G}, ${B}, ${A})`;
}
