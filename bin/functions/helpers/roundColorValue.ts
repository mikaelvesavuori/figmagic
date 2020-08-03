import { errorRoundColorValue } from '../../meta/errors';

/**
 * Round color values so they are whole integers
 *
 * @exports
 * @function
 * @param {number} quantity - Incoming quantity value, as float
 * @param {number} scale - Maximum value, as int (?)
 * @returns {number} - The final number
 */
export function roundColorValue(quantity: number = 0.0, scale: number = 255): number {
  if (scale < 0 || scale > 255) throw new Error(errorRoundColorValue);

  const MIN_VALUE = 0.0;
  const MAX_VALUE = 1.0;

  let _quantity = parseFloat(quantity);
  if (parseFloat(_quantity) < MIN_VALUE) _quantity = MIN_VALUE;
  if (parseFloat(_quantity) > MAX_VALUE) _quantity = MAX_VALUE;

  // We will assume this means the alpha channel or something similar
  if (scale <= 1.0) return parseFloat(_quantity.toFixed(2));

  return parseInt((parseFloat(_quantity) * parseInt(scale)).toFixed(0));
}
