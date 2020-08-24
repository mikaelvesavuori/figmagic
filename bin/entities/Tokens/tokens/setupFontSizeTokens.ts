import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupFontSizeTokensNoFrame,
  ErrorSetupFontSizeTokensNoChildren,
  ErrorSetupFontSizeTokensNoSizing,
  ErrorSetupFontSizeTokensMissingProps,
  ErrorSetupFontSizeTokensMissingSize
} from '../../../frameworks/errors/errors';

import { Frame } from '../../../entities/Frame/Frame';

/**
 * @description Places all Figma font sizes into a clean object
 *
 * @param fontSizeFrame The font size frame from Figma
 * @param fontUnit The font unit type
 * @param remSize The body rem size
 */
export function setupFontSizeTokens(
  fontSizeFrame: Frame,
  fontUnit: string,
  remSize: number
): FontSizeTokens {
  if (!fontSizeFrame) throw new Error(ErrorSetupFontSizeTokensNoFrame);
  if (!fontSizeFrame.children) throw new Error(ErrorSetupFontSizeTokensNoChildren);
  if (!fontUnit || !remSize) throw new Error(ErrorSetupFontSizeTokensNoSizing);

  let fontSizeObject = {};

  fontSizeFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(ErrorSetupFontSizeTokensMissingProps);
    if (!type.style.fontSize) throw new Error(ErrorSetupFontSizeTokensMissingSize);

    const name = camelize(type.name);
    const FONT_SIZE = ((type.style.fontSize as unknown) as number) / remSize + fontUnit;

    fontSizeObject[name] = FONT_SIZE;
  });

  return fontSizeObject;
}
