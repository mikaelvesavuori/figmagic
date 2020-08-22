import { camelize } from '../helpers/camelize';
import { normalizeUnits } from '../helpers/normalizeUnits';

import {
  errorSetupLineHeightTokensNoFrame,
  errorSetupLineHeightTokensNoChildren,
  errorSetupLineHeightTokensMissingProps,
  errorSetupLineHeightTokensMissingPercent
} from '../../frameworks/errors/errors';

import { Frame } from '../../entities/Frame/Frame';

/**
 * Places all Figma line heights into a clean object
 *
 * @param lineHeightFrame The line heights frame from Figma
 * @param remSize The body rem size
 */
export function setupLineHeightTokens(lineHeightFrame: Frame, remSize: number): LineHeightTokens {
  if (!lineHeightFrame) throw new Error(errorSetupLineHeightTokensNoFrame);
  if (!lineHeightFrame.children) throw new Error(errorSetupLineHeightTokensNoChildren);

  let lineHeightObject = {};

  lineHeightFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(errorSetupLineHeightTokensMissingProps);
    if (!type.style.lineHeightPercentFontSize)
      throw new Error(errorSetupLineHeightTokensMissingPercent);

    const name = camelize(type.name);
    const LINE_HEIGHT: string = normalizeUnits(
      type.style.lineHeightPercentFontSize,
      'percent',
      'unitless',
      remSize
    );

    // Do a tiny bit of rounding to avoid ugly numbers
    const lineHeight = parseFloat(LINE_HEIGHT).toFixed(2);
    lineHeightObject[name] = lineHeight;
  });

  return lineHeightObject;
}
