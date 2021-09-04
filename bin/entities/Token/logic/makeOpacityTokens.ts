import { FRAME as Frame } from '../../../contracts/Figma';
import { OpacityTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorMakeOpacityTokensNoFrame,
  ErrorMakeOpacityTokensNoChildren,
  ErrorMakeOpacityTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma opacities scale into a clean object
 */
// TODO: Refactor
export function makeOpacityTokens(
  opacitiesFrame: Frame,
  opacitiesUnit: 'float' | 'percent'
): OpacityTokens {
  if (!opacitiesFrame) throw Error(ErrorMakeOpacityTokensNoFrame);
  if (!opacitiesFrame.children) throw Error(ErrorMakeOpacityTokensNoChildren);

  const TOKENS = opacitiesFrame.children;

  const opacityTokens = TOKENS.reduce((tokens: { [index: string]: any }, item: Frame) => {
    if (!item.name) throw Error(ErrorMakeOpacityTokensMissingProps);

    // Note: Figma API does not provide an opacity value if its 100%. We will assume it defaults to 1 if undefined.
    const NAME = camelize(item.name);
    const OPACITY = (() => {
      let opacity: string | number = 1;

      if (typeof item.opacity !== 'undefined') opacity = Math.round(item.opacity * 100) / 100;
      if (opacitiesUnit === 'percent') opacity = `${opacity * 100}%`;

      return opacity;
    })();

    tokens[NAME] = OPACITY;

    return tokens;
  }, {});

  return opacityTokens;
}
