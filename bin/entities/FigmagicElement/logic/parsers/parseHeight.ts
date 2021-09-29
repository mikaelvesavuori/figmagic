import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseHeight } from '../../../../frameworks/errors/errors';

type HeightParams = {
  spacing: Record<string, unknown>;
  height: number;
  remSize: number;
  outputFormatColors: OutputFormatColors;
};

export function parseHeight(
  css: string,
  imports: any[],
  params: HeightParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw Error(ErrorParseHeight);
    const { spacing, height, remSize, outputFormatColors } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      spacing,
      'spacing',
      'height',
      height,
      remSize,
      outputFormatColors
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error: any) {
    throw Error(error);
  }
}
