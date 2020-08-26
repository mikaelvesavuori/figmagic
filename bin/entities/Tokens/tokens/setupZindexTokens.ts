import { Frame } from '../../../app/contracts/Frame';
import { makeZindexTokens } from '../index';
import { ZindexTokens } from '../Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupZindexTokensNoFrame,
  ErrorSetupZindexTokensNoChildren,
  ErrorSetupZindexTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma Z indices into a clean object
 *
 * @param zIndexFrame The Z index frame from Figma
 */
export function setupZindexTokens(zIndexFrame: Frame): ZindexTokens {
  if (!zIndexFrame) throw new Error(ErrorSetupZindexTokensNoFrame);
  if (!zIndexFrame.children) throw new Error(ErrorSetupZindexTokensNoChildren);

  let zIndex = {};

  zIndexFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(ErrorSetupZindexTokensMissingProps);
    const name = camelize(type.name);
    zIndex[name] = parseInt(type.characters);
  });

  const zIndexTokens = makeZindexTokens(zIndex);
  return zIndexTokens;
}
