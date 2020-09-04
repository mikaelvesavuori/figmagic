import { FRAME as Frame } from '../../../contracts/Figma';
import { makeFontSizeTokens } from '../index';
import { FontSizeTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupFontSizeTokensNoFrame,
  ErrorSetupFontSizeTokensNoChildren,
  ErrorSetupFontSizeTokensNoSizing,
  ErrorSetupFontSizeTokensMissingProps,
  ErrorSetupFontSizeTokensMissingSize
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma font sizes into a clean object
 *
 * @param fontSizeFrame The font size frame from Figma
 * @param fontUnit The font unit item
 * @param remSize The body rem size
 */
// TODO: Test loc 34-35
export function setupFontSizeTokens(
  fontSizeFrame: Frame,
  fontUnit: string,
  remSize: number
): FontSizeTokens {
  if (!fontSizeFrame) throw new Error(ErrorSetupFontSizeTokensNoFrame);
  if (!fontSizeFrame.children) throw new Error(ErrorSetupFontSizeTokensNoChildren);
  if (!fontUnit || !remSize) throw new Error(ErrorSetupFontSizeTokensNoSizing);

  const fontSizes: Record<string, unknown> = {};

  fontSizeFrame.children.forEach((item: Frame) => {
    if (!item.name || !item.style) throw new Error(ErrorSetupFontSizeTokensMissingProps);
    if (!item.style.fontSize) throw new Error(ErrorSetupFontSizeTokensMissingSize);

    const name = camelize(item.name);
    const FONT_SIZE = ((item.style.fontSize as unknown) as number) / remSize + fontUnit;
    fontSizes[name] = FONT_SIZE;
  });

  const fontSizeTokens = makeFontSizeTokens(fontSizes);
  return fontSizeTokens;
}
