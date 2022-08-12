import { createFolder } from '../../../frameworks/filesystem/createFolder';
import { write } from '../../../frameworks/filesystem/write';

import { ErrorWriteGraphicElementsMap } from '../../../frameworks/errors/errors';

/**
 * @description Write a map ("index") object to export all React components that derive from the Graphics frame
 */
export function writeGraphicElementsMap(
  folder: string,
  filePath: string,
  fileContent: string
): void {
  if (!folder || !filePath || !fileContent) throw Error(ErrorWriteGraphicElementsMap);

  createFolder(folder);
  write(filePath, fileContent);
}
