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
export async function writeFile(writeOperation: WriteOperation): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    //console.log('||| writeOperation |||', writeOperation);
    if (!writeOperation) reject(ErrorWriteFile);

    const { type, file, path, name, format, metadata, templates } = writeOperation;
    if (!file || !path || !name || !type) {
      console.log(`MISSING STUFF: file: ${file}, path: ${path}, name: ${name}, type: ${type}`);
      reject(ErrorWriteFile);
      throw new Error(ErrorWriteFile);
    }

    const _type: any = type.toLowerCase();

    if (!acceptedFileTypes.includes(_type)) reject(ErrorWriteFileWrongType);

    await createFolder(path);

    const prepareWriteOperation: WriteOperation = {
      type: _type,
      file,
      path,
      name,
      format,
      metadata,
      templates
    };

    try {
      const { filePath, fileContent } = await prepareWrite(prepareWriteOperation);
      await write(filePath, fileContent);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
