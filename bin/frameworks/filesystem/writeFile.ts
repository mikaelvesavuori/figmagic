import { FileType, WriteOperation } from '../../contracts/Write';

import { createFolder } from './createFolder';
import { createMissingFoldersFromPath } from './createMissingFoldersFromPath';
import { prepareWrite } from './prepareWrite';
import { write } from './write';

import { acceptedFileTypes } from '../system/acceptedFileTypes';

import { ErrorWriteFile, ErrorWriteFileWrongType } from '../errors/errors';
import { ProcessedToken } from '../../contracts/ProcessedToken';

/**
 * @description Handles writing files to disk, complete with pre-processing.
 */
export function writeFile(writeOperation: WriteOperation): void {
  if (!writeOperation) throw Error(ErrorWriteFile);

  const {
    type,
    file,
    path,
    name,
    format,
    outputFolderTokens,
    overwrite,
    tokensRelativeImportPrefix,
    metadata,
    templates
  } = writeOperation;
  validate(file, path, name, type);

  const fileType: FileType = typeof type === 'string' ? (type.toLowerCase() as FileType) : 'null';
  if (!acceptedFileTypes.includes(fileType)) throw Error(ErrorWriteFileWrongType);

  if (fileType === 'component' || fileType === 'graphic') createMissingFoldersFromPath(path);
  else createFolder(path);

  const fixedName = name.split('/')[name.split('/').length - 1];

  const prepareWriteOperation: WriteOperation = {
    type: fileType,
    file,
    path,
    name: fixedName,
    format,
    outputFolderTokens,
    overwrite,
    tokensRelativeImportPrefix,
    metadata,
    templates
  };

  const { filePath, fileContent } = prepareWrite(prepareWriteOperation);
  write(filePath, fileContent);
}

function validate(file: string | ProcessedToken, path: string, name: string, type: FileType) {
  if (!file || !path || !name || !type) throw Error(ErrorWriteFile);
}
