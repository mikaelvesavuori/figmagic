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

  const rootSize = setRootSize(currentUnit);
  const unitSize = setUnitSize(value, newUnit, remSize);

  if (rootSize === undefined || unitSize === undefined) throw Error(ErrorNormalizeUnitsUndefined);

  return getAdjustedValues(value, rootSize, unitSize, newUnit);
}

function setRootSize(currentUnit: string): number | undefined {
  if (currentUnit === 'px' || currentUnit === 'percent') return 1;
  return undefined;
}

function setUnitSize(value: number, newUnit: string, remSize?: number): number | undefined {
  if (newUnit === 'unitless') return value / 100;
  else if (newUnit === 'rem' || newUnit === 'em' || newUnit === 'px') {
    if (!remSize) throw Error(ErrorNormalizeUnitsNoRemSize);
    return remSize;
  } else return undefined;
}

function getAdjustedValues(value: number, rootSize: number, unitSize: number, newUnit: string) {
  if (newUnit === 'unitless') return `${unitSize}`;
  else if (newUnit === 'px') return `${value}${newUnit}`;
  else {
    const adjustedValue = rootSize && unitSize ? value * (rootSize / unitSize) : value;
    return `${adjustedValue}${newUnit}`;
  }
}
