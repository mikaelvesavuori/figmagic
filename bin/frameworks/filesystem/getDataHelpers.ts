import { createImportStringFromList } from '../string/createImportStringFromList';

/**
 * Helper block to decouple logic from prepareWrite function
 */
export const getElement = (metadata: undefined | null | Record<string, any>): string => {
  if (metadata) {
    if (metadata.element) return metadata.element;
    else return 'div';
  } else return 'div';
};

export const getText = (metadata: undefined | null | Record<string, any>): string => {
  if (metadata) {
    if (metadata.text) return metadata.text;
    else return '';
  } else return '';
};

export const getExtraProps = (metadata: undefined | null | Record<string, any>): string => {
  if (metadata) {
    if (metadata.extraProps) return metadata.extraProps;
    else return '';
  } else return '';
};

export const getImports = (
  metadata: undefined | null | Record<string, any>,
  outputFolderTokens?: string | undefined,
  tokensRelativeImportPrefix?: string | undefined
): string => {
  if (metadata) {
    if (metadata.imports) {
      if (metadata.imports.length > 0) {
        return createImportStringFromList(
          metadata.imports,
          outputFolderTokens,
          tokensRelativeImportPrefix
        );
      } else return '';
    } else return '';
  } else return '';
};
