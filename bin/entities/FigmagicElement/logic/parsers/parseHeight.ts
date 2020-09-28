import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from '../getTokenMatch';

import { ErrorParseHeight } from '../../../../frameworks/errors/errors';

import { updateParsing } from './updateParsing';

type HeightParams = {
  spacing: Record<string, unknown>;
  height: number;
  remSize: number;
};

export function parseHeight(
  css: string,
  imports: any[],
  params: HeightParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseHeight);
    const { spacing, height, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      spacing,
      'spacing',
      'height',
      height,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(ErrorParseHeight);
  }
}
