import { FigmaResponse } from '../../contracts/FigmaData';

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
): Promise<FigmaResponse> {
  if (!recompileLocal && (!token || !url)) throw Error(ErrorGetData);
  if (recompileLocal && (!figmagicFolder || !figmaData)) throw Error(ErrorGetDataNoTokenOrUrl);

  const _data = (async () => {
    if (recompileLocal) return getDataLocal(figmagicFolder, figmaData);
    else if (token && url) return getDataRemote(token, url, versionName);
    throw Error(ErrorGetDataFailedLocalAndRemote);
  })();

  const data = await _data;

  // @ts-ignore
  if (!recompileLocal && !data.document) throw Error(ErrorGetDataNoData);
  if (recompileLocal && !data) throw Error(ErrorGetDataNoData);

  return data;
}
