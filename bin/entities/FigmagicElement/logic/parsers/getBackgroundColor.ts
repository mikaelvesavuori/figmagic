import { FRAME as Frame } from '../../../../contracts/Figma';
import { Paint } from '../../../../contracts/Figma';

import { createSolidColorString } from '../../../../frameworks/string/createSolidColorString';
import { createLinearGradientString } from '../../../../frameworks/string/createLinearGradientString';

import { ErrorGetBackgroundColor } from '../../../../frameworks/errors/errors';

export function getBackgroundColor(element: Frame): string | null {
  if (!element) throw new Error(ErrorGetBackgroundColor);
  if (!element.fills || !element.fills[0] || !element.fills[0].type) return null;

  const FILLS: Paint = element.fills[0];

  if (FILLS.type === 'SOLID') return createSolidColorString(FILLS);
  if (FILLS.type === 'GRADIENT_LINEAR') return createLinearGradientString(FILLS);

  return null;
}
