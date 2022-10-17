import { FRAME as Frame } from '../../../contracts/Figma';
import { ColorTokens, Tokens } from '../../../contracts/Tokens';
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
  camelizeTokenNames?: boolean,
  depth = 0
): ColorTokens {
  if (!colorFrame) throw Error(ErrorMakeColorTokensNoFrame);
  if (!colorFrame.children) throw Error(ErrorMakeColorTokensNoChildren);

  const colors: ColorTokens = {};
  const tokens = colorFrame.children.reverse();
  tokens.forEach((item: Frame) => {
    if (depth === 0 && item.type === 'FRAME') {
      colors[item.name] = makeColorTokens(
        item,
        outputFormatColors,
        camelizeTokenNames,
        depth + 1
      ) as Tokens;
    } else {
      makeColorToken(item, colors, outputFormatColors, camelizeTokenNames);
    }
  });

  return colors;
}

function makeColorToken(
  item: Frame,
  colors: ColorTokens,
  outputFormatColors: OutputFormatColors,
  camelizeTokenNames?: boolean
): void {
  if (!item.fills || item.fills.length === 0) return;

  const name = sanitizeString(item.name, camelizeTokenNames);
  const fills = item.fills[0];

  if (fills.type === 'SOLID') colors[name] = createSolidColorString(fills, outputFormatColors);
  else if (fills.type === 'GRADIENT_LINEAR') colors[name] = createLinearGradientString(fills);
  else if (fills.type === 'GRADIENT_RADIAL') colors[name] = createRadialGradientString(fills);
}
