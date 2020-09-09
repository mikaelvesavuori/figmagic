import { FRAME as Frame } from '../../../contracts/Figma';
import { makeDurationTokens } from '../index';
import { DurationTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupDurationTokensNoFrame,
  ErrorSetupDurationTokensNoChildren,
  ErrorSetupDurationTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma durations into a clean object
 *
 * @param durationFrame The durations frame from Figma
 */
export function setupDurationTokens(durationFrame: Frame): DurationTokens {
  if (!durationFrame) throw new Error(ErrorSetupDurationTokensNoFrame);
  if (!durationFrame.children) throw new Error(ErrorSetupDurationTokensNoChildren);

  const durations: Record<string, unknown> = {};

  durationFrame.children.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupDurationTokensMissingProps);
    const name = camelize(item.name);
    durations[name] = parseFloat(item.characters);
  });

  return makeDurationTokens(durations);
}
