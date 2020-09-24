import { FRAME as Frame } from '../../../contracts/Figma';
import { DelayTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorMakeDelayTokensNoFrame,
  ErrorMakeDelayTokensNoChildren,
  ErrorMakeDelayTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma delays into a clean object
 */
export function makeDelayTokens(delayFrame: Frame): DelayTokens {
  if (!delayFrame) throw new Error(ErrorMakeDelayTokensNoFrame);
  if (!delayFrame.children) throw new Error(ErrorMakeDelayTokensNoChildren);

  const delays: Record<string, unknown> = {};

  const TOKENS = delayFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorMakeDelayTokensMissingProps);
    const NAME = camelize(item.name);
    delays[NAME] = parseFloat(item.characters);
  });

  // @ts-ignore
  return delays as DelayTokens;
}
