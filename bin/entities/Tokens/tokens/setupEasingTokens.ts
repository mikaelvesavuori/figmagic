import { FRAME as Frame } from '../../../contracts/Figma';
import { makeEasingTokens } from '../index';
import { EasingTokens } from '../../../contracts/Tokens';

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

  const easings: Record<string, unknown> = {};

  easingFrame.children.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupEasingTokensMissingProps);
    const name = camelize(item.name);
    easings[name] = item.characters.trim();
  });

  const easingTokens = makeEasingTokens(easings);
  return easingTokens;
}
