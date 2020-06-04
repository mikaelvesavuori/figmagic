import { camelize } from '../helpers/camelize.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupEasingTokensNoFrame,
  errorSetupEasingTokensNoChildren,
  errorSetupEasingTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma easings into a clean object
 *
 * @exports
 * @function
 * @param {object} easingFrame - The easings frame from Figma
 * @returns {object} - Returns an object with all the animation easing values
 * @throws {errorSetupEasingTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupEasingTokensNoChildren} - When no children in Figma frame
 * @throws {errorSetupEasingTokensMissingProps} - When missing required props in children
 */
export function setupEasingTokens(easingFrame) {
  if (!easingFrame) throw new Error(errorSetupEasingTokensNoFrame);
  if (!easingFrame.children) throw new Error(errorSetupEasingTokensNoChildren);

  let easingObject = {};

  easingFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(errorSetupEasingTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);

    easingObject[name] = type.characters.trim();
  });

  return easingObject;
}
