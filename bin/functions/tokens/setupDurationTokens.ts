import { camelize } from '../helpers/camelize';

import {
  errorSetupDurationTokensNoFrame,
  errorSetupDurationTokensNoChildren,
  errorSetupDurationTokensMissingProps
} from '../../meta/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma durations into a clean object
 *
 * @param durationFrame The durations frame from Figma
 */
export function setupDurationTokens(durationFrame: Frame): DurationTokens {
  if (!durationFrame) throw new Error(errorSetupDurationTokensNoFrame);
  if (!durationFrame.children) throw new Error(errorSetupDurationTokensNoChildren);

  let durationObject = {};

  durationFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(errorSetupDurationTokensMissingProps);

    const name = camelize(type.name);

    durationObject[name] = parseFloat(type.characters);
  });

  return durationObject;
}
