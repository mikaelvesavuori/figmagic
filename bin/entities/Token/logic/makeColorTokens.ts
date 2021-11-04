import { FRAME as Frame } from '../../../contracts/Figma';
import { ColorTokens } from '../../../contracts/Tokens';
import { OutputFormatColors } from '../../../contracts/Config';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';
import { createSolidColorString } from '../../../frameworks/string/createSolidColorString';
import { createLinearGradientString } from '../../../frameworks/string/createLinearGradientString';
import { createRadialGradientString } from '../../../frameworks/string/createRadialGradientString';

import {
  ErrorMakeColorTokensNoFrame,
  ErrorMakeColorTokensNoChildren
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma color frames into a clean object
 */
export function makeColorTokens(
  colorFrame: Frame,
  outputFormatColors: OutputFormatColors,
  camelizeTokenNames?: boolean
): ColorTokens {
  if (!colorFrame) throw Error(ErrorMakeColorTokensNoFrame);
  if (!colorFrame.children) throw Error(ErrorMakeColorTokensNoChildren);

  const colors: Record<string, unknown> = {};
  const TOKENS = colorFrame.children.reverse();
  TOKENS.forEach((item: Frame) =>
    makeColorToken(item, colors, outputFormatColors, camelizeTokenNames)
  );

  return colors;
}

function makeColorToken(
  item: Frame,
  colors: Record<string, unknown>,
  outputFormatColors: OutputFormatColors,
  camelizeTokenNames?: boolean
) {
  // @ts-ignore
  if (!item.fills || item.fills.length === 0) return null;

  const NAME = sanitizeString(item.name, camelizeTokenNames);
  const FILLS = item.fills[0];

  if (FILLS.type === 'SOLID') colors[NAME] = createSolidColorString(FILLS, outputFormatColors);
  else if (FILLS.type === 'GRADIENT_LINEAR') colors[NAME] = createLinearGradientString(FILLS);
  else if (FILLS.type === 'GRADIENT_RADIAL') colors[NAME] = createRadialGradientString(FILLS);
}
