export const processGraphicsTestData = {
  err: null,
  images: {
    '2710:7':
      'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/1c12/7bf2/5382af0fbf2908d72167b084836854f3',
    '2710:5':
      'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb'
  }
};

export const processGraphicsTestDataWithError = {
  err: 400,
  images: {
    '2710:7':
      'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/1c12/7bf2/5382af0fbf2908d72167b084836854f3',
    '2710:5':
      'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb'
  }
};

export const graphicsIds = [
  { id: '2710:7', name: 'More' },
  { id: '2710:5', name: 'Close' }
];
