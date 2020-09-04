import { FRAME as Frame } from '../../../contracts/Figma';
import { makeZindexTokens } from '../index';
import { ZindexTokens } from '../../../contracts/Tokens';

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

  const zIndex: Record<string, unknown> = {};

  zIndexFrame.children.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupZindexTokensMissingProps);
    const name = camelize(item.name);
    zIndex[name] = parseInt(item.characters);
  });

  const zIndexTokens = makeZindexTokens(zIndex);
  return zIndexTokens;
}
