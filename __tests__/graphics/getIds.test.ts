import { getIds } from '../../bin/usecases/interactors/graphics/getIds';

import { graphicsPage } from '../../testdata/graphicsPage';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    expect(() => getIds()).toThrowError();
  });

  test('It should fail if receiving zero-length array', () => {
    expect(() => getIds([])).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should successfully create an array of objects with id and name', () => {
    // @ts-ignore
    expect(getIds(graphicsPage)).toMatchObject([
      { id: '2710:7', name: 'More' },
      { id: '2710:5', name: 'Close' },
      { id: '3009:118', name: 'Check' }
    ]);
  });
});
