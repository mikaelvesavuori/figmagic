import { FRAME as Frame } from '../../../contracts/Figma';
import { FontTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorMakeFontTokensNoFrame,
  ErrorMakeFontTokensNoChildren,
  ErrorMakeFontTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma fonts into a clean object
 */
export function makeFontTokens(fontFrame: Frame, usePostscriptFontNames = false): FontTokens {
  if (!fontFrame) throw Error(ErrorMakeFontTokensNoFrame);
  if (!fontFrame.children) throw Error(ErrorMakeFontTokensNoChildren);

  const fonts: Record<string, unknown> = {};
  const TOKENS = fontFrame.children;
  TOKENS.forEach((item: Frame) => makeFontToken(item, fonts, usePostscriptFontNames));

  return fonts;
}

function makeFontToken(
  item: Frame,
  fonts: Record<string, unknown>,
  usePostscriptFontNames: boolean
) {
  if (!item.name || !item.style) throw Error(ErrorMakeFontTokensMissingProps);
  const NAME = camelize(item.name);
  fonts[NAME] = usePostscriptFontNames ? item.style.fontPostScriptName : item.style.fontFamily; //.replace(' /g', '');
}
