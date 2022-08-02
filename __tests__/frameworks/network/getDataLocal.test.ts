import { getDataLocal } from '../../../bin/frameworks/network/getDataLocal';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    expect(() => getDataLocal()).toThrowError();
  });

  test('It should throw an error if file does not exist', () => {
    const OUTPUT_FOLDER_BASE_FILE = 'testdata';
    const OUTPUT_FILENAME = 'some-file-that-does-not-exist.mp4';
    expect(() => getDataLocal(OUTPUT_FOLDER_BASE_FILE, OUTPUT_FILENAME)).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should successfully load a local file if it exists', () => {
    const OUTPUT_FOLDER_BASE_FILE = 'testdata';
    const OUTPUT_FILENAME = 'figma-minimal.json';
    const DATA = {
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
    };
    // @ts-ignore);
    expect(getDataLocal(OUTPUT_FOLDER_BASE_FILE, OUTPUT_FILENAME)).toMatchObject(DATA);
  });
});
