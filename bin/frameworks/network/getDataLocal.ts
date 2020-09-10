import * as path from 'path';

import { FigmaData } from '../../contracts/FigmaData';

import { loadFile } from '../filesystem/loadFile';

import { MsgSetDataFromLocal } from '../messages/messages';
import { ErrorGetDataLocal } from '../errors/errors';

/**
 * @description TODO
 *
 * @param outputFolderBaseFile
 * @param outputFileName
 */
export function getDataLocal(
  outputFolderBaseFile: string,
  outputFileName: string
): Record<string, unknown> | string | FigmaData {
  if (!outputFolderBaseFile || !outputFileName) throw new Error(ErrorGetDataLocal);

  console.log(MsgSetDataFromLocal);

  try {
    return loadFile(path.join(`${outputFolderBaseFile}`, `${outputFileName}`));
  } catch (error) {
    throw new Error(error);
  }
}
