import fs from 'fs';
import trash from 'trash';
import { baseConfig } from '../../../../bin/entities/Config/baseConfig';
import { loadFile } from '../../../../bin/frameworks/filesystem/loadFile';
import { refresh } from '../../../../bin/frameworks/filesystem/refresh';
import { optimizeSVGGraphics } from '../../../../bin/usecases/interactors/graphics/optimizeSVGGraphics';
import { fileListSVG } from '../../../../testdata/fileList';

// Set temp folder
const TEMP_FOLDER = __dirname + `/__graphics__`;
const TEST_DATA_SVG_FOLDER = __dirname + '/../../../../testdata/svg';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(optimizeSVGGraphics()).rejects.toThrow();
  });
  test('It should throw an error if graphics output format is not SVG', async () => {
    await expect(
      optimizeSVGGraphics(fileListSVG, {
        ...baseConfig,
        optimizeSVG: true,
        outputFolderGraphics: TEMP_FOLDER,
        outputFormatGraphics: 'png'
      })
    ).rejects.toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully optimize SVG graphics if provided valid file list and config', async () => {
    await optimizeSVGGraphics(fileListSVG, {
      ...baseConfig,
      optimizeSVG: true,
      outputFolderGraphics: TEMP_FOLDER,
      outputFormatGraphics: 'svg'
    });

    fileListSVG.forEach(({ file }) => {
      expect(loadFile(`${TEMP_FOLDER}/${file}`)).toMatchSnapshot();
    });
  });
});

beforeAll(async () => {
  refresh(TEMP_FOLDER);
  fileListSVG.forEach(({ file }) => {
    fs.copyFileSync(`${TEST_DATA_SVG_FOLDER}/${file}`, `${TEMP_FOLDER}/${file}`);
  });
});

afterAll(async () => {
  await trash(TEMP_FOLDER);
});
