import { FigmaData } from '../../domain/FigmaData/FigmaData';

import { getFromApi } from '../../functions/filesystem/getFromApi';

import { errorGetData } from '../../frameworks/errors/errors';

import { msgSetDataFromApi } from '../../frameworks/messages/messages';

/**
 * @description TODO
 *
 * @param token
 * @param url
 */
export async function getDataRemote(token: string, url: string): Promise<FigmaData> {
  console.log(msgSetDataFromApi);

  let data = null;

  try {
    data = await getFromApi(token, url);
    if (!data || data.status === 403) throw new Error(errorGetData);
  } catch (error) {
    throw new Error(error);
  }

  // TODO: Fix this
  return data;
}
