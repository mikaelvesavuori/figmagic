import { FigmaData } from '../../contracts/FigmaData';

import { getDataLocal } from './getDataLocal';
import { getDataRemote } from './getDataRemote';

import {
  ErrorGetData,
  ErrorGetDataNoData,
  ErrorGetDataNoTokenOrUrl,
  ErrorGetDataFailedLocalAndRemote
} from '../errors/errors';

/**
 * @description Helper/orchestrator to get data locally or from Figma (remote)
 */
export async function getData(
  recompileLocal: boolean,
  outputFolderBaseFile: string,
  outputFileName: string,
  token: string | null,
  url: string | null
): Promise<FigmaData> {
  try {
    if (!recompileLocal && (!token || !url)) throw new Error(ErrorGetData);
    if (recompileLocal && (!outputFolderBaseFile || !outputFileName))
      throw new Error(ErrorGetDataNoTokenOrUrl);

    const DATA = (async () => {
      if (recompileLocal) return getDataLocal(outputFolderBaseFile, outputFileName);
      else {
        if (token && url) return await getDataRemote(token, url);
      }
      throw new Error(ErrorGetDataFailedLocalAndRemote);
    })();

    if (!DATA) throw new Error(ErrorGetDataNoData);
    return DATA;
  } catch (error) {
    throw new Error(ErrorGetData);
  }
}
