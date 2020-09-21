import { FRAME as Frame } from '../../../contracts/Figma';
import { FontSizeTokens } from '../../../contracts/Tokens';

import { makeFontSizeTokens } from '../index';

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
 */
export function setupFontSizeTokens(
  fontSizeFrame: Frame,
  fontUnit: string,
  remSize: number
): FontSizeTokens {
  if (!fontSizeFrame) throw new Error(ErrorSetupFontSizeTokensNoFrame);
  if (!fontSizeFrame.children) throw new Error(ErrorSetupFontSizeTokensNoChildren);
  if (!fontUnit || !remSize) throw new Error(ErrorSetupFontSizeTokensNoSizing);

  const fontSizes: Record<string, unknown> = {};

  const TOKENS = fontSizeFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.style) throw new Error(ErrorSetupFontSizeTokensMissingProps);
    if (!item.style.fontSize) throw new Error(ErrorSetupFontSizeTokensMissingSize);

    const NAME = camelize(item.name);
    const FONT_SIZE = ((item.style.fontSize as unknown) as number) / remSize + fontUnit;
    fontSizes[NAME] = FONT_SIZE;
  });

  return makeFontSizeTokens(fontSizes);
}
