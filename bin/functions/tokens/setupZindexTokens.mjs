import { camelize } from '../helpers/camelize.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupZindexTokensNoFrame,
  errorSetupZindexTokensNoChildren,
  errorSetupZindexTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma Z indices into a clean object
 *
 * @exports
 * @function
 * @param {object} zIndexFrame - The Z index frame from Figma
 * @returns {object} - Returns an object with all the Z indices
 * @throws {error} - When there is no provided Figma frame
 */
export function setupZindexTokens(zIndexFrame) {
  if (!zIndexFrame) throw new Error(errorSetupZindexTokensNoFrame);
  if (!zIndexFrame.children) throw new Error(errorSetupZindexTokensNoChildren);

  let zindexObject = {};

  zIndexFrame.children.forEach(type => {
    if (!type.name || !type.characters) throw new Error(errorSetupZindexTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);

    zindexObject[name] = type.characters;
  });

  return zindexObject;
}
