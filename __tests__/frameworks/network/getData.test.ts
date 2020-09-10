import { getData } from '../../bin/frameworks/network/getData';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(getData()).rejects.toThrow();
  });

  test('It should fail if attempting to get remote data, but missing token', async () => {
    await expect(getData(false, null, null, null, 'url')).rejects.toThrowError('asdf');
  });

  test('It should fail if attempting to get remote data, but missing URL', async () => {
    await expect(getData(false, null, null, 'token', null)).rejects.toThrowError('asdf');
  });

  test('It should fail if attempting to recompile locally, but missing outputFolderBaseFile', async () => {
    await expect(getData(true, null, 'outputFileName', null, null)).rejects.toThrowError('mfmfmfm');
  });

  test('It should fail if attempting to recompile locally, but missing outputFileName', async () => {
    await expect(getData(true, 'outputFolderBaseFile', null, null, null)).rejects.toThrowError(
      'mfmfmfm'
    );
  });
});

describe('Success cases', () => {
  test('It should get local data', async () => {
    await expect(
      getData(true, 'testdata', 'exampleData.json', 'token', 'url')
    ).resolves.toMatchObject({
      something: 'value'
    });
  });

  /*
  // TODO: Add mocking?
  test('It should get remote data', async () => {
    await expect(
      getData(true, 'testdata', 'exampleData.json', 'token', 'url')
    ).resolves.toMatchObject({
      something: 'value'
    });
  });
  */
});
