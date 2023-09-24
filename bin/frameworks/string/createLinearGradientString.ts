import { GradientStop, Paint, Vector } from '../../contracts/Figma';

import { calculateDegree2Point } from '../../frameworks/string/calculateDegree2Point';
import { roundColorValue } from '../../frameworks/string/roundColorValue';

import { ErrorCreateLinearGradientString } from '../../frameworks/errors/errors';
/**
 * @description Create an RGBA-based CSS linear gradient string
 */
export function createLinearGradientString(fills: Paint): string {
  if (!fills) throw Error(ErrorCreateLinearGradientString);
  if (!fills.gradientHandlePositions) throw Error(ErrorCreateLinearGradientString);

  let str = `linear-gradient(`;

  const gradientStops = fills.gradientStops ? fills.gradientStops : null;
  if (!gradientStops) throw Error();

  const gradientHandlePositions = fills.gradientHandlePositions as unknown as Vector[];
  const degree = calculateDegree2Point(gradientHandlePositions[0], gradientHandlePositions[1]);
  if (degree) str += `${degree}deg, `;

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
