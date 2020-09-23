import { FRAME as Frame } from '../../../contracts/Figma';
import { EasingTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupEasingTokensNoFrame,
  ErrorSetupEasingTokensNoChildren,
  ErrorSetupEasingTokensMissingProps
} from '../../../frameworks/errors/errors';

export const makeEasingTokens = (frame: Frame): EasingTokens => setupEasingTokens(frame);

/**
 * @description Places all Figma easings into a clean object
 */
function setupEasingTokens(easingFrame: Frame): EasingTokens {
  if (!easingFrame) throw new Error(ErrorSetupEasingTokensNoFrame);
  if (!easingFrame.children) throw new Error(ErrorSetupEasingTokensNoChildren);

  const easings: Record<string, unknown> = {};

  const TOKENS = easingFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorSetupEasingTokensMissingProps);
    const NAME = camelize(item.name);
    easings[NAME] = item.characters.trim();
  });

  // @ts-ignore
  return easings as EasingTokens;
}
