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
  figmagicFolder: string,
  figmaData: string,
  token: string | null,
  url: string | null,
  versionName?: string | null
): Promise<FigmaData> {
  try {
    if (!recompileLocal && (!token || !url)) throw Error(ErrorGetData);
    if (recompileLocal && (!figmagicFolder || !figmaData)) throw Error(ErrorGetDataNoTokenOrUrl);

    const _DATA = (async () => {
      if (recompileLocal) return getDataLocal(figmagicFolder, figmaData);
      else if (token && url) return await getDataRemote(token, url, versionName);
      throw Error(ErrorGetDataFailedLocalAndRemote);
    })();

    const DATA = await _DATA;

    if (!recompileLocal && !DATA.document) throw Error(ErrorGetDataNoData);
    if (recompileLocal && !DATA) throw Error(ErrorGetDataNoData);

    return DATA;
  } catch (error: any) {
    throw Error(error);
  }
}
