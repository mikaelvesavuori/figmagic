import { FRAME as Frame, Paint } from '../../../../contracts/Figma';
import { OutputFormatColors } from '../../../../contracts/Config';

import { createSolidColorString } from '../../../../frameworks/string/createSolidColorString';
import { createLinearGradientString } from '../../../../frameworks/string/createLinearGradientString';

import { ErrorGetBackgroundColor } from '../../../../frameworks/errors/errors';

export function getBackgroundColor(
  element: Frame,
  outputFormatColors: OutputFormatColors
): string | null {
  if (!element) throw Error(ErrorGetBackgroundColor);
  // TODO: Does not support background-color for text
  if (!element.fills || !element.fills[0] || !element.fills[0].type || element.type === 'TEXT')
    return null;

  const fills: Paint = element.fills[0];

  if (fills.type === 'SOLID') return createSolidColorString(fills, outputFormatColors);
  if (fills.type === 'GRADIENT_LINEAR') return createLinearGradientString(fills);

  return null;
}
