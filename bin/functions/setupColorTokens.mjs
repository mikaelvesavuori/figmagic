import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { roundColorValue } from './roundColorValue.mjs';
import { errorSetupColorTokens } from '../meta/errors.mjs';

/**
 * Places all Figma color frames into a clean object
 *
 * @exports
 * @function
 * @param {object} colorFrame - The color frame from Figma
 * @returns {object} - Returns an object with all the colors
 * @throws {error} - When there is no provided Figma frame
 */
export function setupColorTokens(colorFrame) {
  if (!colorFrame) throw new Error(errorSetupColorTokens);

  let colors = {};

  colorFrame.children.forEach(color => {
    const COLOR_STRING = `rgba(${roundColorValue(color.fills[0].color.r, 255)}, ${roundColorValue(
      color.fills[0].color.g,
      255
    )}, ${roundColorValue(color.fills[0].color.b, 255)}, ${roundColorValue(
      color.fills[0].color.a,
      1
    )})`;

    let normalizedName = camelize(color.name);
    normalizedName = formatName(normalizedName);
    colors[normalizedName] = COLOR_STRING;
  });

  return colors;
}
