import { Config } from '../../../contracts/Config';

import { createFolder } from '../../../frameworks/filesystem/createFolder';
import { downloadFile } from '../../../frameworks/network/downloadFile';

import { ErrorWriteGraphics } from '../../../frameworks/errors/errors';

/**
 * @description Write image assets from Figma page to disk
 */
export async function writeGraphics(fileList: any[], config: Config): Promise<void> {
  if (!fileList || !config) throw Error(ErrorWriteGraphics);

  const { outputFolderGraphics } = config;
  createFolder(outputFolderGraphics);

  await Promise.all(
    fileList.map(async (file) => {
      return new Promise(async (resolve) => {
        await downloadFile(file.url, `${outputFolderGraphics}/${file.file}`);
        resolve(true);
      });
    })
  );
}
