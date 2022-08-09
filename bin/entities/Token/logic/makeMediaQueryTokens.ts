import { FRAME as Frame } from '../../../contracts/Figma';
import { MediaQueryTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorSetupMediaQueryTokensNoFrame,
  ErrorSetupMediaQueryTokensNoChildren,
  ErrorSetupMediaQueryTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma media queries into a clean object
 */
export function makeMediaQueryTokens(
  mediaQueryFrame: Frame,
  camelizeTokenNames?: boolean
): MediaQueryTokens {
  if (!mediaQueryFrame) throw Error(ErrorSetupMediaQueryTokensNoFrame);
  if (!mediaQueryFrame.children) throw Error(ErrorSetupMediaQueryTokensNoChildren);

  const mediaQueries: Record<string, string> = {};
  const tokens = mediaQueryFrame.children.reverse();
  tokens.forEach((item: Frame) => makeMediaQueryToken(item, mediaQueries, camelizeTokenNames));

  return mediaQueries as MediaQueryTokens;
}

function makeMediaQueryToken(
  item: Frame,
  mediaQueries: Record<string, string>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.absoluteBoundingBox) throw Error(ErrorSetupMediaQueryTokensMissingProps);

  const name = sanitizeString(item.name, camelizeTokenNames);
  mediaQueries[name] = `${item.absoluteBoundingBox.width}px`;
}
