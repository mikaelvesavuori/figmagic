import { camelize } from '../helpers/camelize.mjs';
import { roundColorValue } from '../helpers/roundColorValue.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupShadowTokensNoFrame,
  errorSetupShadowTokensNoChildren,
  errorSetupShadowTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma shadows into a clean object
 *
 * @exports
 * @function
 * @param {object} shadowFrame - The shadows frame from Figma
 * @returns {object} - Returns an object with all the shadows
 * @throws {errorSetupShadowTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupShadowTokensNoChildren} - When missing children in Figma frame
 * @throws {errorSetupShadowTokensMissingProps} - When missing required props in frame children
 */
export function setupShadowTokens(shadowFrame) {
  if (!shadowFrame) throw new Error(errorSetupShadowTokensNoFrame);
  if (!shadowFrame.children) throw new Error(errorSetupShadowTokensNoChildren);

  let shadowObject = {};

  shadowFrame.children.forEach((type) => {
    if (!type.name || !type.effects) throw new Error(errorSetupShadowTokensMissingProps);

    let name = camelize(type.name);
    name = formatName(name);
    let dropShadow = null;

    const asdf = type.effects.map((effect) => {
      //console.log('effect', effect);
      if (effect.type === 'DROP_SHADOW') {
        dropShadow = effect;
        return effect;
      }
    });

    console.log('asdf', asdf.length, asdf);
    //console.log(name);
    //console.log(dropShadow);

    if (dropShadow && asdf.length > 0) {
      const X = dropShadow.offset.x;
      const Y = dropShadow.offset.y;
      const RADIUS = dropShadow.radius;
      const R = roundColorValue(dropShadow.color.r);
      const G = roundColorValue(dropShadow.color.g);
      const B = roundColorValue(dropShadow.color.b);
      const A = roundColorValue(dropShadow.color.a, 1);

      shadowObject[name] = `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;

      let xxx = [];

      asdf.forEach((a, index) => {
        const X = a.offset.x;
        const Y = a.offset.y;
        const RADIUS = a.radius;
        const R = roundColorValue(a.color.r);
        const G = roundColorValue(a.color.g);
        const B = roundColorValue(a.color.b);
        const A = roundColorValue(a.color.a, 1);

        if (xxx[name] === '' || xxx[name] === undefined) xxx[name] = ``;
        xxx[name] += `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A}), `;
        console.log(index, asdf[index]);
        //if (index === asdf.length - 1) xxx[name] = xxx[name].slice(0, xxx[name.length] - 2);
      });

      console.log('––––––');
      console.log(xxx);
    } else shadowObject[name] = ``;
  });

  return shadowObject;
}
