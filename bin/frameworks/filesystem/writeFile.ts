import { WriteOperation } from '../../contracts/Write';

import { createFolder } from './createFolder';
import { prepareWrite } from './prepareWrite';
import { write } from './write';

import { acceptedFileTypes } from '../system/acceptedFileTypes';

import { ErrorWriteFile, ErrorWriteFileWrongType } from '../errors/errors';

/**
 * @description Handles writing files to disk, complete with pre-processing.
 *
 * @param writeOperation Object type with all arguments needed to write the file
 */
export function writeFile(writeOperation: WriteOperation): void {
  try {
    if (!writeOperation) throw new Error(ErrorWriteFile);

    const { type, file, path, name, format, metadata, templates } = writeOperation;
    if (!file || !path || !name || !type) throw new Error(ErrorWriteFile);

    const _type: any = type.toLowerCase();

    if (!acceptedFileTypes.includes(_type)) throw new Error(ErrorWriteFileWrongType);

    createFolder(path);

    const prepareWriteOperation: WriteOperation = {
      type: _type,
      file,
      path,
      name,
      format,
      metadata,
      templates
    };

    const { filePath, fileContent } = prepareWrite(prepareWriteOperation);
    write(filePath, fileContent);
  } catch (error) {
    throw new Error(error);
  }
}
