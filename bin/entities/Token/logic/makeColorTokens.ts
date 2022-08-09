import { FRAME as Frame } from '../../../contracts/Figma';
import { ColorTokens } from '../../../contracts/Tokens';
import { OutputFormatColors } from '../../../contracts/Config';
import { Color } from '../../../contracts/Parsing';

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

  const colors: Record<string, string> = {};
  const tokens = colorFrame.children.reverse();
  tokens.forEach((item: Frame) =>
    makeColorToken(item, colors, outputFormatColors, camelizeTokenNames)
  );

  return colors as ColorTokens;
}

function makeColorToken(
  item: Frame,
  colors: Color,
  outputFormatColors: OutputFormatColors,
  camelizeTokenNames?: boolean
) {
  // @ts-ignore
  if (!item.fills || item.fills.length === 0) return null;

  const name = sanitizeString(item.name, camelizeTokenNames);
  const fills = item.fills[0];

  if (fills.type === 'SOLID') colors[name] = createSolidColorString(fills, outputFormatColors);
  else if (fills.type === 'GRADIENT_LINEAR') colors[name] = createLinearGradientString(fills);
  else if (fills.type === 'GRADIENT_RADIAL') colors[name] = createRadialGradientString(fills);
}
