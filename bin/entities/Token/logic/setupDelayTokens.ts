import { FRAME as Frame } from '../../../contracts/Figma';
import { DelayTokens } from '../../../contracts/Tokens';

import { makeDelayTokens } from '../index';

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

  const TOKENS = delayFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupDelayTokensMissingProps);
    const NAME = camelize(item.name);
    delays[NAME] = parseFloat(item.characters);
  });

  return makeDelayTokens(delays);
}
