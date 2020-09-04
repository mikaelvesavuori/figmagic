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
export async function getDataLocal(
  outputFolderBaseFile: string,
  outputFileName: string
): Promise<FigmaData> {
  if (!outputFolderBaseFile || !outputFileName) throw new Error(ErrorGetDataLocal);

  console.log(MsgSetDataFromLocal);

  try {
    return await loadFile(path.join(`${outputFolderBaseFile}`, `${outputFileName}`));
  } catch (error) {
    throw new Error(error);
  }
}
