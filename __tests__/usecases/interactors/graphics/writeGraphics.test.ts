import trash from 'trash';

import { writeGraphics } from '../../bin/frameworks/filesystem/writeGraphics';

import { fileList } from '../../testdata/fileList';
import { baseConfig } from '../../bin/entities/Config/baseConfig';

// Set temp folder
const TEMP_FOLDER = `__graphics__`;
baseConfig.outputFolderGraphics = TEMP_FOLDER;

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(writeGraphics()).rejects.toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully write graphics if provided valid file list and config', async () => {
    await expect(writeGraphics(fileList, baseConfig)).resolves.toBe(true);
    await trash(TEMP_FOLDER);
  });
});
