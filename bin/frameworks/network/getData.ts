import { FigmaData } from '../../contracts/FigmaData';

import { getDataLocal } from './getDataLocal';
import { getDataRemote } from './getDataRemote';

export async function getData(
  recompileLocal: boolean,
  outputFolderBaseFile: string,
  outputFileName: string,
  token: string | null,
  url: string | null
): Promise<FigmaData> {
  if (!recompileLocal && (!token || !url)) throw new Error('asdf');
  if (recompileLocal && (!outputFolderBaseFile || !outputFileName)) throw new Error('mfmfmfm');

  return recompileLocal
    ? await getDataLocal(outputFolderBaseFile, outputFileName)
    : await getDataRemote(token, url);
}
