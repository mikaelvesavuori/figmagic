import * as path from 'path';

import { FigmaData } from '../../entities/FigmaData/FigmaData';

import { loadFile } from '../../frameworks/filesystem/loadFile';

import { msgSetDataFromLocal } from '../../frameworks/messages/messages';

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
  console.log(msgSetDataFromLocal);

  try {
    return await loadFile(path.join(`${outputFolderBaseFile}`, `${outputFileName}`));
  } catch (error) {
    throw new Error(error);
  }
}
