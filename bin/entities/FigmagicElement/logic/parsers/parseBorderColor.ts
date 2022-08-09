import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
import { Color } from '../../../../contracts/Parsing';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseBorderColor } from '../../../../frameworks/errors/errors';

type BorderColorParams = {
  colors: Color;
  borderColor: string;
  remSize: number;
  outputFormatColors: OutputFormatColors;
};

export function parseBorderColor(
  css: string,
  imports: Imports[],
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
