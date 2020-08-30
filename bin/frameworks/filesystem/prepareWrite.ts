import { WriteOperation, GetFileDataOperation } from '../../app/contracts/Write';

import { getElement, getText, getExtraProps, getImports } from './getDataHelpers';
import { getFileContentAndPath } from '../filesystem/getFileContentAndPath';

import { ErrorPrepareWrite, ErrorWriteFile } from '../errors/errors';
/**
 * @description Controller that starts the prepping/formatting of the file(s)
 *
 * @param writeOperation Object type with everything required (at this stage) to write the file later
 */
export async function prepareWrite(writeOperation: WriteOperation): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!writeOperation) reject(ErrorWriteFile);
    try {
      const { type, file, path, name, format, metadata, templates } = writeOperation;

      if ((type === 'css' || type === 'story' || type === 'component') && !templates)
        throw new Error(ErrorPrepareWrite);

      const getFileContentAndPathOperation: GetFileDataOperation = {
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

      resolve(getFileContentAndPath(getFileContentAndPathOperation));
    } catch (error) {
      reject(error);
    }
  });
}
