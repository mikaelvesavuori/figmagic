import { FRAME as Frame } from '../../../contracts/Figma';
import { makeOpacityTokens } from '../index';
import { OpacityTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupOpacityTokensNoFrame,
  ErrorSetupOpacityTokensNoChildren,
  ErrorSetupOpacityTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma opacities scale into a clean object
 *
 * @param opacitiesFrame The opacities frame from Figma
 * @param opacitiesUnit The opacity unit as a string
 */
export function setupOpacityTokens(
  opacitiesFrame: Frame,
  opacitiesUnit: 'float' | 'percent'
): OpacityTokens {
  if (!opacitiesFrame) throw new Error(ErrorSetupOpacityTokensNoFrame);
  if (!opacitiesFrame.children) throw new Error(ErrorSetupOpacityTokensNoChildren);

  // Reduce the children array to a tokens object
  const _opacityTokens = opacitiesFrame.children.reduce(
    // Reducer function: will add a new key to the current "opacitiesObject" at each iteration
    (tokens, item: Frame) => {
      if (!item.name) throw new Error(ErrorSetupOpacityTokensMissingProps);

      // Note: Figma API does not provide an opacity value if its 100%
      // We will assume it defaults to 1 if undefined.
      const name = camelize(item.name);
      const opacity = (() => {
        let _opacity: string | number = 1;

        // Keep only 2 decimals of the parsed-to-float value
        if (typeof item.opacity !== 'undefined') _opacity = Math.round(item.opacity * 100) / 100;

        // Unit conversion
        if (opacitiesUnit === 'percent') _opacity = `${_opacity * 100}%`;

        return _opacity;
      })();

      // Assuming name is unique (otherwise it would be overwritten)
      tokens[name] = opacity;

      return tokens;
    },
    // Initial shape: just an empty object
    {}
  );

  return makeOpacityTokens(_opacityTokens);
}
