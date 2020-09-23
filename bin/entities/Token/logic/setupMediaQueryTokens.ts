import { FRAME as Frame } from '../../../contracts/Figma';
import { MediaQueryTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupMediaQueryTokensNoFrame,
  ErrorSetupMediaQueryTokensNoChildren,
  ErrorSetupMediaQueryTokensMissingProps
} from '../../../frameworks/errors/errors';

export const makeMediaQueryTokens = (frame: Frame): MediaQueryTokens =>
  setupMediaQueryTokens(frame);

/**
 * @description Places all Figma media queries into a clean object
 */
function setupMediaQueryTokens(mediaQueryFrame: Frame): MediaQueryTokens {
  if (!mediaQueryFrame) throw new Error(ErrorSetupMediaQueryTokensNoFrame);
  if (!mediaQueryFrame.children) throw new Error(ErrorSetupMediaQueryTokensNoChildren);

  const mediaQueries: Record<string, unknown> = {};

  const TOKENS = mediaQueryFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.absoluteBoundingBox)
      throw new Error(ErrorSetupMediaQueryTokensMissingProps);

    const NAME = camelize(item.name);

    mediaQueries[NAME] = `${item.absoluteBoundingBox.width}px`;
  });

  // @ts-ignore
  return mediaQueries as MediaQueryTokens;
}
