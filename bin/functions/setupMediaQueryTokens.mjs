import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

import {
  errorSetupMediaQueryTokensNoFrame,
  errorSetupMediaQueryTokensNoChildren,
  errorSetupMediaQueryTokensMissingProps
} from '../meta/errors.mjs';

/**
 * Places all Figma line heights into a clean object
 *
 * @exports
 * @function
 * @param {object} mediaQueryFrame - The line heights frame from Figma
 * @returns {object} - Returns an object with all the line heights
 * @throws {error} - When there is no provided Figma frame
 */
export function setupMediaQueryTokens(mediaQueryFrame) {
  if (!mediaQueryFrame) throw new Error(errorSetupMediaQueryTokensNoFrame);
  if (!mediaQueryFrame.children) throw new Error(errorSetupMediaQueryTokensNoChildren);

  let mediaQueryObject = {};

  mediaQueryFrame.children.forEach(type => {
    if (!type.name || !type.absoluteBoundingBox)
      throw new Error(errorSetupMediaQueryTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);

    mediaQueryObject[name] = `${type.absoluteBoundingBox.width}px`;
  });

  return mediaQueryObject;
}
