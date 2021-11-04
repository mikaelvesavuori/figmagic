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

  const mediaQueries: Record<string, unknown> = {};
  const TOKENS = mediaQueryFrame.children.reverse();
  TOKENS.forEach((item: Frame) => makeMediaQueryToken(item, mediaQueries, camelizeTokenNames));

  return mediaQueries;
}

function makeMediaQueryToken(
  item: Frame,
  mediaQueries: Record<string, unknown>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.absoluteBoundingBox) throw Error(ErrorSetupMediaQueryTokensMissingProps);

  const NAME = sanitizeString(item.name, camelizeTokenNames);
  mediaQueries[NAME] = `${item.absoluteBoundingBox.width}px`;
}
