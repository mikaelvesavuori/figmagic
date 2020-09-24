import { FRAME as Frame } from '../../../contracts/Figma';
import { ZindexTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorMakeZindexTokensNoFrame,
  ErrorMakeZindexTokensNoChildren,
  ErrorMakeZindexTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma Z indices into a clean object
 */
export function makeZindexTokens(zIndexFrame: Frame): ZindexTokens {
  if (!zIndexFrame) throw new Error(ErrorMakeZindexTokensNoFrame);
  if (!zIndexFrame.children) throw new Error(ErrorMakeZindexTokensNoChildren);

  const zIndex: Record<string, unknown> = {};

  const TOKENS = zIndexFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorMakeZindexTokensMissingProps);
    const NAME = camelize(item.name);
    zIndex[NAME] = parseInt(item.characters);
  });

  return zIndex;
}
