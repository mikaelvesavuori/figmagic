import { Config } from '../../../contracts/Config';
import { FileList } from '../../../contracts/Files';

import { createFolder } from '../../../frameworks/filesystem/createFolder';
import { downloadFile } from '../../../frameworks/network/downloadFile';

import { ErrorWriteGraphics } from '../../../frameworks/errors/errors';

/**
 * @description Write image assets from Figma page to disk
 */
export async function writeGraphics(fileList: FileList[], config: Config): Promise<void> {
  if (!fileList || !config) throw Error(ErrorWriteGraphics);

  const { outputFolderGraphics } = config;
  createFolder(outputFolderGraphics);

  await Promise.all(
    fileList.map(async (file: FileList) => {
      return new Promise(async (resolve) => {
        await downloadFile(file.url, `${outputFolderGraphics}/${file.file}`);
        resolve(true);
      });
    })
  );
}
