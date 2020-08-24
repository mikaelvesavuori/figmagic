import * as path from 'path';

import { FigmaData } from '../../entities/FigmaData/FigmaData';

import { loadFile } from '../filesystem/loadFile';

import { MsgSetDataFromLocal } from '../messages/messages';

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
  console.log(MsgSetDataFromLocal);

  try {
    return await loadFile(path.join(`${outputFolderBaseFile}`, `${outputFileName}`));
  } catch (error) {
    throw new Error(error);
  }
}
