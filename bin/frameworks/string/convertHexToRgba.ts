import { roundColorValue } from './roundColorValue';

import { ErrorConvertHexToRgba } from '../errors/errors';

/**
 * @description Convert hex color to RGBA
 */
export function convertHexToRgba(r: number, g: number, b: number, a: number): string {
  if (!r || !g || !b || !a) throw Error(ErrorConvertHexToRgba);

  const R = roundColorValue(r, 255);
  const G = roundColorValue(g, 255);
  const B = roundColorValue(b, 255);
  const A = roundColorValue(a, 1);

  return `rgba(${R}, ${G}, ${B}, ${A})`;
}
