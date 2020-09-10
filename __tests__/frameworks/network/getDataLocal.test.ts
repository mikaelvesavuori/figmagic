import { getDataLocal } from '../../bin/frameworks/network/getDataLocal';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(getDataLocal()).rejects.toThrow();
  });

  test('It should throw an error if file does not exist', async () => {
    const outputFolderBaseFile = 'testdata';
    const outputFileName = 'some-file-that-does-not-exist.mp4';
    await expect(getDataLocal(outputFolderBaseFile, outputFileName)).rejects.toThrow();
  });
});

describe('Success cases', () => {
  test('It should successfully load a local file if it exists', async () => {
    const outputFolderBaseFile = 'testdata';
    const outputFileName = 'figma-mini.json';
    await expect(getDataLocal(outputFolderBaseFile, outputFileName)).resolves.toMatchObject({
      document: {
        id: '0:0',
        name: 'Document',
        type: 'DOCUMENT',
        children: [
          {
            id: '2605:12',
            name: 'Design Tokens'
          }
        ]
      }
    });
  });
});
