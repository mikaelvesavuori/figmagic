import { FileList } from '../../../contracts/FileList';
import { ImageResponse } from '../../../contracts/ImageResponse';

import { ErrorGetFileList } from '../../../frameworks/errors/errors';

/**
 * @description Get cleaned list of files
 */
export const getFileList = (
  imageResponse: ImageResponse,
  ids: Record<string, any>[],
  outputFormatGraphics: string
): FileList[] => {
  if (!imageResponse || !ids || !outputFormatGraphics) throw Error(ErrorGetFileList);

  return Object.entries(imageResponse.images).map((image) => {
    const MATCH = ids.filter((id) => id.id === image[0]);
    const FILE_PATH = MATCH[0].name.trim().replace(/ /g, '') + `.${outputFormatGraphics}`;
    return {
      url: image[1],
      file: FILE_PATH
    } as FileList;
  });
};
