import { processTokens } from '../../../../bin/usecases/interactors/tokens/processTokens';

import { baseConfig } from '../../../../bin/entities/Config/baseConfig';
import { colorFrame } from '../../../../testdata/frames/colorFrame';
import { spacingFrame } from '../../../../testdata/frames/spacingFrame';
import { fontFrame } from '../../../../testdata/frames/fontFrame';
import { fontSizeFrame } from '../../../../testdata/frames/fontSizeFrame';
import { fontWeightFrame } from '../../../../testdata/frames/fontWeightFrame';
import { lineHeightFrame } from '../../../../testdata/frames/lineHeightFrame';
import { borderWidthsFrame } from '../../../../testdata/frames/borderWidthsFrame';
import { letterSpacingsFrame } from '../../../../testdata/frames/letterSpacingsFrame';
import { mediaQueriesFrame } from '../../../../testdata/frames/mediaQueriesFrame';
import { opacitiesFrame } from '../../../../testdata/frames/opacitiesFrame';
import { radiiFrame } from '../../../../testdata/frames/radiiFrame';
import { shadowsFrame } from '../../../../testdata/frames/shadowsFrame';
import {
  zIndicesFrame,
  zIndicesFrameWithIgnoreKeyword
} from '../../../../testdata/frames/zIndicesFrame';
import { durationsFrame } from '../../../../testdata/frames/durationsFrame';
import { delayFrame } from '../../../../testdata/frames/delaysFrame';
import { easingFrame } from '../../../../testdata/frames/easingFrame';

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
    expect(processTokens([colorFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: {
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
            green3: 'rgba(111, 207, 151, 0.65)',
            neon: 'rgba(228, 255, 193, 1)',
            orange: 'rgba(242, 153, 74, 1)',
            red: 'rgba(235, 87, 87, 1)',
            white: 'rgba(255, 255, 255, 1)',
            yellow: 'rgba(242, 201, 76, 1)'
          },
          format: 'ts',
          name: 'colors',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid spacing frame and valid settings', () => {
    expect(processTokens([spacingFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: {
            big: '3rem',
            huge: '6rem',
            large: '4rem',
            medium: '2rem',
            small: '1rem',
            tiny: '0.5rem'
          },
          format: 'ts',
          name: 'spacing',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid font families frame and valid settings', () => {
    expect(processTokens([fontFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: {
            light: 'Helvetica Neue',
            medium: 'Helvetica Neue',
            regular: 'Helvetica Neue'
          },
          format: 'ts',
          name: 'fontFamilies',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid font size frame and valid settings', () => {
    expect(processTokens([fontSizeFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: {
            h1: '3rem',
            h2: '2.5rem',
            h3: '2rem',
            h4: '1.625rem',
            h5: '1.25rem',
            h6: '1.125rem',
            paragraph: '1rem',
            sub: '0.75rem'
          },
          format: 'ts',
          name: 'fontSizes',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid font weights frame and valid settings', () => {
    expect(processTokens([fontWeightFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { bold: 700, light: 300, medium: 500, regular: 400 },
          format: 'ts',
          name: 'fontWeights',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid line heights frame and valid settings', () => {
    expect(processTokens([lineHeightFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { l: '1.65', m: '1.45', s: '1.35', xs: '1.00', auto: 'normal' },
          format: 'ts',
          name: 'lineHeights',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid border width frame and valid settings', () => {
    expect(processTokens([borderWidthsFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' },
          format: 'ts',
          name: 'borderWidths',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid letter spacings frame and valid settings', () => {
    expect(processTokens([letterSpacingsFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { regular: '0em', tight: '-0.045em', wide: '0.05em' },
          format: 'ts',
          name: 'letterSpacings',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid media queries frame and valid settings', () => {
    expect(processTokens([opacitiesFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { disabled: 0.65, opaque: 1, semiOpaque: 0.5, transparent: 0 },
          format: 'ts',
          name: 'opacities',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid media queries frame and valid settings', () => {
    expect(processTokens([mediaQueriesFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: {
            desktopLg: '1440px',
            desktopMd: '1180px',
            mobileLg: '580px',
            mobileMax: '767px',
            mobileMd: '480px',
            mobileSm: '320px',
            tabletMax: '1024px',
            tabletMin: '768px',
            wide: '1920px'
          },
          format: 'ts',
          name: 'mediaQueries',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid radii frame and valid settings', () => {
    expect(processTokens([radiiFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { circle: '100px', hard: '0px', rounded: '4px', soft: '8px' },
          format: 'ts',
          name: 'radii',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid shadows frame and valid settings', () => {
    expect(processTokens([shadowsFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: {
            deep: '3px 3px 3px rgba(196, 196, 196, 0.75)',
            deepMulti: '0px 4px 4px rgba(0, 0, 0, 0.17), 0px 4px 20px rgba(0, 0, 0, 0.1)',
            medium: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            soft: '0px 0px 5px rgba(196, 196, 196, 1)'
          },
          format: 'ts',
          name: 'shadows',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          },
          path: 'tokens',
          type: 'token'
        }
      ])
    );
  });

  test('It should return data when passed valid Z index frame and valid settings', () => {
    expect(processTokens([zIndicesFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { focus: 10, high: 1, higher: 2, regular: 0, top: 100 },
          format: 'ts',
          name: 'zIndices',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid Z index frame and valid settings, ignoring an element including an "ignored" keyword', () => {
    expect(processTokens([zIndicesFrameWithIgnoreKeyword], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { regular: 0 },
          format: 'ts',
          name: 'zIndices',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid durations frame and valid settings', () => {
    expect(processTokens([durationsFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { long: '0.6s', medium: '0.25s', short: '0.15s', veryLong: '1s' },
          format: 'ts',
          name: 'durations',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid delays frame and valid settings', () => {
    expect(processTokens([delayFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: { decimal: 0.5, fast: 200, medium: 400, slow: 750 },
          format: 'ts',
          name: 'delays',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });

  test('It should return data when passed valid easings frame and valid settings', () => {
    expect(processTokens([easingFrame], baseConfig)).toEqual(
      expect.arrayContaining([
        {
          file: {
            easeIn: 'cubic-bezier(0.50, 0, 1, 1)',
            easeInout: 'cubic-bezier(0.45, 0, 0.40, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.40, 1)'
          },
          format: 'ts',
          name: 'easings',
          path: 'tokens',
          type: 'token',
          overwrite: {
            css: false,
            description: false,
            graphic: false,
            react: false,
            storybook: false,
            styled: false
          }
        }
      ])
    );
  });
});
