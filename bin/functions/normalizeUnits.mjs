import { units } from '../meta/units.mjs';
import { errorNormalizeUnits, errorNormalizeUnitsUndefined } from '../meta/errors.mjs';

/**
 * Normalize and convert units
 *
 * @exports
 * @function
 * @param {number} value - Value to normalize
 * @param {string} currentUnit - The current unit to of the incoming value
 * @param {string} newUnit - The unit to convert to
 * @returns {string} - Returns new unit
 * @throws {error} - When missing parameters
 */
export function normalizeUnits(value, currentUnit, newUnit) {
  if (!value || !currentUnit || !newUnit) throw new Error(errorNormalizeUnits);

  let rootSize = undefined;
  let unitSize = undefined;

  // Set root size
  if (currentUnit === 'px') {
    rootSize = units.globalPxSize;
  }

  // Set root size; Kind of a hack? Not sure if this is going to break anything. Used because of 'unitless'
  if (currentUnit === 'percent') {
    rootSize = units.globalPxSize;
  }

  // Set new unit
  if (newUnit === 'rem' || newUnit === 'em') {
    unitSize = units.globalRemSize;
  }

  if (newUnit === 'unitless') {
    unitSize = value / 100;
  }

  // Convert letter spacing to something that seems more correct
  if (currentUnit === 'letterSpacing' && newUnit === 'adjustedSpacing') {
    return `${parseFloat(value * 1.5).toFixed(2)}px`;
  }

  // Add px to corner radius
  if (currentUnit === 'cornerRadius' && newUnit === 'adjustedRadius') {
    return `${value}px`;
  }

  if (rootSize === undefined || unitSize === undefined)
    throw new Error(errorNormalizeUnitsUndefined);

  if (newUnit === 'unitless') {
    return unitSize;
  } else {
    const ADJUSTED_VALUE = value * (rootSize / unitSize);
    return `${ADJUSTED_VALUE}${newUnit}`;
  }
}
