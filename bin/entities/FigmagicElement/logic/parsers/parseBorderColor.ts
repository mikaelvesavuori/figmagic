import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseBorderColor } from '../../../../frameworks/errors/errors';

type BorderColorParams = {
  colors: Record<string, unknown>;
  borderColor: string;
  remSize: number;
  outputFormatColors: OutputFormatColors;
};

export function parseBorderColor(
  css: string,
  imports: any[],
  params: BorderColorParams
): ParsedElementMetadataInterface {
  if (!css || !imports || !params) throw Error(ErrorParseBorderColor);

  const { colors, borderColor, remSize, outputFormatColors } = params;

  const { updatedCss, updatedImports } = getTokenMatch(
    colors,
    'colors',
    'border-color',
    borderColor,
    remSize,
    outputFormatColors
  );

  return updateParsing(css, updatedCss, imports, updatedImports);
}
