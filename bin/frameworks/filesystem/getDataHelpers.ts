import { Metadata } from '../../contracts/Metadata';
import { createImportStringFromList } from '../string/createImportStringFromList';

/**
 * Helper block to decouple logic from prepareWrite function
 */
export const getElement = (metadata?: Metadata): string => {
  if (metadata && metadata.element) return metadata.element;
  return 'div';
};

export const getText = (metadata?: Metadata): string => {
  if (metadata && metadata.text) return metadata.text;
  return '';
};

export const getExtraProps = (metadata?: Metadata): string => {
  if (metadata && metadata.extraProps) return metadata.extraProps;
  return '';
};

export const getImports = (
  metadata?: Metadata,
  outputFolderTokens?: string,
  tokensRelativeImportPrefix?: string
): string => {
  if (metadata && metadata.imports && metadata.imports.length > 0)
    return createImportStringFromList(
      metadata.imports,
      outputFolderTokens,
      tokensRelativeImportPrefix
    );

  return '';
};
