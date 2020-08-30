import { FRAME as Frame } from '../contracts/Figma';
import { Config } from '../../entities/Config/Config';
import { FileList } from '../contracts/FileList';
import { ImageResponse } from '../contracts/ImageResponse';

import { getIds } from './graphics/getIds';
import { getIdString } from './graphics/getIdString';
import { getFileList } from './graphics/getFileList';

import { getFromApi } from '../../frameworks/network/getFromApi';

import {
  ErrorProcessGraphics,
  ErrorProcessGraphicsImageError,
  ErrorProcessGraphicsNoImages
} from '../../frameworks/errors/errors';

/**
 * @description Download all image assets from Figma page
 *
 * @param graphicsPage Children of the Figma 'Graphics' page
 * @param config Configuration object
 */
export async function processGraphics(graphicsPage: Frame[], config: Config): Promise<FileList[]> {
  if (!graphicsPage) throw new Error(ErrorProcessGraphics);
  const { token, url, outputFormatGraphics, outputScaleGraphics } = config;
  if (!token) throw new Error(ErrorProcessGraphics);
  if (graphicsPage.length === 0 || !graphicsPage[0].children) throw new Error(ErrorProcessGraphics);

  const ids = getIds(graphicsPage);
  const settings = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
  const _url = `${url}?ids=${getIdString(ids)}${settings}`;
  const imageResponse: ImageResponse = await getFromApi(token, _url, 'images');

  if (imageResponse.err) throw new Error(ErrorProcessGraphicsImageError);
  if (!imageResponse.images) throw new Error(ErrorProcessGraphicsNoImages);

  return getFileList(imageResponse, ids, outputFormatGraphics);
}
