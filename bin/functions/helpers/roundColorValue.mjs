import { errorRoundColorValue } from '../../meta/errors.mjs';

/**
 * Round color values so they are whole integers
 *
 * @exports
 * @function
 * @param {number} quantity - Incoming quantity value
 * @param {number} scale - Maximum value
 * @returns {number} - The final number
 */
export function roundColorValue(quantity = 0.0, scale = 255) {
  const MIN_VALUE = 0.0;
  const MAX_VALUE = 1.0;

  //if (!quantity) throw new Error(errorRoundColor);
  let _quantity = parseFloat(quantity);
  if (parseFloat(_quantity) < MIN_VALUE) _quantity = MIN_VALUE;
  if (parseFloat(_quantity) > MAX_VALUE) _quantity = MAX_VALUE;
  if (scale < 0 || scale > 255) throw new Error(errorRoundColorValue);
  return parseInt((parseFloat(_quantity) * parseInt(scale)).toFixed(0));
}
