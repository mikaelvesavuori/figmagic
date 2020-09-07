import { Config } from '../../../contracts/Config';

import { createFolder } from '../../../frameworks/filesystem/createFolder';
import { downloadFile } from '../../../frameworks/network/downloadFile';

import { ErrorWriteGraphics } from '../../../frameworks/errors/errors';

/**
 * @description Write image assets from Figma page to disk
 *
 * @param fileList List of objects with file information
 * @param config Configuration object
 */
export async function writeGraphics(fileList: any[], config: Config): Promise<void> {
  try {
    if (!fileList || !config) throw new Error(ErrorWriteGraphics);

    const { outputFolderGraphics } = config;

    createFolder(outputFolderGraphics);

    await Promise.all(
      fileList.map(async (file) => {
        const PATH = `${outputFolderGraphics}/${file.file}`;
        await downloadFile(file.url, PATH);
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}
