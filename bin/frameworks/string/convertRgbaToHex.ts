import { ErrorConvertRgbaToHex } from '../../frameworks/errors/errors';

// @see https://stackoverflow.com/questions/15898740/how-to-convert-rgba-to-a-transparency-adjusted-hex

export function convertRgbaToHex(color: string): string {
  if (!color) throw new Error(ErrorConvertRgbaToHex);

  const VALUES: any = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');

  const A: number = parseFloat(VALUES[3] || 1),
    R = Math.floor(A * parseInt(VALUES[0]) + (1 - A) * 255),
    G = Math.floor(A * parseInt(VALUES[1]) + (1 - A) * 255),
    B = Math.floor(A * parseInt(VALUES[2]) + (1 - A) * 255);

  return (
    '#' +
    ('0' + R.toString(16)).slice(-2) +
    ('0' + G.toString(16)).slice(-2) +
    ('0' + B.toString(16)).slice(-2)
  );
}
