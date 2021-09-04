import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseBorderRadius } from '../../../../frameworks/errors/errors';

type BorderRadiusParams = {
  radii: Record<string, unknown>;
  borderRadius: string;
  remSize: number;
};

export function parseBorderRadius(
  css: string,
  imports: any[],
  params: BorderRadiusParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw Error(ErrorParseBorderRadius);

    const { radii, borderRadius, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      radii,
      'radii',
      'border-radius',
      borderRadius,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error: any) {
    throw Error(error);
  }
}
