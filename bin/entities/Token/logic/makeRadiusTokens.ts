import { FRAME as Frame } from '../../../contracts/Figma';
import { RadiusTokens } from '../../../contracts/Tokens';
import { RadiusUnit } from '../../../contracts/Config';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';
import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import {
  ErrorMakeRadiusTokensNoFrame,
  ErrorMakeRadiusTokensNoChildren,
  ErrorMakeRadiusTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma radii into a clean object
 */
export function makeRadiusTokens(
  radiusFrame: Frame,
  radiusUnit: RadiusUnit,
  remSize: number,
  camelizeTokenNames?: boolean
): RadiusTokens {
  if (!radiusFrame) throw Error(ErrorMakeRadiusTokensNoFrame);
  if (!radiusFrame.children) throw Error(ErrorMakeRadiusTokensNoChildren);

  const cornerRadii: Record<string, string> = {};
  const tokens = radiusFrame.children.reverse();
  tokens.forEach((item: Frame) =>
    makeRadiusToken(item, cornerRadii, radiusUnit, remSize, camelizeTokenNames)
  );

  return cornerRadii as RadiusTokens;
}

function makeRadiusToken(
  item: Frame,
  cornerRadii: Record<string, string>,
  radiusUnit: RadiusUnit,
  remSize: number,
  camelizeTokenNames?: boolean
) {
  if (!item.name) throw Error(ErrorMakeRadiusTokensMissingProps);

  const name: string = sanitizeString(item.name, camelizeTokenNames);
  const cornerRadius: string = item.cornerRadius
    ? normalizeUnits(item.cornerRadius, 'px', radiusUnit as string, remSize)
    : `0${radiusUnit}`;
  cornerRadii[name] = cornerRadius;
}
