import { FRAME as Frame } from '../../../contracts/Figma';
import { FontTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeFontTokensNoFrame,
  ErrorMakeFontTokensNoChildren,
  ErrorMakeFontTokensMissingProps,
  ErrorMakeLiteralFontTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma fonts into a clean object
 */
export function makeFontTokens(
  fontFrame: Frame,
  usePostscriptFontNames = false,
  useLiteralFontFamilies = false,
  camelizeTokenNames?: boolean
): FontTokens {
  if (!fontFrame) throw Error(ErrorMakeFontTokensNoFrame);
  if (!fontFrame.children) throw Error(ErrorMakeFontTokensNoChildren);

  const fonts: Record<string, string> = {};
  const tokens = fontFrame.children.reverse();
  tokens.forEach((item: Frame) => {
    useLiteralFontFamilies
      ? makeLiteralFontFamilyToken(item, fonts, camelizeTokenNames)
      : makeFontToken(item, fonts, usePostscriptFontNames, camelizeTokenNames);
  });

  return fonts as FontTokens;
}

function makeFontToken(
  item: Frame,
  fonts: Record<string, string>,
  usePostscriptFontNames: boolean,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.style) throw Error(ErrorMakeFontTokensMissingProps);
  const name = sanitizeString(item.name, camelizeTokenNames);

  fonts[name] = usePostscriptFontNames ? item.style.fontPostScriptName : item.style.fontFamily;
}

function makeLiteralFontFamilyToken(
  item: Frame,
  fonts: Record<string, string>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.style) throw Error(ErrorMakeFontTokensMissingProps);
  if (!item.characters) throw Error(ErrorMakeLiteralFontTokensMissingProps);
  const name = sanitizeString(item.name, camelizeTokenNames);
  fonts[name] = item.characters.trim();
}
