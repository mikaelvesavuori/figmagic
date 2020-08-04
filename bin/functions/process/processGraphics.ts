import { camelize } from '../helpers/camelize';
import { getFromApi } from '../filesystem/getFromApi';

import {
  errorProcessGraphics,
  errorProcessGraphicsImageError,
  errorProcessGraphicsNoImages,
  errorGetIds,
  errorGetFileList,
  errorGetIdString
} from '../../meta/errors';

import { Config } from '../../app/contracts/config/Config';

// TODO: Refactor

/**
 * Download all image assets from Figma page
 *
 * @exports
 * @async
 * @function
 * @param {object} graphicsPage - Children of the Figma 'Graphics' page
 * @param {object} config - Configuration object
 * @returns {array} - Returns file list
 * @throws {errorProcessGraphics} - Throws error if missing missingPage
 */
export async function processGraphics(graphicsPage: object, config: Config): Promise<any[]> {
  if (!graphicsPage) throw new Error(errorProcessGraphics);

  const { token, url, outputFormatGraphics, outputScaleGraphics } = config;

  const IDS = getIds(graphicsPage);
  const ID_STRING = getIdString(IDS);
  const SETTINGS = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
  const URL = `${url}?ids=${ID_STRING}${SETTINGS}`;

  const IMAGE_RESPONSE = await getFromApi(token, URL, 'images');

  if (IMAGE_RESPONSE.err) throw new Error(errorProcessGraphicsImageError);
  if (!IMAGE_RESPONSE.images) throw new Error(errorProcessGraphicsNoImages);

  return getFileList(IMAGE_RESPONSE, IDS, outputFormatGraphics);
}

/**
 * Get cleaned list of files
 *
 * @export
 * @function
 * @param {object} imageResponse - Figma API response
 * @param {array} ids - Array of asset IDs
 * @param {string} outputFormatGraphics - String representing expected output format
 * @returns {array} - Array of files with properties
 * @throws {errorGetFileList} - Throws error if missing required arguments
 */
export const getFileList = (imageResponse, ids, outputFormatGraphics) => {
  if (!imageResponse || !ids || !outputFormatGraphics) throw new Error(errorGetFileList);

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
 * Get IDs from graphics page
 *
 * @export
 * @function
 * @param {object} graphicsPage - Figma 'Graphics' page
 * @returns {array} - Array of graphics items
 * @throws {errorGetIds} - Throws error if no graphics page is provided
 * @throws {errorGetIds} - Throws error if no graphics page is zero-length
 */
export const getIds = (graphicsPage) => {
  if (!graphicsPage) throw new Error(errorGetIds);
  if (!(graphicsPage.length > 0)) throw new Error(errorGetIds);

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
 * Collate valid string of IDs
 *
 * @export
 * @function
 * @param {array} ids - Figma 'Graphics' page
 * @returns {string} - Return ID string
 * @throws {errorGetIdString} - Throws error when no required arguments are provided
 */
export const getIdString = (ids) => {
  if (!ids) throw new Error(errorGetIdString);

  let idString = '';

  ids.forEach((item) => {
    idString += `${item.id},`;
  });

  // Remove last comma
  idString = idString.slice(0, idString.length - 1);

  return idString;
};
