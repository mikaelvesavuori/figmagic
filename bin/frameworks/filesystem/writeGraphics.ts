import { downloadFile } from './downloadFile';

import { errorWriteGraphics } from '../errors/errors';

import { Config } from '../../app/contracts/config/Config';

/**
 * @description Write image assets from Figma page to disk
 *
 * @param fileList List of objects with file information
 * @param config Configuration object
 */
export async function writeGraphics(fileList: any[], config: Config): Promise<boolean> {
  if (!fileList || !config) throw new Error(errorWriteGraphics);

  console.log('fileList', fileList);

  const { outputFolderGraphics } = config;

  await Promise.all(
    fileList.map(async (file) => {
      await downloadFile(file.url, outputFolderGraphics, file.file);
    })
  );

  return true;
}
