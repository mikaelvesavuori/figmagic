import { createImportStringFromList } from '../string/createImportStringFromList';

/**
 * Helper block to decouple logic from prepareWrite function
 *
 * @param metadata Metadata
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

export const getImports = (metadata: undefined | null | Record<string, any>): string => {
  if (metadata) {
    if (metadata.imports) {
      if (metadata.imports.length > 0) return createImportStringFromList(metadata.imports);
    } else return '';
  } else return '';
  return null;
};
