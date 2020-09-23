import { FRAME as Frame } from '../../../contracts/Figma';
import { ZindexTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupZindexTokensNoFrame,
  ErrorSetupZindexTokensNoChildren,
  ErrorSetupZindexTokensMissingProps
} from '../../../frameworks/errors/errors';

export const makeZindexTokens = (frame: Frame): ZindexTokens => setupZindexTokens(frame);

/**
 * @description Places all Figma Z indices into a clean object
 */
function setupZindexTokens(zIndexFrame: Frame): ZindexTokens {
  if (!zIndexFrame) throw new Error(ErrorSetupZindexTokensNoFrame);
  if (!zIndexFrame.children) throw new Error(ErrorSetupZindexTokensNoChildren);

  const zIndex: Record<string, unknown> = {};

  const TOKENS = zIndexFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupZindexTokensMissingProps);
    const NAME = camelize(item.name);
    zIndex[NAME] = parseInt(item.characters);
  });

  // @ts-ignore
  return zIndex as ZindexTokens;
}
