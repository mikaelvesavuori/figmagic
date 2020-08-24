import { camelize } from '../helpers/camelize';

import {
  ErrorSetupDelayTokensNoFrame,
  ErrorSetupDelayTokensNoChildren,
  ErrorSetupDelayTokensMissingProps
} from '../../frameworks/errors/errors';

import { Frame } from '../../entities/Frame/Frame';

/**
 * Places all Figma delays into a clean object
 *
 * @param delayFrame The delays frame from Figma
 */
export function setupDelayTokens(delayFrame: Frame): DelayTokens {
  if (!delayFrame) throw new Error(ErrorSetupDelayTokensNoFrame);
  if (!delayFrame.children) throw new Error(ErrorSetupDelayTokensNoChildren);

  let delayObject = {};

  delayFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(ErrorSetupDelayTokensMissingProps);

    const name = camelize(type.name);

    delayObject[name] = parseFloat(type.characters);
  });

  return delayObject;
}
