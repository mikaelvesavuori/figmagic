import { ErrorRoundColorValue } from '../errors/errors';

/**
 * @description Round color values so they are whole integers
 */
export function roundColorValue(quantity = 0.0, scale = 255): number {
  if (scale < 0 || scale > 255) throw Error(ErrorRoundColorValue);

  // Set bounds
  const minValue = 0.0;
  const maxValue = 1.0;
  if (quantity < minValue) quantity = minValue;
  if (quantity > maxValue) quantity = maxValue;

  // We will assume this means the alpha channel or something similar
  if (scale <= 1.0) return parseFloat(quantity.toFixed(2));

  return parseFloat((quantity * scale).toFixed(0));
}
