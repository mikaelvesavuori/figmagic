import { ErrorConvertRgbaToHex } from '../../frameworks/errors/errors';

/**
 * @description Convert RGBA color to 8-digit hex color.
 */
export function convertRgbaToHex(color: string): string {
  if (!color) throw Error(ErrorConvertRgbaToHex);

  const values: string[] = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');

  const [r, g, b, a] = values;

  return rgbaToHex(parseInt(r), parseInt(g), parseInt(b), parseFloat(a));
}

/**
 * @description Output a 8-digit hex string.
 * @see https://caniuse.com/css-rrggbbaa
 * @see https://hashnode.com/post/understanding-rrggbbaa-color-notation-cisvdr52x088fwt53h1drf6m2
 */
function rgbaToHex(r: number, g: number, b: number, a: number) {
  const toHex = (number: number) => {
    const hex = Math.round(number).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const alpha = a >= 0 && a <= 1 ? toHex(a * 255) : 'ff';
  return '#' + toHex(r) + toHex(g) + toHex(b) + alpha;
}
