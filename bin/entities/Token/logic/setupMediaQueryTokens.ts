import { FRAME as Frame } from '../../../contracts/Figma';
import { MediaQueryTokens } from '../../../contracts/Tokens';

import { makeMediaQueryTokens } from '../index';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupMediaQueryTokensNoFrame,
  ErrorSetupMediaQueryTokensNoChildren,
  ErrorSetupMediaQueryTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma media queries into a clean object
 */
export function setupMediaQueryTokens(mediaQueryFrame: Frame): MediaQueryTokens {
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

  return makeMediaQueryTokens(mediaQueries);
}
