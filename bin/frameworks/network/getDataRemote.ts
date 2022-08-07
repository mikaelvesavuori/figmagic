import { getFromApi } from './getFromApi';

import { ErrorGetData, ErrorGetDataNoTokenOrUrl } from '../errors/errors';
import { MsgSetDataFromApi } from '../messages/messages';

/**
 * @description Helper to get Figma data from their API
 */
export async function getDataRemote(
  token: string,
  url: string,
  versionName?: string | null
): Promise<any> {
  if (!token || !url) throw Error(ErrorGetDataNoTokenOrUrl);
  console.log(MsgSetDataFromApi);

  let data = null;
  data = await getFromApi(token, url, versionName);

  if (!data || data.status === 403) throw Error(ErrorGetData);
  return data;
}
