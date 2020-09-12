//import { FigmaData } from '../../contracts/FigmaData';

import { getFromApi } from './getFromApi';

import { ErrorGetData, ErrorGetDataNoTokenOrUrl } from '../errors/errors';
import { MsgSetDataFromApi } from '../messages/messages';

/**
 * @description TODO
 *
 * @param token TODO
 * @param url TODO
 */
// TODO: Return FigmaData?
export async function getDataRemote(token: string, url: string): Promise<any> {
  if (!token || !url) throw new Error(ErrorGetDataNoTokenOrUrl);
  console.log(MsgSetDataFromApi);

  let data = null;

  try {
    data = await getFromApi(token, url);
    if (!data || data.status === 403) throw new Error(ErrorGetData);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
