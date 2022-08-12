import { FRAME as Frame } from '../../../contracts/Figma';
import { EasingTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeEasingTokensNoFrame,
  ErrorMakeEasingTokensNoChildren,
  ErrorMakeEasingTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma easings into a clean object
 */
export function makeEasingTokens(easingFrame: Frame, camelizeTokenNames?: boolean): EasingTokens {
  if (!easingFrame) throw Error(ErrorMakeEasingTokensNoFrame);
  if (!easingFrame.children) throw Error(ErrorMakeEasingTokensNoChildren);

  const easings: Record<string, string> = {};
  const tokens = easingFrame.children.reverse();
  tokens.forEach((item: Frame) => makeEasingToken(item, easings, camelizeTokenNames));

  return easings as EasingTokens;
}

function makeEasingToken(
  item: Frame,
  easings: Record<string, string>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.characters) throw Error(ErrorMakeEasingTokensMissingProps);

  const name = sanitizeString(item.name, camelizeTokenNames);
  easings[name] = item.characters.trim();
}
