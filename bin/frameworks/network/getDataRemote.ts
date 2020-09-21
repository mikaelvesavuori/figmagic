//import { FigmaData } from '../../contracts/FigmaData';

import { getFromApi } from './getFromApi';

import { ErrorGetData, ErrorGetDataNoTokenOrUrl } from '../errors/errors';
import { MsgSetDataFromApi } from '../messages/messages';

/**
 * @description Helper to get Figma data from their API
 */
// TODO: Fix real return type?
export async function getDataRemote(token: string, url: string): Promise<any> {
  try {
    if (!token || !url) throw new Error(ErrorGetDataNoTokenOrUrl);
    console.log(MsgSetDataFromApi);

    let data = null;
    data = await getFromApi(token, url);

    if (!data || data.status === 403) throw new Error(ErrorGetData);
    return data;
  } catch (error) {
    throw new Error(ErrorGetDataNoTokenOrUrl);
  }
}
