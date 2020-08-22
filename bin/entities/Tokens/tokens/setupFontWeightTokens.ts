import { camelize } from '../helpers/camelize';

import {
  errorSetupFontWeightTokensNoFrame,
  errorSetupFontWeightTokensNoChildren,
  errorSetupFontWeightTokensMissingProps,
  errorSetupFontWeightTokensMissingWeight
} from '../../frameworks/errors/errors';

import { Frame } from '../../entities/Frame/Frame';

/**
 * Places all Figma font weights into a clean object
 *
 * @param fontWeightFrame The font weight frame from Figma
 */
export function setupFontWeightTokens(fontWeightFrame: Frame): FontWeightTokens {
  if (!fontWeightFrame) throw new Error(errorSetupFontWeightTokensNoFrame);
  if (!fontWeightFrame.children) throw new Error(errorSetupFontWeightTokensNoChildren);

  let fontWeightObject = {};

  fontWeightFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(errorSetupFontWeightTokensMissingProps);
    if (!type.style.fontWeight) throw new Error(errorSetupFontWeightTokensMissingWeight);

    const name = camelize(type.name);
    const fontWeight = type.style.fontWeight;

    fontWeightObject[name] = fontWeight;
  });

  return fontWeightObject;
}
