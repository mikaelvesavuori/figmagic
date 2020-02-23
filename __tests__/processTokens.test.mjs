import { processTokens } from '../bin/functions/processTokens';

import { colorFrame } from '../testdata/colorFrame.mjs';
import { spacingFrame } from '../testdata/spacingFrame.mjs';
import { fontFrame } from '../testdata/fontFrame.mjs';
import { fontSizeFrame } from '../testdata/fontSizeFrame.mjs';
import { fontWeightFrame } from '../testdata/fontWeightFrame.mjs';
import { lineHeightFrame } from '../testdata/lineHeightFrame.mjs';

const settings = {
  debugMode: false,
  fontUnit: 'rem',
  outputFileName: 'figma.json',
  outputFolderBaseFile: 'figma',
  outputFolderTokens: 'tokens',
  outputTokenFormat: 'mjs',
  spacingUnit: 'rem',
  usePostscriptFontNames: false
};

test('It should throw an error if no parameter is provided', () => {
  //expect.assertions(1);
  expect(processTokens()).rejects.toThrow();
});

test('It should return data when passed valid color frame and valid settings', () => {
  expect(processTokens(colorFrame, 'color', settings)).toEqual(
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
  expect(processTokens(spacingFrame, 'spacing', settings)).toEqual(
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
  expect(processTokens(fontFrame, 'fontfamilies', settings)).toEqual(
    expect.objectContaining({
      light: 'HelveticaNeue',
      medium: 'HelveticaNeue',
      regular: 'HelveticaNeue'
    })
  );
});

test('It should return data when passed valid font size frame and valid settings', () => {
  expect(processTokens(fontSizeFrame, 'fontsizes', settings)).toEqual(
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
  expect(processTokens(fontWeightFrame, 'fontweights', settings)).toEqual(
    expect.objectContaining({ light: 300, medium: 500, regular: 400 })
  );
});

test('It should return data when passed valid line heights frame and valid settings', () => {
  expect(processTokens(lineHeightFrame, 'lineheights', settings)).toEqual(
    expect.objectContaining({ l: '1.99', m: '1.76', s: '1.46', xs: '1.00' })
  );
});
