import { Frame } from '../../../app/contracts/Frame';
import { makeMediaQueryTokens } from '../index';
import { MediaQueryTokens } from '../Tokens';

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

  let mediaQueries = {};

  mediaQueryFrame.children.forEach((type) => {
    if (!type.name || !type.absoluteBoundingBox)
      throw new Error(ErrorSetupMediaQueryTokensMissingProps);

    const name = camelize(type.name);

    mediaQueries[name] = `${type.absoluteBoundingBox.width}px`;
  });

  const mediaQueryTokens = makeMediaQueryTokens(mediaQueries);
  return mediaQueryTokens;
}
