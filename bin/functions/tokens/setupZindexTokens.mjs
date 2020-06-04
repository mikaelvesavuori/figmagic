import { camelize } from '../helpers/camelize.mjs';

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
 * @throws {errorSetupZindexTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupZindexTokensNoChildren} - When no children in Figma frame
 * @throws {errorSetupZindexTokensMissingProps} - When missing required props in children
 */
export function setupZindexTokens(zIndexFrame) {
  if (!zIndexFrame) throw new Error(errorSetupZindexTokensNoFrame);
  if (!zIndexFrame.children) throw new Error(errorSetupZindexTokensNoChildren);

  let zindexObject = {};

  zIndexFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(errorSetupZindexTokensMissingProps);

    const name = camelize(type.name);

    zindexObject[name] = parseInt(type.characters);
  });

  return zindexObject;
}
