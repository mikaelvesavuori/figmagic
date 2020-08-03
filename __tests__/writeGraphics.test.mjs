import trash from 'trash';

import { writeGraphics } from '../bin/functions/filesystem/writeGraphics';

import { fileList } from '../testdata/fileList';
import { defaultConfig } from '../testdata/defaultConfig';

// Set temp folder
const TEMP_FOLDER = `__graphics__`;
defaultConfig.outputFolderGraphics = TEMP_FOLDER;

test('It should throw an error if no parameter is provided', async () => {
  await expect(writeGraphics()).rejects.toThrow();
});

test('It should successfully write graphics if provided valid file list and config', async () => {
  await expect(writeGraphics(fileList, defaultConfig)).resolves.toBe(true);
  await trash(TEMP_FOLDER);
});
