import { processTokens } from '../bin/functions/process/processTokens';

import { defaultConfig } from '../testdata/defaultConfig';
import { colorFrame } from '../testdata/colorFrame';
import { spacingFrame } from '../testdata/spacingFrame';
import { fontFrame } from '../testdata/fontFrame';
import { fontSizeFrame } from '../testdata/fontSizeFrame';
import { fontWeightFrame } from '../testdata/fontWeightFrame';
import { lineHeightFrame } from '../testdata/lineHeightFrame';
import { borderWidthsFrame } from '../testdata/borderWidthsFrame';
import { letterSpacingsFrame } from '../testdata/letterSpacingsFrame';
import { mediaQueriesFrame } from '../testdata/mediaQueriesFrame';
import { opacitiesFrame } from '../testdata/opacitiesFrame';
import { radiiFrame } from '../testdata/radiiFrame';
import { shadowsFrame } from '../testdata/shadowsFrame';
import { zIndicesFrame } from '../testdata/zIndicesFrame';

/*
test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    processTokens();
  }).toThrow();
});
*/

test('It should return data when passed valid color frame and valid settings', () => {
  expect(processTokens(colorFrame, 'color', defaultConfig)).toEqual(
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
  expect(processTokens(spacingFrame, 'spacing', defaultConfig)).toEqual(
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
  expect(processTokens(fontFrame, 'fontfamilies', defaultConfig)).toEqual(
    expect.objectContaining({
      light: 'HelveticaNeue',
      medium: 'HelveticaNeue',
      regular: 'HelveticaNeue'
    })
  );
});

test('It should return data when passed valid font size frame and valid settings', () => {
  expect(processTokens(fontSizeFrame, 'fontsizes', defaultConfig)).toEqual(
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
  expect(processTokens(fontWeightFrame, 'fontweights', defaultConfig)).toEqual(
    expect.objectContaining({ light: 300, medium: 500, regular: 400 })
  );
});

test('It should return data when passed valid line heights frame and valid settings', () => {
  expect(processTokens(lineHeightFrame, 'lineheights', defaultConfig)).toEqual(
    expect.objectContaining({ l: '1.99', m: '1.76', s: '1.46', xs: '1.00' })
  );
});

//

test('It should return data when passed valid border width frame and valid settings', () => {
  expect(processTokens(borderWidthsFrame, 'borderwidths', defaultConfig)).toEqual(
    expect.objectContaining({ chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' })
  );
});

test('It should return data when passed valid letter spacings frame and valid settings', () => {
  expect(processTokens(letterSpacingsFrame, 'letterspacings', defaultConfig)).toEqual(
    expect.objectContaining({ regular: '0em', tight: '-0.045em', wide: '0.05em' })
  );
});

test('It should return data when passed valid media queries frame and valid settings', () => {
  expect(processTokens(opacitiesFrame, 'opacities', defaultConfig)).toEqual(
    expect.objectContaining({
      opaque: 1,
      disabled: 0.65,
      semiOpaque: 0.5,
      transparent: 0
    })
  );
});

test('It should return data when passed valid media queries frame and valid settings', () => {
  expect(processTokens(mediaQueriesFrame, 'mediaqueries', defaultConfig)).toEqual(
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

test('It should return data when passed valid radii frame and valid settings', () => {
  expect(processTokens(radiiFrame, 'radii', defaultConfig)).toEqual(
    expect.objectContaining({ circle: '100px', hard: '0px', rounded: '4px', soft: '8px' })
  );
});

test('It should return data when passed valid shadows frame and valid settings', () => {
  expect(processTokens(shadowsFrame, 'shadows', defaultConfig)).toEqual(
    expect.objectContaining({
      deep: '3px 3px 3px rgba(196, 196, 196, 0.75)',
      medium: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      soft: '0px 0px 5px rgba(196, 196, 196, 1)'
    })
  );
});

test('It should return data when passed valid Z index frame and valid settings', () => {
  expect(processTokens(zIndicesFrame, 'zindices', defaultConfig)).toEqual(
    expect.objectContaining({ focus: 10, high: 1, higher: 2, regular: 0, top: 100 })
  );
});
