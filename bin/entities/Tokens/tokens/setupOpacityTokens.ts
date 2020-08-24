import { camelize } from '../helpers/camelize';

import {
  ErrorSetupOpacityTokensNoFrame,
  ErrorSetupOpacityTokensNoChildren,
  ErrorSetupOpacityTokensMissingProps
} from '../../frameworks/errors/errors';

import { Frame } from '../../entities/Frame/Frame';

/**
 * Places all Figma opacities scale into a clean object
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
  const opacityTokensObject = opacitiesFrame.children.reduce(
    // Reducer function: will add a new key to the current "opacitiesObject" at each iteration
    (tokens, type) => {
      if (!type.name) throw new Error(ErrorSetupOpacityTokensMissingProps);

      // Note: Figma API does not provide an opacity value if its 100%
      // We will assume it defaults to 1 if undefined.
      const name = camelize(type.name);
      let opacity: string = '1';

      // Keep only 2 decimals of the parsed-to-float value
      if (typeof type.opacity !== 'undefined') {
        const opacityCalc: number = Math.round((type.opacity * 100) / 100);
        opacity = opacityCalc.toString();
      }

      // Unit conversion
      switch (opacitiesUnit) {
        case 'float':
          // Job is already done by default
          break;
        case 'percent':
          const opacityCalc: number = parseFloat(opacity) * 100;
          opacity = `${opacityCalc}%`;
          break;
      }

      // Assuming name is unique (otherwise it would be overwritten)
      tokens[name] = opacity;

      return tokens;
    },
    // Initial shape: just an empty object
    {}
  );

  return opacityTokensObject;
}
