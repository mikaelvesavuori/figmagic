import { makeColorTokens } from '../../../../bin/entities/Token/logic/makeColorTokens';

import {
  colorFrame,
  colorFrameOpacity,
  colorFrameThemes,
  colorFrameThemesAndColors,
  colorFrameDeepNestedThemes
} from '../../../../testdata/frames/colorFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      makeColorTokens({});
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      makeColorTokens();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input (using opacity) and using RGBA colors', () => {
    expect(makeColorTokens(colorFrameOpacity, 'rgba')).toEqual(
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
        green3: 'rgba(111, 207, 151, 0.65)',
        neon: 'rgba(228, 255, 193, 1)',
        orange: 'rgba(242, 153, 74, 1)',
        red: 'rgba(235, 87, 87, 1)',
        white: 'rgba(255, 255, 255, 1)',
        yellow: 'rgba(242, 201, 76, 1)'
      })
    );
  });

  test('It should return a complete object when passing in valid input (using alpha channel) and using RGBA colors', () => {
    expect(makeColorTokens(colorFrame, 'rgba')).toEqual(
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
        green3: 'rgba(111, 207, 151, 0.65)',
        neon: 'rgba(228, 255, 193, 1)',
        orange: 'rgba(242, 153, 74, 1)',
        red: 'rgba(235, 87, 87, 1)',
        white: 'rgba(255, 255, 255, 1)',
        yellow: 'rgba(242, 201, 76, 1)'
      })
    );
  });

  test('It should return a complete object when passing in valid input (using opacity) and using HEX colors', () => {
    expect(makeColorTokens(colorFrameOpacity, 'hex')).toEqual(
      expect.objectContaining({
        black: '#333333',
        blue1: '#2f80ed',
        blue2: '#2d9cdb',
        blue3: '#56ccf2',
        gray1: '#4f4f4f',
        gray2: '#828282',
        gray3: '#bdbdbd',
        gray4: '#e0e0e0',
        gray5: '#f2f2f2',
        green1: '#219653',
        green2: '#27ae60',
        green3: '#a1dfbb',
        neon: '#e4ffc1',
        orange: '#f2994a',
        red: '#eb5757',
        white: '#ffffff',
        yellow: '#f2c94c'
      })
    );
  });

  test('It should return a complete object when passing in valid input (using alpha channel) and using HEX colors', () => {
    expect(makeColorTokens(colorFrame, 'hex')).toEqual(
      expect.objectContaining({
        black: '#333333',
        blue1: '#2f80ed',
        blue2: '#2d9cdb',
        blue3: '#56ccf2',
        gray1: '#4f4f4f',
        gray2: '#828282',
        gray3: '#bdbdbd',
        gray4: '#e0e0e0',
        gray5: '#f2f2f2',
        green1: '#219653',
        green2: '#27ae60',
        green3: '#a1dfbb',
        neon: '#e4ffc1',
        orange: '#f2994a',
        red: '#eb5757',
        white: '#ffffff',
        yellow: '#f2c94c'
      })
    );
  });

  describe('Multiple color themes support', () => {
    test('It should return a collection of objects when there are nested Frames', () => {
      expect(makeColorTokens(colorFrameThemes, 'rgba')).toEqual(
        expect.objectContaining({
          darkTheme: {
            emptyShade: 'rgba(51, 51, 51, 1)',
            fullShade: 'rgba(255, 255, 255, 1)',
            lightestShade: 'rgba(79, 79, 79, 1)',
            lightShade: 'rgba(130, 130, 130, 1)',
            mediumShade: 'rgba(189, 189, 189, 1)',
            darkShade: 'rgba(224, 224, 224, 1)',
            darkestShade: 'rgba(242, 242, 242, 1)',
            accent: 'rgba(205, 255, 142, 1)',
            danger: 'rgba(248, 102, 102, 1)',
            warningVariant: 'rgba(253, 176, 109, 1)',
            warning: 'rgba(246, 212, 107, 1)',
            primary: 'rgba(39, 131, 255, 1)',
            primaryText: 'rgba(79, 191, 254, 0.9)',
            primaryBackground:
              'linear-gradient(90deg, rgba(66, 208, 254, 0.95) 9%, rgba(86, 204, 242, 0.02) 94%)',
            success: 'rgba(68, 239, 141, 1)',
            successText: 'rgba(110, 220, 156, 1)'
          },
          lightTheme: {
            fullShade: 'rgba(51, 51, 51, 1)',
            emptyShade: 'rgba(255, 255, 255, 1)',
            darkestShade: 'rgba(79, 79, 79, 1)',
            darkShade: 'rgba(130, 130, 130, 1)',
            mediumShade: 'rgba(189, 189, 189, 1)',
            lightShade: 'rgba(224, 224, 224, 1)',
            lightestShade: 'rgba(242, 242, 242, 1)',
            accent: 'rgba(228, 255, 193, 1)',
            danger: 'rgba(235, 87, 87, 1)',
            warningVariant: 'rgba(242, 153, 74, 1)',
            warning: 'rgba(242, 201, 76, 1)',
            primary: 'rgba(47, 128, 237, 1)',
            primaryText: 'rgba(45, 156, 219, 0.9)',
            primaryBackground:
              'linear-gradient(90deg, rgba(63, 163, 195, 0.95) 9%, rgba(86, 204, 242, 0.02) 94%)',
            success: 'rgba(33, 150, 83, 1)',
            successText: 'rgba(39, 174, 96, 1)'
          }
        })
      );
    });
    test('It should return allow a mix of a collection of objects and colors when there are nested Frames mixed with Colors', () => {
      expect(makeColorTokens(colorFrameThemesAndColors, 'rgba')).toEqual(
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
          green3: 'rgba(111, 207, 151, 0.65)',
          neon: 'rgba(228, 255, 193, 1)',
          orange: 'rgba(242, 153, 74, 1)',
          red: 'rgba(235, 87, 87, 1)',
          white: 'rgba(255, 255, 255, 1)',
          yellow: 'rgba(242, 201, 76, 1)',
          darkTheme: {
            emptyShade: 'rgba(51, 51, 51, 1)',
            fullShade: 'rgba(255, 255, 255, 1)',
            lightestShade: 'rgba(79, 79, 79, 1)',
            lightShade: 'rgba(130, 130, 130, 1)',
            mediumShade: 'rgba(189, 189, 189, 1)',
            darkShade: 'rgba(224, 224, 224, 1)',
            darkestShade: 'rgba(242, 242, 242, 1)',
            accent: 'rgba(205, 255, 142, 1)',
            danger: 'rgba(248, 102, 102, 1)',
            warningVariant: 'rgba(253, 176, 109, 1)',
            warning: 'rgba(246, 212, 107, 1)',
            primary: 'rgba(39, 131, 255, 1)',
            primaryText: 'rgba(79, 191, 254, 0.9)',
            primaryBackground:
              'linear-gradient(90deg, rgba(66, 208, 254, 0.95) 9%, rgba(86, 204, 242, 0.02) 94%)',
            success: 'rgba(68, 239, 141, 1)',
            successText: 'rgba(110, 220, 156, 1)'
          },
          lightTheme: {
            fullShade: 'rgba(51, 51, 51, 1)',
            emptyShade: 'rgba(255, 255, 255, 1)',
            darkestShade: 'rgba(79, 79, 79, 1)',
            darkShade: 'rgba(130, 130, 130, 1)',
            mediumShade: 'rgba(189, 189, 189, 1)',
            lightShade: 'rgba(224, 224, 224, 1)',
            lightestShade: 'rgba(242, 242, 242, 1)',
            accent: 'rgba(228, 255, 193, 1)',
            danger: 'rgba(235, 87, 87, 1)',
            warningVariant: 'rgba(242, 153, 74, 1)',
            warning: 'rgba(242, 201, 76, 1)',
            primary: 'rgba(47, 128, 237, 1)',
            primaryText: 'rgba(45, 156, 219, 0.9)',
            primaryBackground:
              'linear-gradient(90deg, rgba(63, 163, 195, 0.95) 9%, rgba(86, 204, 242, 0.02) 94%)',
            success: 'rgba(33, 150, 83, 1)',
            successText: 'rgba(39, 174, 96, 1)'
          }
        })
      );
    });
    test('It ignore deep nested Frames', () => {
      expect(makeColorTokens(colorFrameDeepNestedThemes, 'rgba')).toEqual(
        expect.objectContaining({
          darkTheme: {
            success: 'rgba(68, 239, 141, 1)',
            successText: 'rgba(110, 220, 156, 1)'
          },
          lightTheme: {
            success: 'rgba(33, 150, 83, 1)',
            successText: 'rgba(39, 174, 96, 1)'
          }
        })
      );
    });
  });
});
