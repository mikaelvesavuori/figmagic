import { FigmaData } from '../../app/contracts/FigmaData';

import { getFromApi } from './getFromApi';

import { ErrorGetData, ErrorGetDataNoTokenOrUrl } from '../errors/errors';
import { MsgSetDataFromApi } from '../messages/messages';

/**
 * @description TODO
 *
 * @param token TODO
 * @param url TODO
 */
export async function getDataRemote(token: string | null, url: string | null): Promise<FigmaData> {
  if (!token || !url) throw new Error(ErrorGetDataNoTokenOrUrl);
  console.log(MsgSetDataFromApi);

  let data = null;

  try {
    data = await getFromApi(token, url);
    if (!data || data.status === 403) throw new Error(ErrorGetData);
    // TODO: Fix this
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
