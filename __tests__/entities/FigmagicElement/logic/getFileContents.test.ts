import { getFileContents } from '../../../../bin/entities/FigmagicElement/logic/getFileContents';

describe('Failure cases', () => {
  test('It should throw an error if calling without any arguments', () => {
    expect(() => {
      // @ts-ignore
      getFileContents();
    }).toThrow();
  });

  test('It should throw an error if attempting to get file contents for non-existing file', () => {
    const FILE_PATH = '__test-getFileContents__';
    const FILE_NAME = 'testfile001';
    const FORMAT = 'mjs';
    expect(() => getFileContents(FILE_PATH, FILE_NAME, FORMAT)).toThrow();
  });
});

describe('Success cases', () => {
  test('It should get file contents from MJS file, and return it as an object', () => {
    const FILE_PATH = 'testdata/tokens';
    const FILE_NAME = 'borderWidths';
    const FORMAT = 'mjs';
    expect(getFileContents(FILE_PATH, FILE_NAME, FORMAT)).toEqual(
      expect.objectContaining({ chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' })
    );
  });
});
