import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseBackgroundColor } from '../../../../frameworks/errors/errors';

type BackgroundColorParams = {
  colors: Record<string, unknown>;
  backgroundColor: string;
  remSize: number;
};

export function parseBackgroundColor(
  css: string,
  imports: any[],
  params: BackgroundColorParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw Error(ErrorParseBackgroundColor);

    const { colors, backgroundColor, remSize } = params;

    const PROPERTY = backgroundColor.includes('gradient') ? 'background' : 'background-color';

    const { updatedCss, updatedImports } = getTokenMatch(
      colors,
      'colors',
      PROPERTY,
      backgroundColor,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error: any) {
    throw Error(error);
  }
}
