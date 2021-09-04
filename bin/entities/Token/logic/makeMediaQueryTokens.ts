import { FRAME as Frame } from '../../../contracts/Figma';
import { MediaQueryTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupMediaQueryTokensNoFrame,
  ErrorSetupMediaQueryTokensNoChildren,
  ErrorSetupMediaQueryTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma media queries into a clean object
 */
export function makeMediaQueryTokens(mediaQueryFrame: Frame): MediaQueryTokens {
  if (!mediaQueryFrame) throw Error(ErrorSetupMediaQueryTokensNoFrame);
  if (!mediaQueryFrame.children) throw Error(ErrorSetupMediaQueryTokensNoChildren);

  const mediaQueries: Record<string, unknown> = {};
  const TOKENS = mediaQueryFrame.children;
  TOKENS.forEach((item: Frame) => makeMediaQueryToken(item, mediaQueries));

  return mediaQueries;
}

function makeMediaQueryToken(item: Frame, mediaQueries: Record<string, unknown>) {
  if (!item.name || !item.absoluteBoundingBox) throw Error(ErrorSetupMediaQueryTokensMissingProps);

  const NAME = camelize(item.name);
  mediaQueries[NAME] = `${item.absoluteBoundingBox.width}px`;
}
