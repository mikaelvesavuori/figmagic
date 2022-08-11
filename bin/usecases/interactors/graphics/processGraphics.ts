import { FRAME as Frame } from '../../../contracts/Figma';
import { Config } from '../../../contracts/Config';
import { FileList } from '../../../contracts/Files';
import { ApiResponse } from '../../../contracts/ApiResponse';

import { getIds } from './getIds';
import { getIdString } from './getIdString';
import { getFileList } from './getFileList';

import { getFromApi } from '../../../frameworks/network/getFromApi';

import {
  ErrorProcessGraphics,
  ErrorProcessGraphicsImageError,
  ErrorProcessGraphicsNoImages
} from '../../../frameworks/errors/errors';

/**
 * @description Download all image assets from Figma page
 */
export async function processGraphics(graphicsPage: Frame[], config: Config): Promise<FileList[]> {
  if (!graphicsPage) throw Error(ErrorProcessGraphics);

  const { token, url, outputFormatGraphics, outputScaleGraphics, versionName } = config;
  if (!token) throw Error(ErrorProcessGraphics);
  if (graphicsPage.length === 0 || !graphicsPage[0].children) throw Error(ErrorProcessGraphics);

  const ids = getIds(graphicsPage);
  const settings = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
  const fullUrl = `${url}?ids=${getIdString(ids)}${settings}`;

  const imageResponse: ApiResponse = await getFromApi(token, fullUrl, versionName, 'images');
  if (imageResponse.err) throw Error(ErrorProcessGraphicsImageError);
  if (!imageResponse.images) throw Error(ErrorProcessGraphicsNoImages);

  return getFileList(imageResponse, ids, outputFormatGraphics);
}
