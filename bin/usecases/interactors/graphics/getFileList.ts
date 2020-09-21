import { FileList } from '../../../contracts/FileList';
import { ImageResponse } from '../../../contracts/ImageResponse';

import { camelize } from '../../../frameworks/string/camelize';
import { ErrorGetFileList } from '../../../frameworks/errors/errors';

/**
 * @description Get cleaned list of files
 */
export const getFileList = (
  imageResponse: ImageResponse,
  ids: any[],
  outputFormatGraphics: string
): FileList[] => {
  if (!imageResponse || !ids || !outputFormatGraphics) throw new Error(ErrorGetFileList);

  return Object.entries(imageResponse.images).map((image) => {
    const MATCH = ids.filter((id) => id.id === image[0]);
    return {
      url: image[1],
      file: `${camelize(MATCH[0].name)}.${outputFormatGraphics}`
    } as FileList;
  });
};
