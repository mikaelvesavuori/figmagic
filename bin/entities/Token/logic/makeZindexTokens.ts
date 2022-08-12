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

  const zIndex: Record<string, number> = {};
  const tokens = zIndexFrame.children.reverse();
  tokens.forEach((item: Frame) => makeZindexToken(item, zIndex, camelizeTokenNames));

  return zIndex as ZindexTokens;
}

function makeZindexToken(
  item: Frame,
  zIndex: Record<string, number>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.characters) throw Error(ErrorMakeZindexTokensMissingProps);

  const name = sanitizeString(item.name, camelizeTokenNames);
  zIndex[name] = parseInt(item.characters);
}
