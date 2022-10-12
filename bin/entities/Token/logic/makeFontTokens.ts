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
  tokens.forEach((item: Frame) =>
    makeFontToken(item, fonts, usePostscriptFontNames, useLiteralFontFamilies, camelizeTokenNames)
  );

  return fonts as FontTokens;
}

function makeFontToken(
  item: Frame,
  fonts: Record<string, string>,
  usePostscriptFontNames: boolean,
  useLiteralFontFamilies: boolean,
  camelizeTokenNames?: boolean
) {
  console.log(item);

  if (!item.name || !item.style) throw Error(ErrorMakeFontTokensMissingProps);
  const name = sanitizeString(item.name, camelizeTokenNames);
  console.log(useLiteralFontFamilies, 'useLiteralFontFamilies');
  if (useLiteralFontFamilies) {
    if (!item.characters) throw Error(ErrorMakeLiteralFontTokensMissingProps);
    fonts[name] = item.characters.trim();
  } else {
    fonts[name] = usePostscriptFontNames ? item.style.fontPostScriptName : item.style.fontFamily;
  }
}
