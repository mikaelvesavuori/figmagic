import { getData } from '../../../bin/frameworks/network/getData';
import { loadEnv } from '../../../bin/frameworks/system/loadEnv';

loadEnv();

const FIGMA_TOKEN = process.env.IS_MOCK_ENABLED
  ? 'mocked'
  : process.env.FIGMA_TOKEN;
const FIGMA_URL = process.env.IS_MOCK_ENABLED
  ? 'mocked'
  : process.env.FIGMA_URL;

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(getData()).rejects.toThrow();
  });

  test('It should fail if attempting to get remote data, but missing token', async () => {
    await expect(
      // @ts-ignore
      getData(false, null, null, null, 'url'),
    ).rejects.toThrowError();
  });

  test('It should fail if attempting to get remote data, but missing URL', async () => {
    await expect(
      // @ts-ignore
      getData(false, null, null, 'token', null),
    ).rejects.toThrowError();
  });

  test('It should fail if attempting to recompile locally, but missing figmagicFolder', async () => {
    await expect(
      // @ts-ignore
      getData(true, null, 'figmaData', null, null),
    ).rejects.toThrowError();
  });

  test('It should fail if attempting to recompile locally, but missing figmaData', async () => {
    await expect(
      // @ts-ignore
      getData(true, 'figmagicFolder', null, null, null),
    ).rejects.toThrowError();
  });
});

describe('Success cases', () => {
  test('It should get local data', async () => {
    await expect(
      getData(true, 'testdata', 'exampleData.json', '', ''),
    ).resolves.toMatchObject({
      something: 'value',
    });
  });

  // TODO: Add mocking?
  test('It should get remote data (check for "components" property)', async () => {
    const DATA = await getData(
      false,
      '.',
      'exampleFigmaData.json',
      // @ts-ignore
      FIGMA_TOKEN,
      FIGMA_URL,
    );

    expect(DATA).toHaveProperty('components');
  });
});
