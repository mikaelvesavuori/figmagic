import { FRAME as Frame } from '../../../../contracts/Figma';

import { roundColorValue } from '../../../../frameworks/string/roundColorValue';

import { ErrorGetBackgroundColor } from '../../../../frameworks/errors/errors';

export function getBackgroundColor(element: Frame): any {
  if (!element) throw new Error(ErrorGetBackgroundColor);
  if (!element.fills) return null;

  const fills = element.fills.filter((f) => f.type === 'SOLID');

  if (fills.length > 0) {
    if (!fills[0].color) throw new Error(ErrorGetBackgroundColor);
    const R = roundColorValue(fills[0].color.r);
    const G = roundColorValue(fills[0].color.g);
    const B = roundColorValue(fills[0].color.b);
    const A = roundColorValue(fills[0].color.a, 1);
    return `rgba(${R}, ${G}, ${B}, ${A})`;
  }

  // Check for linear gradient fills
  // We will check for this only after checking that no solid fill color exists
  const gradients = element.fills.filter((f) => f.type === 'GRADIENT_LINEAR');

  if (fills.length === 0 && gradients.length > 0) {
    let str = `linear-gradient(`;

    const GRADIENT_STOPS = gradients[0].gradientStops ? gradients[0].gradientStops : null;
    if (!GRADIENT_STOPS) throw new Error();

    GRADIENT_STOPS.forEach((fill, index) => {
      const R = roundColorValue(fill.color.r, 255);
      const G = roundColorValue(fill.color.g, 255);
      const B = roundColorValue(fill.color.b, 255);
      const A = roundColorValue(fill.color.a, 255);
      const POS = roundColorValue(fill.position, 100);

      if (index > 0) str += ` `;
      str += `rgba(${R}, ${G}, ${B}, ${A}) ${POS}%`;
      if (index < GRADIENT_STOPS.length - 1) str += `,`;
      if (index >= GRADIENT_STOPS.length - 1) str += `)`;
    });

    return str;
  }

  return null;
}
