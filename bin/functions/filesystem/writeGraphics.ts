import { downloadFile } from '../filesystem/downloadFile';

import { errorWriteGraphics } from '../../meta/errors';

import { Config } from '../../app/contracts/config/Config';

/**
 * Write image assets from Figma page to disk
 *
 * @exports
 * @async
 * @function
 * @param {array} fileList - List of objects with file information
 * @param {object} config - Configuration object
 * @returns {boolean} - Return true if finished
 * @throws {errorWriteGraphics} - Throws error if missing fileList or config
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
