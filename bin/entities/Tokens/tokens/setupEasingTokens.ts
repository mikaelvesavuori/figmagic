import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupEasingTokensNoFrame,
  ErrorSetupEasingTokensNoChildren,
  ErrorSetupEasingTokensMissingProps
} from '../../../app/errors/errors';

import { Frame } from '../../../entities/Frame/Frame';

/**
 * @description Places all Figma easings into a clean object
 *
 * @param easingFrame The easings frame from Figma
 */
export function setupEasingTokens(easingFrame: Frame): EasingTokens {
  if (!easingFrame) throw new Error(ErrorSetupEasingTokensNoFrame);
  if (!easingFrame.children) throw new Error(ErrorSetupEasingTokensNoChildren);

  let easingObject = {};

  easingFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(ErrorSetupEasingTokensMissingProps);

    const name = camelize(type.name);

    easingObject[name] = type.characters.trim();
  });

  return easingObject;
}
