import {
  errorNormalizeUnits,
  errorNormalizeUnitsNoRemSize,
  errorNormalizeUnitsUndefined
} from '../../meta/errors';

/**
 * Normalize and convert units
 *
 * @exports
 * @function
 * @param {number} value - Value to normalize
 * @param {string} currentUnit - The current unit to of the incoming value
 * @param {string} spacingUnit - The spacing unit
 * @param {number} remSize - The body rem size
 * @returns {string} - Returns new unit
 * @throws {errorNormalizeUnits} - When missing parameters
 */
export function normalizeUnits(
  value: number,
  currentUnit: string,
  newUnit: string,
  remSize: number
): string {
  if (!value || !currentUnit || !newUnit) throw new Error(errorNormalizeUnits);

  let rootSize = undefined;
  let unitSize = undefined;

  // Set root size
  if (currentUnit === 'px') {
    rootSize = 1;
  }

  // Set root size; Kind of a hack? Not sure if this is going to break anything. Used because of 'unitless'
  if (currentUnit === 'percent') {
    rootSize = 1;
  }

  // Set new unit
  if (newUnit === 'rem' || newUnit === 'em') {
    if (!remSize) throw new Error(errorNormalizeUnitsNoRemSize);
    unitSize = remSize;
  }

  if (newUnit === 'unitless') {
    unitSize = value / 100;
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
