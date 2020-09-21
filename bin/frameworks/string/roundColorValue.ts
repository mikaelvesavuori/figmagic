import { ErrorRoundColorValue } from '../errors/errors';

/**
 * @description Round color values so they are whole integers
 */
export function roundColorValue(quantity = 0.0, scale = 255): number {
  if (scale < 0 || scale > 255) throw new Error(ErrorRoundColorValue);

  // Set bounds
  const MIN_VALUE = 0.0;
  const MAX_VALUE = 1.0;
  if (quantity < MIN_VALUE) quantity = MIN_VALUE;
  if (quantity > MAX_VALUE) quantity = MAX_VALUE;

  // We will assume this means the alpha channel or something similar
  if (scale <= 1.0) return parseFloat(quantity.toFixed(2));

  return parseFloat((quantity * scale).toFixed(0));
}
