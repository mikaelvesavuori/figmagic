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
 * @param delayFrame The delays frame from Figma
 */
export function setupDelayTokens(delayFrame: Frame): DelayTokens {
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
