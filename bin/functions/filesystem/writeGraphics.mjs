import { downloadFile } from '../filesystem/downloadFile.mjs';

import { errorWriteGraphics } from '../../meta/errors.mjs';

/**
 * Write image assets from Figma page to disk
 *
 * @exports
 * @async
 * @function
 * @param {array} fileList - List of objects with file information
 * @param {object} config - Configuration object
 * @returns {promise} - Return promise
 * @throws {errorWriteGraphics} - Throws error if missing fileList or config
 */
export async function writeGraphics(fileList, config) {
  if (!fileList || !config) throw new Error(errorWriteGraphics);

  const { outputFolderGraphics } = config;

  await Promise.all(
    fileList.map(async file => {
      await downloadFile(file.url, outputFolderGraphics, file.file);
    })
  );
}
