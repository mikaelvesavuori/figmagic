import { getDataRemote } from '../../bin/frameworks/network/getDataRemote';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(getDataRemote()).rejects.toThrow();
  });

  test('It should fail given invalid URL and token', async () => {
    await expect(getDataRemote('token', 'url')).rejects.toThrow();
  });
});

describe('Success cases', () => {
  /*
  // TODO: Fix this, mock?
  test('It should get API data given valid URL and token', async () => {
    // @ts-ignore
    await expect(getDataRemote('token', 'url')).resolves.toBeTruthy();
  });
  */
});
