import { setupMediaQueryTokens } from '../bin/functions/tokens/setupMediaQueryTokens';

import { mediaQueriesFrame } from '../testdata/mediaQueriesFrame.mjs';

test('It should return a complete object when passing in valid input', () => {
  expect(setupMediaQueryTokens(mediaQueriesFrame)).toEqual(
    expect.objectContaining({
      desktoplg: '1440px',
      desktopmd: '1180px',
      mobilelg: '580px',
      mobilemax: '767px',
      mobilemd: '480px',
      mobilesm: '320px',
      tabletmax: '1024px',
      tabletmin: '768px',
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
