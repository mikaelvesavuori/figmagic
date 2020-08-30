import { Config } from '../../entities/Config/Config';

import { downloadFile } from '../network/downloadFile';

import { ErrorWriteGraphics } from '../errors/errors';

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
  );

  return true;
}
