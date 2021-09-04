import {
  ErrorNormalizeUnits,
  ErrorNormalizeUnitsNoRemSize,
  ErrorNormalizeUnitsUndefined
} from '../errors/errors';

/**
 * @description Normalize and convert units
 */
export function normalizeUnits(
  value: number,
  currentUnit: string,
  newUnit: string,
  remSize?: number
): string {
  if (!value || !currentUnit || !newUnit) throw Error(ErrorNormalizeUnits);

  let rootSize = undefined;
  let unitSize = undefined;

  // Set root size
  if (currentUnit === 'px') rootSize = 1;

  // Set root size; Kind of a hack? Not sure if this is going to break anything. Used because of 'unitless'
  if (currentUnit === 'percent') rootSize = 1;

  // Set new unit
  if (newUnit === 'rem' || newUnit === 'em') {
    if (!remSize) throw Error(ErrorNormalizeUnitsNoRemSize);
    unitSize = remSize;
  }

  if (newUnit === 'unitless') unitSize = value / 100;

  // Add px to corner radius
  if (currentUnit === 'cornerRadius' && newUnit === 'adjustedRadius') return `${value}px`;

  if (rootSize === undefined || unitSize === undefined) throw Error(ErrorNormalizeUnitsUndefined);

  if (newUnit === 'unitless') return `${unitSize}`;
  else {
    const ADJUSTED_VALUE = value * (rootSize / unitSize);
    return `${ADJUSTED_VALUE}${newUnit}`;
  }
}
