import { FRAME as Frame } from '../../../contracts/Figma';
import { makeMediaQueryTokens } from '../index';
import { MediaQueryTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupMediaQueryTokensNoFrame,
  ErrorSetupMediaQueryTokensNoChildren,
  ErrorSetupMediaQueryTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma media queries into a clean object
 *
 * @param mediaQueryFrame The media queries frame from Figma
 */
export function setupMediaQueryTokens(mediaQueryFrame: Frame): MediaQueryTokens {
  if (!mediaQueryFrame) throw new Error(ErrorSetupMediaQueryTokensNoFrame);
  if (!mediaQueryFrame.children) throw new Error(ErrorSetupMediaQueryTokensNoChildren);

  const mediaQueries: Record<string, unknown> = {};

  mediaQueryFrame.children.forEach((item: Frame) => {
    if (!item.name || !item.absoluteBoundingBox)
      throw new Error(ErrorSetupMediaQueryTokensMissingProps);

    const name = camelize(item.name);

    mediaQueries[name] = `${item.absoluteBoundingBox.width}px`;
  });

  return makeMediaQueryTokens(mediaQueries);
}
