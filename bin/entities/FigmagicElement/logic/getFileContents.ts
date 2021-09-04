import * as path from 'path';

import { sliceOutObjectFromFile } from './sliceOutObjectFromFile';

import { ErrorGetFileContents } from '../../../frameworks/errors/errors';

/**
 * @description Get contents of local file as a JSON object
 */
export function getFileContents(
  filepath: string,
  filename: string,
  format: string
): Record<string, unknown> | void {
  try {
    if (!filepath || !filename || !format) throw Error(ErrorGetFileContents);
    const FILE = path.join(`${process.cwd()}`, filepath, `${filename}.${format}`);
    return sliceOutObjectFromFile(FILE);
  } catch (error: any) {
    throw Error(error);
  }
}
