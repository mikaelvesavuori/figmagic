import { processTokens } from '../bin/functions/processTokens';

import { defaultSettings } from '../testdata/defaultSettings.mjs';
import { colorFrame } from '../testdata/colorFrame.mjs';
import { spacingFrame } from '../testdata/spacingFrame.mjs';
import { fontFrame } from '../testdata/fontFrame.mjs';
import { fontSizeFrame } from '../testdata/fontSizeFrame.mjs';
import { fontWeightFrame } from '../testdata/fontWeightFrame.mjs';
import { lineHeightFrame } from '../testdata/lineHeightFrame.mjs';
import { borderWidthsFrame } from '../testdata/borderWidthsFrame.mjs';
import { letterSpacingsFrame } from '../testdata/letterSpacingsFrame.mjs';
import { mediaQueriesFrame } from '../testdata/mediaQueriesFrame.mjs';
import { radiiFrame } from '../testdata/radiiFrame.mjs';
import { shadowsFrame } from '../testdata/shadowsFrame.mjs';
import { zIndicesFrame } from '../testdata/zIndicesFrame.mjs';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    processTokens();
  }).toThrow();
});

test('It should return data when passed valid color frame and valid settings', () => {
  expect(processTokens(colorFrame, 'color', defaultSettings)).toEqual(
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

test('It should return data when passed valid spacing frame and valid settings', () => {
  expect(processTokens(spacingFrame, 'spacing', defaultSettings)).toEqual(
    expect.objectContaining({
      huge: '5rem',
      large: '4.375rem',
      medium: '3.125rem',
      small: '1.5rem',
      tiny: '0.75rem'
    })
  );
});

test('It should return data when passed valid font families frame and valid settings', () => {
  expect(processTokens(fontFrame, 'fontfamilies', defaultSettings)).toEqual(
    expect.objectContaining({
      light: 'HelveticaNeue',
      medium: 'HelveticaNeue',
      regular: 'HelveticaNeue'
    })
  );
});

test('It should return data when passed valid font size frame and valid settings', () => {
  expect(processTokens(fontSizeFrame, 'fontsizes', defaultSettings)).toEqual(
    expect.objectContaining({
      h1: '3rem',
      h2: '2.5rem',
      h3: '2rem',
      h4: '1.25rem',
      l: '1.25rem',
      m: '1rem',
      microcopy: '0.625rem',
      s: '0.75rem'
    })
  );
});

test('It should return data when passed valid font weights frame and valid settings', () => {
  expect(processTokens(fontWeightFrame, 'fontweights', defaultSettings)).toEqual(
    expect.objectContaining({ light: 300, medium: 500, regular: 400 })
  );
});

test('It should return data when passed valid line heights frame and valid settings', () => {
  expect(processTokens(lineHeightFrame, 'lineheights', defaultSettings)).toEqual(
    expect.objectContaining({ l: '1.99', m: '1.76', s: '1.46', xs: '1.00' })
  );
});

//

test('It should return data when passed valid border width frame and valid settings', () => {
  expect(processTokens(borderWidthsFrame, 'borderwidths', defaultSettings)).toEqual(
    expect.objectContaining({ chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' })
  );
});

test('It should return data when passed valid letter spacings frame and valid settings', () => {
  expect(processTokens(letterSpacingsFrame, 'letterspacings', defaultSettings)).toEqual(
    expect.objectContaining({ regular: '0px', tight: '-2.40px', wide: '3.30px' })
  );
});

test('It should return data when passed valid media queries frame and valid settings', () => {
  expect(processTokens(mediaQueriesFrame, 'mediaqueries', defaultSettings)).toEqual(
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

test('It should return data when passed valid radii frame and valid settings', () => {
  expect(processTokens(radiiFrame, 'radii', defaultSettings)).toEqual(
    expect.objectContaining({ circle: '100px', hard: '0px', rounded: '4px', soft: '8px' })
  );
});

test('It should return data when passed valid shadows frame and valid settings', () => {
  expect(processTokens(shadowsFrame, 'shadows', defaultSettings)).toEqual(
    expect.objectContaining({
      deep: '152px 523px 10px 10px rgba(255, 0, 0, 1)',
      medium: '152px 523px 10px 10px rgba(255, 0, 0, 1)',
      soft: '152px 523px 10px 10px rgba(255, 0, 0, 1)'
    })
  );
});

test('It should return data when passed valid Z index frame and valid settings', () => {
  expect(processTokens(zIndicesFrame, 'zindices', defaultSettings)).toEqual(
    expect.objectContaining({ focus: '10', high: '1', higher: '2', regular: '0', top: '100' })
  );
});
