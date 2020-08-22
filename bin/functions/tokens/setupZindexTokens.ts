import { camelize } from '../helpers/camelize';

import {
  errorSetupZindexTokensNoFrame,
  errorSetupZindexTokensNoChildren,
  errorSetupZindexTokensMissingProps
} from '../../frameworks/errors/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma Z indices into a clean object
 *
 * @param zIndexFrame The Z index frame from Figma
 */
export function setupZindexTokens(zIndexFrame: Frame): ZIndexTokens {
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
