import { processTokens } from '../../bin/app/process/processTokens';

import { baseConfig } from '../../bin/entities/Config/baseConfig';
import { colorFrame } from '../../testdata/frames/colorFrame';
import { spacingFrame } from '../../testdata/frames/spacingFrame';
import { fontFrame } from '../../testdata/frames/fontFrame';
import { fontSizeFrame } from '../../testdata/frames/fontSizeFrame';
import { fontWeightFrame } from '../../testdata/frames/fontWeightFrame';
import { lineHeightFrame } from '../../testdata/frames/lineHeightFrame';
import { borderWidthsFrame } from '../../testdata/frames/borderWidthsFrame';
import { letterSpacingsFrame } from '../../testdata/frames/letterSpacingsFrame';
import { mediaQueriesFrame } from '../../testdata/frames/mediaQueriesFrame';
import { opacitiesFrame } from '../../testdata/frames/opacitiesFrame';
import { radiiFrame } from '../../testdata/frames/radiiFrame';
import { shadowsFrame } from '../../testdata/frames/shadowsFrame';
import { zIndicesFrame, zIndicesFrameWithIgnoreKeyword } from '../../testdata/frames/zIndicesFrame';
import { durationsFrame } from '../../testdata/frames/durationsFrame';
import { delayFrame } from '../../testdata/frames/delaysFrame';
import { easingFrame } from '../../testdata/frames/easingFrame';

// TODO: Test loc 39,67-94

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      processTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return data when passed valid color frame and valid settings', () => {
    expect(processTokens(colorFrame, 'color', baseConfig)).toEqual(
      expect.objectContaining({
        black: 'rgba(51, 51, 51, 1)',
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
    expect(processTokens(spacingFrame, 'spacing', baseConfig)).toEqual(
      expect.objectContaining({
        big: '3rem',
        huge: '6rem',
        large: '4rem',
        medium: '2rem',
        small: '1rem',
        tiny: '0.5rem'
      })
    );
  });

  test('It should return data when passed valid font families frame and valid settings', () => {
    expect(processTokens(fontFrame, 'fontfamilies', baseConfig)).toEqual(
      expect.objectContaining({
        light: 'Helvetica Neue',
        medium: 'Helvetica Neue',
        regular: 'Helvetica Neue'
      })
    );
  });

  test('It should return data when passed valid font size frame and valid settings', () => {
    expect(processTokens(fontSizeFrame, 'fontsizes', baseConfig)).toEqual(
      expect.objectContaining({
        h1: '3rem',
        h2: '2.5rem',
        h3: '2rem',
        h4: '1.625rem',
        h5: '1.25rem',
        h6: '1.125rem',
        paragraph: '1rem',
        sub: '0.75rem'
      })
    );
  });

  test('It should return data when passed valid font weights frame and valid settings', () => {
    expect(processTokens(fontWeightFrame, 'fontweights', baseConfig)).toEqual(
      expect.objectContaining({ light: 300, medium: 500, regular: 400 })
    );
  });

  test('It should return data when passed valid line heights frame and valid settings', () => {
    expect(processTokens(lineHeightFrame, 'lineheights', baseConfig)).toEqual(
      expect.objectContaining({ l: '1.65', m: '1.45', s: '1.35', xs: '1.00' })
    );
  });

  test('It should return data when passed valid border width frame and valid settings', () => {
    expect(processTokens(borderWidthsFrame, 'borderwidths', baseConfig)).toEqual(
      expect.objectContaining({ chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' })
    );
  });

  test('It should return data when passed valid letter spacings frame and valid settings', () => {
    expect(processTokens(letterSpacingsFrame, 'letterspacings', baseConfig)).toEqual(
      expect.objectContaining({ regular: '0em', tight: '-0.045em', wide: '0.05em' })
    );
  });

  test('It should return data when passed valid media queries frame and valid settings', () => {
    expect(processTokens(opacitiesFrame, 'opacities', baseConfig)).toEqual(
      expect.objectContaining({ disabled: 0.65, opaque: 1, semiOpaque: 0.5, transparent: 0 })
    );
  });

  test('It should return data when passed valid media queries frame and valid settings', () => {
    expect(processTokens(mediaQueriesFrame, 'mediaqueries', baseConfig)).toEqual(
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
    expect(processTokens(radiiFrame, 'radii', baseConfig)).toEqual(
      expect.objectContaining({ circle: '100px', hard: '0px', rounded: '4px', soft: '8px' })
    );
  });

  test('It should return data when passed valid shadows frame and valid settings', () => {
    expect(processTokens(shadowsFrame, 'shadows', baseConfig)).toEqual(
      expect.objectContaining({
        deep: '3px 3px 3px rgba(196, 196, 196, 0.75)',
        medium: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        soft: '0px 0px 5px rgba(196, 196, 196, 1)'
      })
    );
  });

  test('It should return data when passed valid Z index frame and valid settings', () => {
    expect(processTokens(zIndicesFrame, 'zindices', baseConfig)).toEqual(
      expect.objectContaining({ focus: 10, high: 1, higher: 2, regular: 0, top: 100 })
    );
  });

  test('It should return data when passed valid Z index frame and valid settings, ignoring an element including an "ignored" keyword', () => {
    expect(processTokens(zIndicesFrameWithIgnoreKeyword, 'zindices', baseConfig)).toEqual(
      expect.objectContaining({ regular: 0 })
    );
  });

  test('It should return data when passed valid durations frame and valid settings', () => {
    expect(processTokens(durationsFrame, 'durations', baseConfig)).toEqual(
      expect.objectContaining({ long: 0.6, medium: 0.25, short: 0.15, veryLong: 1 })
    );
  });

  test('It should return data when passed valid delays frame and valid settings', () => {
    expect(processTokens(delayFrame, 'delays', baseConfig)).toEqual(
      expect.objectContaining({ decimal: 0.5, fast: 200, medium: 400, slow: 750 })
    );
  });

  test('It should return data when passed valid easings frame and valid settings', () => {
    expect(processTokens(easingFrame, 'easings', baseConfig)).toEqual(
      expect.objectContaining({
        easeIn: 'cubic-bezier(0.50, 0, 1, 1)',
        easeInout: 'cubic-bezier(0.45, 0, 0.40, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.40, 1)'
      })
    );
  });
});
