import { Config } from '../../entities/Config/Config';

import { ImageResponse } from '../contracts/ImageResponse';

import { camelize } from '../../frameworks/string/camelize';
import { getFromApi } from '../../frameworks/network/getFromApi';

import {
  ErrorProcessGraphics,
  ErrorProcessGraphicsImageError,
  ErrorProcessGraphicsNoImages,
  ErrorGetIds,
  ErrorGetFileList,
  ErrorGetIdstring
} from '../../frameworks/errors/errors';
// TODO: Refactor

/**
 * @description Download all image assets from Figma page
 *
 * @param graphicsPage Children of the Figma 'Graphics' page
 * @param config Configuration object
 */
// TODO: Add real types
export async function processGraphics(graphicsPage: object, config: Config): Promise<Graphics[]> {
  if (!graphicsPage) throw new Error(ErrorProcessGraphics);

  const { token, url, outputFormatGraphics, outputScaleGraphics } = config;

  const IDS = getIds(graphicsPage);
  const ID_STRING = getIdString(IDS);
  const SETTINGS = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
  const URL = `${url}?ids=${ID_STRING}${SETTINGS}`;

  const IMAGE_RESPONSE: ImageResponse = await getFromApi(token, URL, 'images');

  if (IMAGE_RESPONSE.err) throw new Error(ErrorProcessGraphicsImageError);
  if (!IMAGE_RESPONSE.images) throw new Error(ErrorProcessGraphicsNoImages);

  return getFileList(IMAGE_RESPONSE, IDS, outputFormatGraphics);
}

/**
 * @description Get cleaned list of files
 *
 * @param imageResponse Figma API response
 * @param ids Array of asset IDs
 * @param outputFormatGraphics String representing expected output format
 */
export const getFileList = (
  imageResponse: object,
  ids: any[],
  outputFormatGraphics: string
): any[] => {
  if (!imageResponse || !ids || !outputFormatGraphics) throw new Error(ErrorGetFileList);

  let fileList = [];

  Object.entries(imageResponse.images).forEach(async (image) => {
    let name = '__unnamed__';

    ids.forEach((z) => {
      if (z.id === image[0]) {
        name = z.name;
      }
    });

    name = camelize(name);

    const URL = image[1];
    const FILE = `${name}.${outputFormatGraphics}`;

    fileList.push({ url: URL, file: FILE });
  });

  return fileList;
};

/**
 * @description Get IDs from graphics page
 *
 * @param graphicsPage Figma 'Graphics' page
 */
export const getIds = (graphicsPage: GraphicsPage): any[] => {
  if (!graphicsPage) throw new Error(ErrorGetIds);
  if (!(graphicsPage.length > 0)) throw new Error(ErrorGetIds);

  let items = [];

  // Filter out anything that is not a component
  graphicsPage
    .filter((item) => item.type === 'COMPONENT')
    .forEach((item) => {
      items.push({ id: item.id, name: item.name });
    });

  return items;
};

/**
 * @description Collate valid string of IDs
 *
 * @param ids Figma 'Graphics' page
 */
export const getIdString = (ids: any[]): string => {
  if (!ids) throw new Error(ErrorGetIdstring);

  let idString = '';

  ids.forEach((item) => {
    idString += `${item.id},`;
  });

  // Remove last comma
  idString = idString.slice(0, idString.length - 1);

  return idString;
};
