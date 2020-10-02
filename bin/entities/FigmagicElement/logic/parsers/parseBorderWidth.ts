import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseBorderWidth } from '../../../../frameworks/errors/errors';

type BorderWidthParams = {
  borderWidths: Record<string, unknown>;
  borderWidth: string;
  remSize: number;
};

export function parseBorderWidth(
  css: string,
  imports: any[],
  params: BorderWidthParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw new Error(ErrorParseBorderWidth);
    const { borderWidths, borderWidth, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      borderWidths,
      'borderWidths',
      'border-width',
      borderWidth,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error) {
    throw new Error(error);
  }
}
