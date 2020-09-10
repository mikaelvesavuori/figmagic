import { FigmaData } from '../../contracts/FigmaData';

import { getDataLocal } from './getDataLocal';
import { getDataRemote } from './getDataRemote';

import {
  ErrorGetData,
  ErrorGetDataNoTokenOrUrl,
  ErrorGetDataFailedLocalAndRemote
} from '../errors/errors';

export async function getData(
  recompileLocal: boolean,
  outputFolderBaseFile: string,
  outputFileName: string,
  token: string | null,
  url: string | null
): Promise<FigmaData> {
  if (!recompileLocal && (!token || !url)) throw new Error(ErrorGetData);
  if (recompileLocal && (!outputFolderBaseFile || !outputFileName))
    throw new Error(ErrorGetDataNoTokenOrUrl);

  const data = (async () => {
    if (recompileLocal) return getDataLocal(outputFolderBaseFile, outputFileName);
    else {
      if (token && url) return await getDataRemote(token, url);
    }
    throw new Error(ErrorGetDataFailedLocalAndRemote);
  })();

  return data;
}
