import { Config } from '../../../contracts/Config';

import { createFolder } from '../../../frameworks/filesystem/createFolder';
import { downloadFile } from '../../../frameworks/network/downloadFile';

import { ErrorWriteGraphics } from '../../../frameworks/errors/errors';

/**
 * @description Write image assets from Figma page to disk
 */
export async function writeGraphics(fileList: any[], config: Config): Promise<void> {
  try {
    if (!fileList || !config) throw new Error(ErrorWriteGraphics);

    const { outputFolderGraphics } = config;
    createFolder(outputFolderGraphics);

    await Promise.all(
      fileList.map(
        async (file) => await downloadFile(file.url, `${outputFolderGraphics}/${file.file}`)
      )
    );
  } catch (error) {
    throw new Error(error);
  }
}
