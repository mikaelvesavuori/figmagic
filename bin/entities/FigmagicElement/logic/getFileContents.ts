import * as path from 'path';

import { sliceOutObjectFromFile } from './sliceOutObjectFromFile';

import { JsonFileData } from '../../../contracts/Files';

import { ErrorGetFileContents } from '../../../frameworks/errors/errors';

/**
 * @description Get contents of local file as a JSON object
 */
export function getFileContents(filepath: string, filename: string, format: string): JsonFileData {
  if (!filepath || !filename || !format) throw Error(ErrorGetFileContents);

  const file = path.join(`${process.cwd()}`, filepath, `${filename}.${format}`);
  return sliceOutObjectFromFile(file);
}
