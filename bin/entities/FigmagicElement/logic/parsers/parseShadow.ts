import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseShadow } from '../../../../frameworks/errors/errors';

type ShadowParams = {
  shadows: Record<string, unknown>;
  shadow: string;
  remSize: number;
  outputFormatColors: OutputFormatColors;
};

export function parseShadow(
  css: string,
  imports: any[],
  params: ShadowParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw Error(ErrorParseShadow);

    const { shadows, shadow, remSize, outputFormatColors } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      shadows,
      'shadows',
      'box-shadow',
      shadow,
      remSize,
      outputFormatColors
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error: any) {
    throw Error(error);
  }
}
