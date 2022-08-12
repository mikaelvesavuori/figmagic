import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Color } from '../../../../contracts/Parsing';
import { Imports } from '../../../../contracts/Imports';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseBackgroundColor } from '../../../../frameworks/errors/errors';

type BackgroundColorParams = {
  colors: Color;
  backgroundColor: string;
  remSize: number;
  outputFormatColors: OutputFormatColors;
};

export function parseBackgroundColor(
  css: string,
  imports: Imports[],
  params: BackgroundColorParams
): ParsedElementMetadataInterface {
  if (!css || !imports || !params) throw Error(ErrorParseBackgroundColor);

  const { colors, backgroundColor, remSize, outputFormatColors } = params;

  const property = backgroundColor.includes('gradient') ? 'background' : 'background-color';

  const { updatedCss, updatedImports } = getTokenMatch(
    colors,
    'colors',
    property,
    backgroundColor,
    remSize,
    outputFormatColors
  );

  return updateParsing(css, updatedCss, imports, updatedImports);
}
