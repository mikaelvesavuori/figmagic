import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
import { Tokens } from '../../../../contracts/Tokens';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseHeight } from '../../../../frameworks/errors/errors';

type HeightParams = {
  spacing: Record<string, string>;
  height: number;
  remSize: number;
  outputFormatColors: OutputFormatColors;
};

export function parseHeight(
  css: string,
  imports: Imports[],
  params: HeightParams
): ParsedElementMetadataInterface {
  if (!css || !imports || !params) throw Error(ErrorParseHeight);
  const { spacing, height, remSize, outputFormatColors } = params;

  const { updatedCss, updatedImports } = getTokenMatch(
    spacing as unknown as Tokens,
    'spacing',
    'height',
    height,
    remSize,
    outputFormatColors
  );

  return updateParsing(css, updatedCss, imports, updatedImports);
}
