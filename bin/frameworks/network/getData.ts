import { FigmaData } from '../../entities/FigmaData/FigmaData';

import { getDataLocal } from './getDataLocal';
import { getDataRemote } from './getDataRemote';

export async function getData(
  recompileLocal: boolean,
  outputFolderBaseFile: string,
  outputFileName: string,
  token: string | null,
  url: string | null
): Promise<FigmaData> {
  return recompileLocal
    ? await getDataLocal(outputFolderBaseFile, outputFileName)
    : await getDataRemote(token, url);
}
