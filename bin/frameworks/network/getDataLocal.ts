import * as path from 'path';

import { FigmaData } from '../../contracts/FigmaData';

import { loadFile } from '../filesystem/loadFile';

import { MsgSetDataFromLocal } from '../messages/messages';
import { ErrorGetDataLocal } from '../errors/errors';

/**
 * @description Helper to get Figma data from local source
 *
 * @param outputFolderBaseFile Output folder for base file
 * @param outputFileName File name for output file
 */
export function getDataLocal(
  outputFolderBaseFile: string,
  outputFileName: string
): Record<string, unknown> | string | FigmaData {
  try {
    if (!outputFolderBaseFile || !outputFileName) throw new Error(ErrorGetDataLocal);
    console.log(MsgSetDataFromLocal);
    return loadFile(path.join(`${outputFolderBaseFile}`, `${outputFileName}`));
  } catch (error) {
    throw new Error(ErrorGetDataLocal);
  }
}
