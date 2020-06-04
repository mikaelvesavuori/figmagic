import { setupMediaQueryTokens } from '../bin/functions/tokens/setupMediaQueryTokens';

import { mediaQueriesFrame } from '../testdata/mediaQueriesFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupMediaQueryTokens(mediaQueriesFrame)).toEqual(
    expect.objectContaining({
      desktopLg: '1440px',
      desktopMd: '1180px',
      mobileLg: '580px',
      mobileMax: '767px',
      mobileMd: '480px',
      mobileSm: '320px',
      tabletMax: '1024px',
      tabletMin: '768px',
      wide: '1920px'
    })
  );
});

test('It should throw an error if frame is missing "children" array', () => {
  expect(() => {
    setupMediaQueryTokens({});
  }).toThrow();
});

test('It should throw an error if frame does not have "absoluteBoundingBox" property', () => {
  expect(() => {
    setupMediaQueryTokens({
      children: [
        {
          somethingElse: 123
        }
      ]
    });
  }).toThrow();
});

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    setupMediaQueryTokens();
  }).toThrow();
});
