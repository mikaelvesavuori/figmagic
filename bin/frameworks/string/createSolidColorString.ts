import { Paint } from '../../contracts/Figma';
import { OutputFormatColors } from '../../contracts/Config';

import { roundColorValue } from '../../frameworks/string/roundColorValue';

import { ErrorCreateSolidColorString } from '../../frameworks/errors/errors';
import { convertRgbaToHex } from './convertRgbaToHex';

/**
 * @description Create an RGBA- or hex-based CSS color string
 */
export function createSolidColorString(
  fills: Paint,
  outputFormatColors: OutputFormatColors
): string {
  if (!fills) throw Error(ErrorCreateSolidColorString);

  const useHex = outputFormatColors === 'hex';

  const R = roundColorValue(fills.color?.r, 255);
  const G = roundColorValue(fills.color?.g, 255);
  const B = roundColorValue(fills.color?.b, 255);
  const A = roundColorValue(fills.opacity ? fills.opacity : fills.color?.a, 1);

  const rgbaString = `rgba(${R}, ${G}, ${B}, ${A})`;

  return useHex ? convertRgbaToHex(rgbaString) : rgbaString;
}
