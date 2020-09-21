import { FRAME as Frame } from '../../../contracts/Figma';
import { DurationTokens } from '../../../contracts/Tokens';

import { makeDurationTokens } from '../index';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupDurationTokensNoFrame,
  ErrorSetupDurationTokensNoChildren,
  ErrorSetupDurationTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma durations into a clean object
 */
export function setupDurationTokens(durationFrame: Frame): DurationTokens {
  if (!durationFrame) throw new Error(ErrorSetupDurationTokensNoFrame);
  if (!durationFrame.children) throw new Error(ErrorSetupDurationTokensNoChildren);

  const durations: Record<string, unknown> = {};

  const TOKENS = durationFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupDurationTokensMissingProps);
    const NAME = camelize(item.name);
    durations[NAME] = parseFloat(item.characters);
  });

  return makeDurationTokens(durations);
}
