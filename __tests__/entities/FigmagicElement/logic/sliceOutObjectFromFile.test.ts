import { sliceOutObjectFromFile } from '../../../../bin/entities/FigmagicElement/logic/sliceOutObjectFromFile';

describe('Failure cases', () => {
  test('It should throw an error if calling without any arguments', () => {
    expect(() => {
      // @ts-ignore
      sliceOutObjectFromFile();
    }).toThrowError();
  });

  test('It should throw an error if attempting to get file contents for non-existing file', () => {
    const FILE_PATH = '__test-getFileContents__/testfile001.mjs';
    expect(() => sliceOutObjectFromFile(FILE_PATH)).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should get file contents from MJS file, and return it as an object', () => {
    const FILE_PATH = 'testdata/tokens/borderWidths.mjs';
    expect(sliceOutObjectFromFile(FILE_PATH)).toEqual(
      expect.objectContaining({ chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' })
    );
  });
});
