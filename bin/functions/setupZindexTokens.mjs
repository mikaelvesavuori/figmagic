import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

import {
  errorSetupZindexTokensNoFrame,
  errorSetupZindexTokensNoChildren,
  errorSetupZindexTokensMissingProps
} from '../meta/errors.mjs';

/**
 * Places all Figma line heights into a clean object
 *
 * @exports
 * @function
 * @param {object} zIndexFrame - The line heights frame from Figma
 * @returns {object} - Returns an object with all the line heights
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
