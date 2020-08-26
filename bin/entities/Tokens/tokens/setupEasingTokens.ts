import { Frame } from '../../../app/contracts/Frame';
import { makeEasingTokens } from '../index';
import { EasingTokens } from '../Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupEasingTokensNoFrame,
  ErrorSetupEasingTokensNoChildren,
  ErrorSetupEasingTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma easings into a clean object
 *
 * @param easingFrame The easings frame from Figma
 */
export function setupEasingTokens(easingFrame: Frame): EasingTokens {
  if (!easingFrame) throw new Error(ErrorSetupEasingTokensNoFrame);
  if (!easingFrame.children) throw new Error(ErrorSetupEasingTokensNoChildren);

  let easings = {};

  easingFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(ErrorSetupEasingTokensMissingProps);
    const name = camelize(type.name);
    easings[name] = type.characters.trim();
  });

  const easingTokens = makeEasingTokens(easings);
  return easingTokens;
}
