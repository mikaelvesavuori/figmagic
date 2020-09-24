import { FRAME as Frame } from '../../../contracts/Figma';
import { EasingTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorMakeEasingTokensNoFrame,
  ErrorMakeEasingTokensNoChildren,
  ErrorMakeEasingTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma easings into a clean object
 */
export function makeEasingTokens(easingFrame: Frame): EasingTokens {
  if (!easingFrame) throw new Error(ErrorMakeEasingTokensNoFrame);
  if (!easingFrame.children) throw new Error(ErrorMakeEasingTokensNoChildren);

  const easings: Record<string, unknown> = {};

  const TOKENS = easingFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.characters) throw new Error(ErrorMakeEasingTokensMissingProps);
    const NAME = camelize(item.name);
    easings[NAME] = item.characters.trim();
  });

  // @ts-ignore
  return easings as EasingTokens;
}
