import { FigmaData } from '../../entities/FigmaData/FigmaData';

import { getFromApi } from './getFromApi';

import { ErrorGetData } from '../errors/errors';

import { MsgSetDataFromApi } from '../messages/messages';

/**
 * @description TODO
 *
 * @param token
 * @param url
 */
export async function getDataRemote(token: string, url: string): Promise<FigmaData> {
  console.log(MsgSetDataFromApi);

  let data = null;

  try {
    data = await getFromApi(token, url);
    if (!data || data.status === 403) throw new Error(ErrorGetData);
  } catch (error) {
    throw new Error(error);
  }

  // TODO: Fix this
  return data;
}
