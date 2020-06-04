import { camelize } from '../helpers/camelize.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupDelayTokensNoFrame,
  errorSetupDelayTokensNoChildren,
  errorSetupDelayTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma delays into a clean object
 *
 * @exports
 * @function
 * @param {object} delayFrame - The delays frame from Figma
 * @returns {object} - Returns an object with all the animation delay timings
 * @throws {errorSetupDelayTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupDelayTokensNoChildren} - When no children in Figma frame
 * @throws {errorSetupDelayTokensMissingProps} - When missing required props in children
 */
export function setupDelayTokens(delayFrame) {
  if (!delayFrame) throw new Error(errorSetupDelayTokensNoFrame);
  if (!delayFrame.children) throw new Error(errorSetupDelayTokensNoChildren);

  let delayObject = {};

  delayFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(errorSetupDelayTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);

    delayObject[name] = parseFloat(type.characters);
  });

  return delayObject;
}
