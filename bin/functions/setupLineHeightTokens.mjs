import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

import { errorSetupLineHeightTokens } from '../meta/errors.mjs';

/**
 * Places all Figma line heights into a clean object
 *
 * @exports
 * @function
 * @param {object} frame - The line heights frame from Figma
 * @returns {object} - Returns an object with all the line heights
 * @throws {error} - When there is no provided Figma frame
 */
export function setupLineHeightTokens(frame) {
  if (!frame) throw new Error(errorSetupLineHeightTokens);

  let lineHeightObject = {};

  frame.children.forEach(type => {
    let name = camelize(type.name);
    name = formatName(name);
    const LINE_HEIGHT = normalizeUnits(type.style.lineHeightPercentFontSize, 'percent', 'unitless');

    // Do a tiny bit of rounding to avoid ugly numbers
    lineHeightObject[name] = LINE_HEIGHT.toFixed(2);
  });

  return lineHeightObject;
}
