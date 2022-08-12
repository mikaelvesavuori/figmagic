import { Imports } from '../../../../contracts/Imports';
import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { ErrorUpdateParsing } from '../../../../frameworks/errors/errors';

export function updateParsing(
  css: string,
  updatedCss: string | null,
  imports: Imports[],
  updatedImports: Imports[] | null
): ParsedElementMetadataInterface {
  if (!css || !imports) throw Error(ErrorUpdateParsing);

  return {
    css: updatedCss ? (css += updatedCss) : css,
    imports: updatedImports ? updatedImports.forEach((i) => imports.push(i)) : imports
  };
}
