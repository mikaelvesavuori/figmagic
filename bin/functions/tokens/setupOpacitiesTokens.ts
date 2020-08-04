import { camelize } from '../helpers/camelize';

import {
  errorSetupOpacitiesTokensNoFrame,
  errorSetupOpacitiesTokensNoChildren,
  errorSetupOpacitiesTokensMissingProps
} from '../../meta/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma opacities scale into a clean object
 *
 * @exports
 * @function
 * @param {Frame} opacitiesFrame - The opacities frame from Figma
 * @param {string} opacitiesUnit - The opacity unit as a string
 * @returns {object} - Returns an object with all the opacities
 * @throws {errorSetupRadiusTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupRadiusTokensNoChildren} - When missing children in Figma frame
 * @throws {errorSetupRadiusTokensMissingProps} - When missing required props in frame children
 */
export function setupOpacitiesTokens(
  opacitiesFrame: Frame,
  opacitiesUnit: 'float' | 'percent'
): object {
  if (!opacitiesFrame) throw new Error(errorSetupOpacitiesTokensNoFrame);
  if (!opacitiesFrame.children) throw new Error(errorSetupOpacitiesTokensNoChildren);

  // Reduce the children array to a tokens object
  const opacityTokensObject = opacitiesFrame.children.reduce(
    // Reducer function: will add a new key to the current "opacitiesObject" at each iteration
    (tokens, type) => {
      if (!type.name) throw new Error(errorSetupOpacitiesTokensMissingProps);

      // Note: Figma API does not provide an opacity value if its 100%
      // We will assume it defaults to 1 if undefined.
      const name = camelize(type.name);
      let opacity: string = '1';

      // Keep only 2 decimals of the parsed-to-float value
      if (typeof type.opacity !== 'undefined') {
        const opacityCalc: number = Math.round((parseFloat(type.opacity) * 100) / 100);
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
