import { camelize } from '../helpers/camelize.mjs';
import { getFromApi } from '../filesystem/getFromApi.mjs';
import { downloadFile } from '../filesystem/downloadFile.mjs';

import {
  errorProcessGraphics,
  errorProcessGraphicsImageError,
  errorProcessGraphicsNoImages,
  errorGetIds
} from '../../meta/errors.mjs';

/**
 * Download all image assets from Figma page
 *
 * @exports
 * @async
 * @function
 * @param {object} graphicsPage - Children of the Figma 'Graphics' page
 * @param {object} config - Configuration object
 * @returns {promise} - Return promise
 */
export async function processGraphics(graphicsPage, config) {
  if (!graphicsPage) throw new Error(errorProcessGraphics);
  const { token, url, outputFolderGraphics, outputFormatGraphics, outputScaleGraphics } = config;

  const IDS = getIds(graphicsPage);
  const ID_STRING = getIdString(IDS);
  const SETTINGS = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
  const URL = `${url}?ids=${ID_STRING}${SETTINGS}`;

  const IMAGE_RESPONSE = await getFromApi(token, URL, 'images');

  if (IMAGE_RESPONSE.err) throw new Error(errorProcessGraphicsImageError);
  if (!IMAGE_RESPONSE.images) throw new Error(errorProcessGraphicsNoImages);

  const FILE_LIST = getFileList(IMAGE_RESPONSE, IDS, outputFormatGraphics);

  await Promise.all(
    FILE_LIST.map(async file => {
      await downloadFile(file.url, outputFolderGraphics, file.file);
    })
  );
}

/**
 * Get cleaned list of files
 *
 * @function
 * @param {object} imageResponse - Figma API response
 * @param {array} ids - Array of asset IDs
 * @param {string} outputFormatGraphics - String representing expected output format
 * @returns {array} - Array of files with properties
 */
const getFileList = (imageResponse, ids, outputFormatGraphics) => {
  let fileList = [];

  Object.entries(imageResponse.images).forEach(async image => {
    let name = '__unnamed__';

    ids.filter(z => {
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
 * @function
 * @param {object} graphicsPage - Figma 'Graphics' page
 * @returns {array} - Array of graphics items
 */
const getIds = graphicsPage => {
  if (!graphicsPage) throw new Error(errorGetIds);
  if (!(graphicsPage.length > 0)) throw new Error(errorGetIds);

  let items = [];

  // Filter out anything that is not a component
  graphicsPage
    .filter(item => item.type === 'COMPONENT')
    .forEach(item => {
      items.push({ id: item.id, name: item.name });
    });

  return items;
};

/**
 * Collate valid string of IDs
 *
 * @function
 * @param {array} ids - Figma 'Graphics' page
 * @returns {string} - Return ID string
 */
const getIdString = ids => {
  let idString = '';

  ids.forEach(item => {
    idString += `${item.id},`;
  });

  // Remove last comma
  idString = idString.slice(0, idString.length - 1);

  return idString;
};
