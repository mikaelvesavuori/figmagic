import { FRAME as Frame } from '../../../contracts/Figma';
import { DurationTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeDurationTokensNoFrame,
  ErrorMakeDurationTokensNoChildren,
  ErrorMakeDurationTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma durations into a clean object
 */
export function makeDurationTokens(
  durationFrame: Frame,
  camelizeTokenNames?: boolean
): DurationTokens {
  if (!durationFrame) throw Error(ErrorMakeDurationTokensNoFrame);
  if (!durationFrame.children) throw Error(ErrorMakeDurationTokensNoChildren);

  const durations: Record<string, unknown> = {};
  const TOKENS = durationFrame.children.reverse();
  TOKENS.forEach((item: Frame) => makeDurationToken(item, durations, camelizeTokenNames));

  return durations;
}

function makeDurationToken(
  item: Frame,
  durations: Record<string, unknown>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.characters) throw Error(ErrorMakeDurationTokensMissingProps);
  const NAME = sanitizeString(item.name, camelizeTokenNames);
  durations[NAME] = parseFloat(item.characters);
}
