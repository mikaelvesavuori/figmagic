import * as path from 'path';

import { sliceOutObjectFromFile } from './sliceOutObjectFromFile';

/**
 * @description Get contents of local file as a JSON object
 * @param filepath Path (not including file name)
 * @param filename File name
 * @param format File format
 */
export function getFileContents(
  filepath: string,
  filename: string,
  format: string
): Record<string, unknown> {
  try {
    if (!filepath || !filename || !format) throw new Error('Missing path, name and/or format!'); // TODO: Add custom error
    const file = path.join(`${process.cwd()}`, filepath, `${filename}.${format}`);
    return sliceOutObjectFromFile(file);
  } catch (error) {
    throw new Error(error); // TODO: Add custom error
  }
}
