import { FRAME as Frame } from '../../../contracts/Figma';
import { ZindexTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeZindexTokensNoFrame,
  ErrorMakeZindexTokensNoChildren,
  ErrorMakeZindexTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma Z indices into a clean object
 */
export function makeZindexTokens(zIndexFrame: Frame, camelizeTokenNames?: boolean): ZindexTokens {
  if (!zIndexFrame) throw Error(ErrorMakeZindexTokensNoFrame);
  if (!zIndexFrame.children) throw Error(ErrorMakeZindexTokensNoChildren);

  const zIndex: Record<string, unknown> = {};
  const TOKENS = zIndexFrame.children.reverse();
  TOKENS.forEach((item: Frame) => makeZindexToken(item, zIndex, camelizeTokenNames));

  return zIndex;
}

function makeZindexToken(
  item: Frame,
  zIndex: Record<string, unknown>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.characters) throw Error(ErrorMakeZindexTokensMissingProps);
  const NAME = sanitizeString(item.name, camelizeTokenNames);
  zIndex[NAME] = parseInt(item.characters);
}
