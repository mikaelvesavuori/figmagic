import { GradientStop, Paint } from '../../contracts/Figma';

import { roundColorValue } from '../../frameworks/string/roundColorValue';

import { ErrorCreateRadialGradientString } from '../../frameworks/errors/errors';
/**
 * @description Create an RGBA-based CSS radial gradient string
 */
export function createRadialGradientString(fills: Paint): string {
  if (!fills) throw Error(ErrorCreateRadialGradientString);
  if (!fills.gradientHandlePositions) throw Error(ErrorCreateRadialGradientString);

  const position = (() => {
    // @ts-ignore
    const pos1 = fills.gradientHandlePositions[0];
    // @ts-ignore
    const pos2 = fills.gradientHandlePositions[1];
    // @ts-ignore
    const pos3 = fills.gradientHandlePositions[2];

    const start = (pos1.x * 100 - pos3.x * 100).toFixed(1);
    const end = (pos2.y * 100 - pos1.y * 100).toFixed(1);
    const x = (pos1.x * 100).toFixed(1);
    const y = (pos1.y * 100).toFixed(1);

    return `${start}% ${end}% at ${x}% ${y}%`;
  })();

  let str = `radial-gradient(${position}, `;

  const gradientStops = fills.gradientStops || null;
  if (!gradientStops) throw Error();

  gradientStops.forEach((fill: GradientStop, index: number) => {
    const R = roundColorValue(fill.color?.r, 255);
    const G = roundColorValue(fill.color?.g, 255);
    const B = roundColorValue(fill.color?.b, 255);
    // @ts-ignore
    const A = roundColorValue(fill.opacity ? fill.opacity : fill.color?.a, 1);
    // @ts-ignore
    const position = roundColorValue(parseFloat(fill.position ? fill.position : '0'), 100);

    if (index > 0) str += ` `;
    str += `rgba(${R}, ${G}, ${B}, ${A}) ${position}%`;
    if (index < gradientStops.length - 1) str += `,`;
    if (index >= gradientStops.length - 1) str += `)`;
  });

  return str;
}
