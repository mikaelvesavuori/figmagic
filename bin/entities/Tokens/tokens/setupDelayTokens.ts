import { FRAME as Frame } from '../../../contracts/Figma';
import { makeDelayTokens } from '../index';
import { DelayTokens } from '../../../contracts/Tokens';

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

  const delays: Record<string, unknown> = {};

  delayFrame.children.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupDelayTokensMissingProps);
    const name = camelize(item.name);
    delays[name] = parseFloat(item.characters);
  });

  const delayTokens = makeDelayTokens(delays);
  return delayTokens;
}
