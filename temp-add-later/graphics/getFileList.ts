import { ImageResponse } from '../../contracts/ImageResponse';

import { camelize } from '../../../frameworks/string/camelize';
import { ErrorGetFileList } from '../../../frameworks/errors/errors';

/**
 * @description Get cleaned list of files
 *
 * @param imageResponse Figma API response
 * @param ids Array of asset IDs
 * @param outputFormatGraphics String representing expected output format
 */
export const getFileList = (
  imageResponse: ImageResponse,
  ids: any[],
  outputFormatGraphics: string
): any[] => {
  if (!imageResponse || !ids || !outputFormatGraphics) throw new Error(ErrorGetFileList);

  let fileList: any[] = [];

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
