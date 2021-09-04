import { FRAME as Frame } from '../../../contracts/Figma';
import { DurationTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorMakeDurationTokensNoFrame,
  ErrorMakeDurationTokensNoChildren,
  ErrorMakeDurationTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma durations into a clean object
 */
export function makeDurationTokens(durationFrame: Frame): DurationTokens {
  if (!durationFrame) throw Error(ErrorMakeDurationTokensNoFrame);
  if (!durationFrame.children) throw Error(ErrorMakeDurationTokensNoChildren);

  const durations: Record<string, unknown> = {};
  const TOKENS = durationFrame.children;
  TOKENS.forEach((item: Frame) => makeDurationToken(item, durations));

  return durations;
}

function makeDurationToken(item: Frame, durations: Record<string, unknown>) {
  if (!item.name || !item.characters) throw Error(ErrorMakeDurationTokensMissingProps);
  const NAME = camelize(item.name);
  durations[NAME] = parseFloat(item.characters);
}
