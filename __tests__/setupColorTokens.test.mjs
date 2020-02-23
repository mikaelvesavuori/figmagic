import { setupColorTokens } from '../bin/functions/setupColorTokens';

import { colorFrame } from '../testdata/colorFrame.mjs';

/*
test('It should return true for debugMode if passing "--debug"', () => {
  expect(parseCliArgs(['--debug'])).toEqual(
    expect.objectContaining({
      debugMode: true
    })
  );
});
*/

test('something here', () => {
  expect(setupColorTokens(colorFrame)).toEqual(
    expect.objectContaining({
      black: 'rgba(1, 0, 45, 1)',
      blue1: 'rgba(47, 128, 237, 1)',
      blue2: 'rgba(45, 156, 219, 1)',
      blue3: 'rgba(86, 204, 242, 1)',
      gray1: 'rgba(79, 79, 79, 1)',
      gray2: 'rgba(130, 130, 130, 1)',
      gray3: 'rgba(189, 189, 189, 1)',
      gray4: 'rgba(224, 224, 224, 1)',
      gray5: 'rgba(242, 242, 242, 1)',
      green1: 'rgba(33, 150, 83, 1)',
      green2: 'rgba(39, 174, 96, 1)',
      green3: 'rgba(111, 207, 151, 1)',
      neon: 'rgba(228, 255, 193, 1)',
      orange: 'rgba(242, 153, 74, 1)',
      red: 'rgba(235, 87, 87, 1)',
      white: 'rgba(255, 255, 255, 1)',
      yellow: 'rgba(242, 201, 76, 1)'
    })
  );
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupColorTokens();
  }).toThrow();
});
