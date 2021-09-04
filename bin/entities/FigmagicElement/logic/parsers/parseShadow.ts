import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParseShadow } from '../../../../frameworks/errors/errors';

type ShadowParams = {
  shadows: Record<string, unknown>;
  shadow: string;
  remSize: number;
};

export function parseShadow(
  css: string,
  imports: any[],
  params: ShadowParams
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports || !params) throw Error(ErrorParseShadow);

    const { shadows, shadow, remSize } = params;

    const { updatedCss, updatedImports } = getTokenMatch(
      shadows,
      'shadows',
      'box-shadow',
      shadow,
      remSize
    );

    return updateParsing(css, updatedCss, imports, updatedImports);
  } catch (error: any) {
    throw Error(error);
  }
}
