import { FRAME as Frame } from '../../../app/contracts/Figma';
import { makeDelayTokens } from '../index';
import { DelayTokens } from '../Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupDelayTokensNoFrame,
  ErrorSetupDelayTokensNoChildren,
  ErrorSetupDelayTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma delays into a clean object
 *
 * @param delayFrame The delays frame from Figma
 */
export function setupDelayTokens(delayFrame: Frame): DelayTokens {
  if (!delayFrame) throw new Error(ErrorSetupDelayTokensNoFrame);
  if (!delayFrame.children) throw new Error(ErrorSetupDelayTokensNoChildren);

  let delays = {};

  delayFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(ErrorSetupDelayTokensMissingProps);
    const name = camelize(type.name);
    delays[name] = parseFloat(type.characters);
  });

  const delayTokens = makeDelayTokens(delays);
  return delayTokens;
}
