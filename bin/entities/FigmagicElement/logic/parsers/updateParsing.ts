import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';

import { ErrorUpdateParsing } from '../../../../frameworks/errors/errors';

export function updateParsing(
  css: string,
  updatedCss: string | null,
  imports: any[],
  updatedImports: any[] | null
): ParsedElementMetadataInterface {
  try {
    if (!css || !imports) throw Error(ErrorUpdateParsing);

    const CSS = updatedCss ? (css += updatedCss) : css;
    const IMPORTS = updatedImports ? updatedImports.forEach((i) => imports.push(i)) : imports;

    return { css: CSS, imports: IMPORTS };
  } catch (error: any) {
    throw Error(error);
  }
}
