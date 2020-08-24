import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupZindexTokensNoFrame,
  ErrorSetupZindexTokensNoChildren,
  ErrorSetupZindexTokensMissingProps
} from '../../../frameworks/errors/errors';

import { Frame } from '../../../app/contracts/Frame';

/**
 * @description Places all Figma Z indices into a clean object
 *
 * @param zIndexFrame The Z index frame from Figma
 */
export function setupZindexTokens(zIndexFrame: Frame): ZIndexTokens {
  if (!zIndexFrame) throw new Error(ErrorSetupZindexTokensNoFrame);
  if (!zIndexFrame.children) throw new Error(ErrorSetupZindexTokensNoChildren);

  let zindexObject = {};

  zIndexFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(ErrorSetupZindexTokensMissingProps);

    const name = camelize(type.name);

    zindexObject[name] = parseInt(type.characters);
  });

  return zindexObject;
}
