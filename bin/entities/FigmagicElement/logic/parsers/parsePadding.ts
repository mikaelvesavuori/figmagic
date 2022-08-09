import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { Imports } from '../../../../contracts/Imports';
import { Tokens } from '../../../../contracts/Tokens';

import { getTokenMatch } from '../getTokenMatch';
import { updateParsing } from './updateParsing';

import { ErrorParsePadding } from '../../../../frameworks/errors/errors';

type PaddingParams = {
  padding: Record<string, any>;
  spacing: Record<string, any>;
  remSize: number;
};

export function parsePadding(
  css: string,
  imports: Imports[],
  params: PaddingParams
): ParsedElementMetadataInterface {
  if (!css || !imports || !params) throw Error(ErrorParsePadding);
  const { padding, spacing, remSize } = params;

  if (!(padding && Object.keys(padding).length > 0)) return { css, imports };

  const paddings = Object.values(padding).map((p) => p);
  if (paddings.every((item) => item === 0)) return updateParsing(css, null, imports, null);

  const { updatedCss, updatedImports } = getTokenMatch(
    spacing as unknown as Tokens,
    'spacing',
    'padding',
    padding,
    remSize
  );

  return updateParsing(css, updatedCss, imports, updatedImports);
}
