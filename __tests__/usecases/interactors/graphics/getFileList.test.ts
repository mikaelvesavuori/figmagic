import { ApiResponse } from '../../../../bin/contracts/ApiResponse';

import { getFileList } from '../../../../bin/usecases/interactors/graphics/getFileList';

import { processGraphicsTestData, graphicsIds } from '../../../../testdata/graphics/getGraphics';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => getFileList()).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should generate file list for SVG, when given valid input', () => {
    expect(getFileList(processGraphicsTestData as ApiResponse, graphicsIds, 'svg')).toEqual([
      {
        file: 'More.svg',
        url: 'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/1c12/7bf2/5382af0fbf2908d72167b084836854f3'
      },
      {
        file: 'Close.svg',
        url: 'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb'
      }
    ]);
  });

  test('It should generate file list for PNG, when given valid input', () => {
    expect(getFileList(processGraphicsTestData, graphicsIds, 'png')).toEqual([
      {
        file: 'More.png',
        url: 'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/1c12/7bf2/5382af0fbf2908d72167b084836854f3'
      },
      {
        file: 'Close.png',
        url: 'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb'
      }
    ]);
  });

  test('It should generate file list for JPG, when given valid input', () => {
    expect(getFileList(processGraphicsTestData, graphicsIds, 'jpg')).toEqual([
      {
        file: 'More.jpg',
        url: 'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/1c12/7bf2/5382af0fbf2908d72167b084836854f3'
      },
      {
        file: 'Close.jpg',
        url: 'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb'
      }
    ]);
  });
});
