import { FRAME as Frame } from '../../../contracts/Figma';
import { Config } from '../../../contracts/Config';
import { FileList } from '../../../contracts/FileList';
import { ImageResponse } from '../../../contracts/ImageResponse';

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
 *
 * @param graphicsPage Children of the Figma 'Graphics' page
 * @param config Configuration object
 */
export async function processGraphics(graphicsPage: Frame[], config: Config): Promise<FileList[]> {
  if (!graphicsPage) throw new Error(ErrorProcessGraphics);
  const { token, url, outputFormatGraphics, outputScaleGraphics } = config;
  if (!token) throw new Error(ErrorProcessGraphics);
  if (graphicsPage.length === 0 || !graphicsPage[0].children) throw new Error(ErrorProcessGraphics);

  const IDS = getIds(graphicsPage);
  const SETTINGS = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
  const URL = `${url}?ids=${getIdString(IDS)}${SETTINGS}`;

  const imageResponse: ImageResponse = await getFromApi(token, URL, 'images');

  if (imageResponse.err) throw new Error(ErrorProcessGraphicsImageError);
  if (!imageResponse.images) throw new Error(ErrorProcessGraphicsNoImages);

  return getFileList(imageResponse, IDS, outputFormatGraphics);
}
