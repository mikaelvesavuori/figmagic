import { errorRoundColor, errorRoundColorValue } from '../meta/errors.mjs';

/**
 * Round color values so they are whole integers
 *
 * @exports
 * @function
 * @param {number} quantity - Incoming quantity value
 * @param {number} scale - Maximum value
 * @returns {number} - The final number
 */
export function roundColorValue(quantity, scale = 255) {
  if (!quantity) throw new Error(errorRoundColor);
  if (scale < 0 || scale > 255) throw new Error(errorRoundColorValue);
  return (parseFloat(quantity) * parseInt(scale)).toFixed(0);
}
