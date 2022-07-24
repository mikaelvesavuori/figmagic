import { getIds } from '../../../../bin/usecases/interactors/graphics/getIds';

import { graphicsPage } from '../../../../testdata/graphicsPage';

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
  test('It should successfully create an array of objects with `id` and `name` properties from both unframed and framed components', () => {
    // @ts-ignore
    expect(getIds(graphicsPage)).toMatchObject([
      { id: '2710:7', name: 'More' },
      { id: '2710:5', name: 'Close' },
      { id: '3009:118', name: 'Check' },
      { id: '4724:35631', name: 'Social Icons/socialIconFacebook' },
      { id: '4724:35743', name: 'Social Icons/socialIconTwitter' },
      { id: '4724:35749', name: 'Social Icons/socialIconYouTube' }
    ]);
  });

  test('It should return an empty array if (nested) children are empty', () => {
    const graphicsPageWithoutChildren = JSON.parse(JSON.stringify(graphicsPage));
    graphicsPageWithoutChildren.forEach((page: any) => (page.children = undefined));

    // @ts-ignore
    expect(getIds(graphicsPageWithoutChildren)).toMatchObject([
      {
        id: '2710:7',
        name: 'More'
      },
      {
        id: '2710:5',
        name: 'Close'
      },
      {
        id: '3009:118',
        name: 'Check'
      }
    ]);
  });
});
