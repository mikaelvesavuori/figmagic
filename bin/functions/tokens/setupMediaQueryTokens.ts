import { camelize } from '../helpers/camelize';

import {
  errorSetupMediaQueryTokensNoFrame,
  errorSetupMediaQueryTokensNoChildren,
  errorSetupMediaQueryTokensMissingProps
} from '../../frameworks/errors/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma media queries into a clean object
 *
 * @param mediaQueryFrame The media queries frame from Figma
 */
export function setupMediaQueryTokens(mediaQueryFrame: Frame): MediaQueryTokens {
  if (!mediaQueryFrame) throw new Error(errorSetupMediaQueryTokensNoFrame);
  if (!mediaQueryFrame.children) throw new Error(errorSetupMediaQueryTokensNoChildren);

  let mediaQueryObject = {};

  mediaQueryFrame.children.forEach((type) => {
    if (!type.name || !type.absoluteBoundingBox)
      throw new Error(errorSetupMediaQueryTokensMissingProps);

    const name = camelize(type.name);

    mediaQueryObject[name] = `${type.absoluteBoundingBox.width}px`;
  });

  return mediaQueryObject;
}
