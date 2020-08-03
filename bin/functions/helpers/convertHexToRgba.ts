import { roundColorValue } from './roundColorValue';

import { errorConvertHexToRgba } from '../../meta/errors';

/**
 * Convert hex color to RGBA
 *
 * @exports
 * @function
 * @param {number} r - Color value, red
 * @param {number} g - Color value, green
 * @param {number} b - Color value, blue
 * @param {number} a - Color value, alpha
 * @returns {string} - Returns cleaned string literal with RGBA-formatted color for CSS
 * @throws {errorConvertHexToRgba} - Throws error if no R/G/B/A values provided
 */
export function convertHexToRgba(r: number, g: number, b: number, a: number): string {
  if (!r || !g || !b || !a) throw new Error(errorConvertHexToRgba);

  const R = roundColorValue(r, 255);
  const G = roundColorValue(g, 255);
  const B = roundColorValue(b, 255);
  const A = roundColorValue(a, 1);

  return `rgba(${R}, ${G}, ${B}, ${A})`;
}
