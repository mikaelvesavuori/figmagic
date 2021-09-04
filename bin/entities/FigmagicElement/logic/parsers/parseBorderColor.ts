import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseBorderColor } from '../../../../frameworks/errors/errors';

type BorderColorParams = {
  colors: Record<string, unknown>;
  borderColor: string;
  remSize: number;
};

export function parseBorderColor(
  css: string,
  imports: any[],
  params: BorderColorParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseBorderColor);

    const { colors, borderColor, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      'border-color',
      borderColor,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error: any) {
    throw new Error(error);
  }
}
