import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupFontWeightTokensNoFrame,
  ErrorSetupFontWeightTokensNoChildren,
  ErrorSetupFontWeightTokensMissingProps,
  ErrorSetupFontWeightTokensMissingWeight
} from '../../../frameworks/errors/errors';

import { Frame } from '../../../entities/Frame/Frame';

/**
 * @description Places all Figma font weights into a clean object
 *
 * @param fontWeightFrame The font weight frame from Figma
 */
export function setupFontWeightTokens(fontWeightFrame: Frame): FontWeightTokens {
  if (!fontWeightFrame) throw new Error(ErrorSetupFontWeightTokensNoFrame);
  if (!fontWeightFrame.children) throw new Error(ErrorSetupFontWeightTokensNoChildren);

  let fontWeightObject = {};

  fontWeightFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(ErrorSetupFontWeightTokensMissingProps);
    if (!type.style.fontWeight) throw new Error(ErrorSetupFontWeightTokensMissingWeight);

    const name = camelize(type.name);
    const fontWeight = type.style.fontWeight;

    fontWeightObject[name] = fontWeight;
  });

  return fontWeightObject;
}
