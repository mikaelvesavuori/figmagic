import { camelize } from '../helpers/camelize';

import {
  errorSetupDelayTokensNoFrame,
  errorSetupDelayTokensNoChildren,
  errorSetupDelayTokensMissingProps
} from '../../meta/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma delays into a clean object
 *
 * @exports
 * @function
 * @param {Frame} delayFrame - The delays frame from Figma
 * @returns {object} - Returns an object with all the animation delay timings
 * @throws {errorSetupDelayTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupDelayTokensNoChildren} - When no children in Figma frame
 * @throws {errorSetupDelayTokensMissingProps} - When missing required props in children
 */
export function setupDelayTokens(delayFrame: Frame): object {
  if (!delayFrame) throw new Error(errorSetupDelayTokensNoFrame);
  if (!delayFrame.children) throw new Error(errorSetupDelayTokensNoChildren);

  let delayObject = {};

  delayFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(errorSetupDelayTokensMissingProps);

    const name = camelize(type.name);

    delayObject[name] = parseFloat(type.characters);
  });

  return delayObject;
}
