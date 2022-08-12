import { ErrorConvertRgbaToHex } from '../../frameworks/errors/errors';

/**
 * @description Convert RGBA color to (non-alpha) hex color.
 * @see https://stackoverflow.com/questions/15898740/how-to-convert-rgba-to-a-transparency-adjusted-hex
 */
export function convertRgbaToHex(color: string): string {
  if (!color) throw Error(ErrorConvertRgbaToHex);

  const values: string[] = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');

  const A: number = parseFloat(values[3] || '1');
  const R: number = Math.floor(A * parseInt(values[0]) + (1 - A) * 255);
  const G: number = Math.floor(A * parseInt(values[1]) + (1 - A) * 255);
  const B: number = Math.floor(A * parseInt(values[2]) + (1 - A) * 255);

  return (
    '#' +
    ('0' + R.toString(16)).slice(-2) +
    ('0' + G.toString(16)).slice(-2) +
    ('0' + B.toString(16)).slice(-2)
  );
}
