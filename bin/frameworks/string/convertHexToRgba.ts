import { ErrorConvertHexToRgba } from '../errors/errors';

/**
 * @description Convert hex color to RGBA (full alpha). Expects a string like "#33ff00".
 * @see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
export function convertHexToRgba(color: string): string {
  if (!color) throw Error(ErrorConvertHexToRgba);

  const R = parseInt(color.slice(1, 3), 16);
  const G = parseInt(color.slice(3, 5), 16);
  const B = parseInt(color.slice(5, 7), 16);
  const A = 1;

  return `rgba(${R}, ${G}, ${B}, ${A})`;
}
