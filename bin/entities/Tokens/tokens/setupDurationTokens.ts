import { FRAME as Frame } from '../../../app/contracts/Figma';
import { makeDurationTokens } from '../index';
import { DurationTokens } from '../Tokens';

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

  let durations = {};

  durationFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(ErrorSetupDurationTokensMissingProps);
    const name = camelize(type.name);
    durations[name] = parseFloat(type.characters);
  });

  const durationTokens = makeDurationTokens(durations);
  return durationTokens;
}
