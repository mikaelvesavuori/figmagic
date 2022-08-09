import { FRAME as Frame } from '../../../contracts/Figma';
import { FontSizeTokens } from '../../../contracts/Tokens';
import { FontUnits } from '../../../contracts/Config';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeFontSizeTokensNoFrame,
  ErrorMakeFontSizeTokensNoChildren,
  ErrorMakeFontSizeTokensNoSizing,
  ErrorMakeFontSizeTokensMissingProps,
  ErrorMakeFontSizeTokensMissingSize
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma font sizes into a clean object
 */
export function makeFontSizeTokens(
  fontSizeFrame: Frame,
  fontUnit: FontUnits,
  remSize: number,
  camelizeTokenNames?: boolean
): FontSizeTokens {
  if (!fontSizeFrame) throw Error(ErrorMakeFontSizeTokensNoFrame);
  if (!fontSizeFrame.children) throw Error(ErrorMakeFontSizeTokensNoChildren);
  if (!fontUnit || !remSize) throw Error(ErrorMakeFontSizeTokensNoSizing);

  const fontSizes: Record<string, string> = {};
  const tokens = fontSizeFrame.children.reverse();
  tokens.forEach((item: Frame) =>
    makeFontSizeToken(item, fontSizes, remSize, fontUnit, camelizeTokenNames)
  );

  return fontSizes as FontSizeTokens;
}

function makeFontSizeToken(
  item: Frame,
  fontSizes: Record<string, string>,
  remSize: number,
  fontUnit: string,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.style) throw Error(ErrorMakeFontSizeTokensMissingProps);
  if (!item.style.fontSize) throw Error(ErrorMakeFontSizeTokensMissingSize);

  const name = sanitizeString(item.name, camelizeTokenNames);
  const fontSize = (() => {
    if (fontUnit === 'px') return item.style.fontSize + fontUnit;
    else return (item.style.fontSize as unknown as number) / remSize + fontUnit;
  })();

  fontSizes[name] = fontSize;
}
