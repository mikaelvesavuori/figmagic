import { FileList, Id } from '../../../contracts/Files';
import { ApiResponse } from '../../../contracts/ApiResponse';

import { ErrorGetFileList } from '../../../frameworks/errors/errors';

/**
 * @description Get cleaned list of files
 */
export const getFileList = (
  response: ApiResponse,
  ids: Id[],
  outputFormatGraphics: string
): FileList[] => {
  if (!response || !ids || !outputFormatGraphics) throw Error(ErrorGetFileList);

  return Object.entries(response.images).map((image) => {
    const match = ids.filter((id) => id.id === image[0]);
    const filePath = match[0].name.trim().replace(/ /g, '') + `.${outputFormatGraphics}`;
    return {
      url: image[1],
      file: filePath
    };
  });
};
