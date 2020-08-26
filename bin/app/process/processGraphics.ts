import { Config } from '../../entities/Config/Config';

import { Frame } from '../contracts/Frame';
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
// TODO: Refactor

/**
 * @description Download all image assets from Figma page
 *
 * @param graphicsPage Children of the Figma 'Graphics' page
 * @param config Configuration object
 */
// TODO: Add real types
export async function processGraphics(graphicsPage: Frame, config: Config): Promise<any[]> {
  if (!graphicsPage) throw new Error(ErrorProcessGraphics);

  const { token, url, outputFormatGraphics, outputScaleGraphics } = config;
  if (!token) throw new Error(ErrorProcessGraphics);

  const IDS = getIds([graphicsPage]);
  const ID_STRING = getIdString(IDS);
  const SETTINGS = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
  const URL = `${url}?ids=${ID_STRING}${SETTINGS}`;

  const IMAGE_RESPONSE: ImageResponse = await getFromApi(token, URL, 'images');

  if (IMAGE_RESPONSE.err) throw new Error(ErrorProcessGraphicsImageError);
  if (!IMAGE_RESPONSE.images) throw new Error(ErrorProcessGraphicsNoImages);

  return getFileList(IMAGE_RESPONSE, IDS, outputFormatGraphics);
}
