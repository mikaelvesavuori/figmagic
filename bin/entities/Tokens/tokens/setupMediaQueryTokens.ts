import { camelize } from '../helpers/camelize';

import {
  ErrorSetupMediaQueryTokensNoFrame,
  ErrorSetupMediaQueryTokensNoChildren,
  ErrorSetupMediaQueryTokensMissingProps
} from '../../app/errors/errors';

import { Frame } from '../../entities/Frame/Frame';

/**
 * Places all Figma media queries into a clean object
 *
 * @param mediaQueryFrame The media queries frame from Figma
 */
export function setupMediaQueryTokens(mediaQueryFrame: Frame): MediaQueryTokens {
  if (!mediaQueryFrame) throw new Error(ErrorSetupMediaQueryTokensNoFrame);
  if (!mediaQueryFrame.children) throw new Error(ErrorSetupMediaQueryTokensNoChildren);

  let mediaQueryObject = {};

  mediaQueryFrame.children.forEach((type) => {
    if (!type.name || !type.absoluteBoundingBox)
      throw new Error(ErrorSetupMediaQueryTokensMissingProps);

    const name = camelize(type.name);

    mediaQueryObject[name] = `${type.absoluteBoundingBox.width}px`;
  });

  return mediaQueryObject;
}
