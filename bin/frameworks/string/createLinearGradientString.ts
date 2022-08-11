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

  const GRADIENT_STOPS = fills.gradientStops ? fills.gradientStops : null;
  if (!GRADIENT_STOPS) throw Error();

  const DEGREE = calculateDegree(fills.gradientHandlePositions as unknown as Vector[]);
  if (DEGREE) str += `${DEGREE}deg, `;

  GRADIENT_STOPS.forEach((fill: GradientStop, index: number) => {
    const R = roundColorValue(fill.color?.r, 255);
    const G = roundColorValue(fill.color?.g, 255);
    const B = roundColorValue(fill.color?.b, 255);
    // @ts-ignore TODO
    const A = roundColorValue(fill.opacity ? fill.opacity : fill.color?.a, 1);
    // @ts-ignore TODO
    const POS = roundColorValue(parseFloat(fill.position ? fill.position : '0'), 100);

    if (index > 0) str += ` `;
    str += `rgba(${R}, ${G}, ${B}, ${A}) ${POS}%`;
    if (index < GRADIENT_STOPS.length - 1) str += `,`;
    if (index >= GRADIENT_STOPS.length - 1) str += `)`;
  });

  return str;
}

/**
 * @description Wrapper for any degree calculation logic
 */
function calculateDegree(gradientHandlePositions: Vector[]) {
  return calculateDegree2Point(gradientHandlePositions[0], gradientHandlePositions[1]);
}
