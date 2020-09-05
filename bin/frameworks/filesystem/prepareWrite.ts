import { WriteOperation, GetFileDataOperation } from '../../contracts/Write';

import { getElement, getText, getExtraProps, getImports } from './getDataHelpers';
import { getFileContentAndPath } from '../filesystem/getFileContentAndPath';

import { ErrorPrepareWrite, ErrorWriteFile } from '../errors/errors';

/**
 * @description Controller that starts the prepping/formatting of the file(s)
 *
 * @param writeOperation Object type with everything required (at this stage) to write the file later
 */
export function prepareWrite(writeOperation: WriteOperation): any {
  if (!writeOperation) throw new Error(ErrorWriteFile);
  try {
    const { type, file, path, name, format, metadata, templates } = writeOperation;

    if ((type === 'css' || type === 'story' || type === 'component') && !templates)
      throw new Error(ErrorPrepareWrite);

    const getFileDataOperation: GetFileDataOperation = {
      type,
      file,
      path,
      name: name.replace('//g', ''),
      format,
      text: getText(metadata),
      element: getElement(metadata),
      imports: getImports(metadata),
      extraProps: getExtraProps(metadata),
      metadata,
      templates
    };

    return getFileContentAndPath(getFileDataOperation);
  } catch (error) {
    throw new Error(error);
  }
}
