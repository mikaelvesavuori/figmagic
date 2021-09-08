import trash from 'trash';
import fs from 'fs';

import { baseConfig } from '../../../../bin/entities/Config/baseConfig';

import { writeGraphics } from '../../../../bin/usecases/interactors/graphics/writeGraphics';

import { fileList } from '../../../../testdata/fileList';

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
  test('It should successfully write graphics (PNG) if provided valid file list and config', async () => {
    baseConfig.outputFormatGraphics = 'png';

    await writeGraphics(fileList, baseConfig);
    const PATH = `${TEMP_FOLDER}/${fileList[0].file}`;
    const FILE_EXISTS = fs.existsSync(PATH);
    expect(FILE_EXISTS).toBeTruthy();
  });
});

describe('Success cases', () => {
  test('It should successfully write graphics (SVG) if provided valid file list and config', async () => {
    baseConfig.outputFormatGraphics = 'svg';

    await writeGraphics(fileList, baseConfig);
    const PATH = `${TEMP_FOLDER}/${fileList[1].file}`;
    const FILE_EXISTS = fs.existsSync(PATH);
    expect(FILE_EXISTS).toBeTruthy();
  });
});

afterAll(async () => {
  await trash(TEMP_FOLDER);
});
