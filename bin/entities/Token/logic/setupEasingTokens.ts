import { FRAME as Frame } from '../../../contracts/Figma';
import { EasingTokens } from '../../../contracts/Tokens';

import { makeEasingTokens } from '../index';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupEasingTokensNoFrame,
  ErrorSetupEasingTokensNoChildren,
  ErrorSetupEasingTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma easings into a clean object
 */
export function setupEasingTokens(easingFrame: Frame): EasingTokens {
  if (!easingFrame) throw new Error(ErrorSetupEasingTokensNoFrame);
  if (!easingFrame.children) throw new Error(ErrorSetupEasingTokensNoChildren);

  const easings: Record<string, unknown> = {};

  const TOKENS = easingFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupEasingTokensMissingProps);
    const NAME = camelize(item.name);
    easings[NAME] = item.characters.trim();
  });

  return makeEasingTokens(easings);
}
