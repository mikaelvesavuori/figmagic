import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupDurationTokensNoFrame,
  ErrorSetupDurationTokensNoChildren,
  ErrorSetupDurationTokensMissingProps
} from '../../../frameworks/errors/errors';

import { Frame } from '../../../entities/Frame/Frame';

/**
 * @description Places all Figma durations into a clean object
 *
 * @param durationFrame The durations frame from Figma
 */
export function setupDurationTokens(durationFrame: Frame): DurationTokens {
  if (!durationFrame) throw new Error(ErrorSetupDurationTokensNoFrame);
  if (!durationFrame.children) throw new Error(ErrorSetupDurationTokensNoChildren);

  let durationObject = {};

  durationFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(ErrorSetupDurationTokensMissingProps);

    const name = camelize(type.name);

    durationObject[name] = parseFloat(type.characters);
  });

  return durationObject;
}
