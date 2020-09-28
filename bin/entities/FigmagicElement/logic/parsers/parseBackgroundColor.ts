import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from '../getTokenMatch';

import { ErrorParseBackgroundColor } from '../../../../frameworks/errors/errors';

import { updateParsing } from './updateParsing';

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
    if (!css || !imports || !params) throw new Error(ErrorParseBackgroundColor);

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
  } catch (error) {
    throw new Error(ErrorParseBackgroundColor);
  }
}
