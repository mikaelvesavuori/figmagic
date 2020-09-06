import { Config } from '../../../contracts/Config';

import { downloadFile } from '../../../frameworks/network/downloadFile';

import { ErrorWriteGraphics } from '../../../frameworks/errors/errors';

/**
 * @description Write image assets from Figma page to disk
 *
 * @param fileList List of objects with file information
 * @param config Configuration object
 */
export async function writeGraphics(fileList: any[], config: Config): Promise<boolean> {
  if (!fileList || !config) throw new Error(ErrorWriteGraphics);

  const { outputFolderGraphics } = config;

  await Promise.all(
    fileList.map(async (file) => {
      await downloadFile(file.url, outputFolderGraphics, file.file);
    })
  ).catch((error) => {
    throw new Error(error);
  });

  return true;
}
