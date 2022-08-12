import { FRAME as Frame } from '../../../contracts/Figma';
import { DelayTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeDelayTokensNoFrame,
  ErrorMakeDelayTokensNoChildren,
  ErrorMakeDelayTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma delays into a clean object
 */
export function makeDelayTokens(delayFrame: Frame, camelizeTokenNames?: boolean): DelayTokens {
  if (!delayFrame) throw Error(ErrorMakeDelayTokensNoFrame);
  if (!delayFrame.children) throw Error(ErrorMakeDelayTokensNoChildren);

  const delays: Record<string, number> = {};
  const tokens = delayFrame.children.reverse();
  tokens.forEach((item: Frame) => makeDelayToken(item, delays, camelizeTokenNames));

  return delays as DelayTokens;
}

function makeDelayToken(
  item: Frame,
  delays: Record<string, unknown>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.characters) throw Error(ErrorMakeDelayTokensMissingProps);

  const name = sanitizeString(item.name, camelizeTokenNames);
  delays[name] = parseFloat(item.characters);
}
