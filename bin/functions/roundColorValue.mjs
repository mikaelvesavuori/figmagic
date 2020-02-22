import { errorRoundColorValue } from '../meta/errors.mjs';

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
	if (scale <= 255) {
		return (parseFloat(quantity) * parseInt(scale)).toFixed(0);
	} else {
		throw new Error(errorRoundColorValue);
	}
}
