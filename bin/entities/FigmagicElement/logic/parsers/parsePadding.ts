import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParsePadding } from '../../../../frameworks/errors/errors';

type PaddingParams = {
  padding: Record<string, unknown>;
  spacing: Record<string, unknown>;
  remSize: number;
};

export function parsePadding(
  css: string,
  imports: any[],
  params: PaddingParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw Error(ErrorParsePadding);
    const { padding, spacing, remSize } = params;

    if (!(padding && Object.keys(padding).length > 0)) return { css, imports };

    const PADDINGS = Object.values(padding).map((p) => p);
    if (PADDINGS.every((item) => item === 0)) return updateParsing(css, null, imports, null);

    const { updatedCss, updatedImports } = getTokenMatch(
      spacing,
      'spacing',
      'padding',
      padding,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error: any) {
    throw Error(error);
  }
}
