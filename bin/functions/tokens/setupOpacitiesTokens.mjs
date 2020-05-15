import { camelize } from '../helpers/camelize.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupOpacitiesTokensNoFrame,
  errorSetupOpacitiesTokensNoChildren,
  errorSetupOpacitiesTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma opacities scale into a clean object
 *
 * @exports
 * @function
 * @param {object} opacitiesFrame - The opacities frame from Figma
 * @returns {object} - Returns an object with all the opacities
 * @throws {errorSetupRadiusTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupRadiusTokensNoChildren} - When missing children in Figma frame
 * @throws {errorSetupRadiusTokensMissingProps} - When missing required props in frame children
 */
export function setupOpacitiesTokens(opacitiesFrame, opacitiesUnit) {
  if (!opacitiesFrame) throw new Error(errorSetupOpacitiesTokensNoFrame);
  if (!opacitiesFrame.children) throw new Error(errorSetupOpacitiesTokensNoChildren);

  console.info('frame', opacitiesFrame);

  // Reduce the children array to a tokens object
  const opacityTokensObject = opacitiesFrame.children.reduce(
    // Reducer function: will add a new key to the current "opacitiesObject" at each iteration
    (tokens, type) => {
      if (!type.name) throw new Error(errorSetupOpacitiesTokensMissingProps);

      // Note: Figma API does not provide an opacity value if its 100%
      // We will assume it defaults to 1 if undefined.
      const name = formatName(camelize(type.name));
      let opacity =
        typeof type.opacity !== 'undefined'
          ? // Keep only 2 decimals of the parsed-to-float value
            Math.round(parseFloat(type.opacity) * 100) / 100
          : 1;

      // Unit conversion
      switch (opacitiesUnit) {
        case 'float':
          // job is already done by default
          break;
        case 'percent':
          opacity = `${opacity * 100}%`;
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
