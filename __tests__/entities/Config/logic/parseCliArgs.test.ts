import { parseCliArgs } from '../../../../bin/entities/Config/logic/parseCliArgs';

describe('Failure cases', () => {
  test('It should throw an error if no config is passed', () => {
    expect(() => {
      // @ts-ignore
      parseCliArgs();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return empty object if empty arguments array', () => {
    // @ts-ignore
    expect(parseCliArgs([])).toMatchObject({});
  });

  describe('Debug mode', () => {
    test('It should return true for debugMode if passing "--debug" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--debug'])).toEqual(
        expect.objectContaining({
          debugMode: true
        })
      );
    });

    test('It should return true for debugMode if passing "-d" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-d'])).toEqual(
        expect.objectContaining({
          debugMode: true
        })
      );
    });
  });

  describe('Transform ("camelize") token names', () => {
    test('It should return false for camelizeTokenNames if passing "--noCamelizeTokenNames" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--noCamelizeTokenNames'])).toEqual(
        expect.objectContaining({
          camelizeTokenNames: false
        })
      );
    });

    test('It should return false for camelizeTokenNames if passing "-cml" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-cml'])).toEqual(
        expect.objectContaining({
          camelizeTokenNames: false
        })
      );
    });
  });

  describe('Border width unit', () => {
    test('It should return "px" for borderWidthUnit if passing "px" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--borderWidthUnit', 'px'])).toEqual(
        expect.objectContaining({
          borderWidthUnit: 'px'
        })
      );
    });

    test('It should return "px" for borderWidthUnit if passing "px" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-bwu', 'px'])).toEqual(
        expect.objectContaining({
          borderWidthUnit: 'px'
        })
      );
    });

    test('It should return "rem" for borderWidthUnit if passing "rem" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--borderWidthUnit', 'rem'])).toEqual(
        expect.objectContaining({
          borderWidthUnit: 'rem'
        })
      );
    });

    test('It should return "rem" for borderWidthUnit if passing "rem" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-bwu', 'rem'])).toEqual(
        expect.objectContaining({
          borderWidthUnit: 'rem'
        })
      );
    });

    test('It should return "em" for borderWidthUnit if passing "em" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--borderWidthUnit', 'em'])).toEqual(
        expect.objectContaining({
          borderWidthUnit: 'em'
        })
      );
    });

    test('It should return "em" for borderWidthUnit if passing "em" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-bwu', 'em'])).toEqual(
        expect.objectContaining({
          borderWidthUnit: 'em'
        })
      );
    });
  });

  describe('Radius unit', () => {
    test('It should return "px" for radiusUnit if passing "px" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--radiusUnit', 'px'])).toEqual(
        expect.objectContaining({
          radiusUnit: 'px'
        })
      );
    });

    test('It should return "px" for radiusUnit if passing "px" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-ru', 'px'])).toEqual(
        expect.objectContaining({
          radiusUnit: 'px'
        })
      );
    });

    test('It should return "rem" for radiusUnit if passing "rem" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--radiusUnit', 'rem'])).toEqual(
        expect.objectContaining({
          radiusUnit: 'rem'
        })
      );
    });

    test('It should return "rem" for radiusUnit if passing "rem" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-ru', 'rem'])).toEqual(
        expect.objectContaining({
          radiusUnit: 'rem'
        })
      );
    });

    test('It should return "em" for radiusUnit if passing "em" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--radiusUnit', 'em'])).toEqual(
        expect.objectContaining({
          radiusUnit: 'em'
        })
      );
    });

    test('It should return "em" for radiusUnit if passing "em" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-ru', 'em'])).toEqual(
        expect.objectContaining({
          radiusUnit: 'em'
        })
      );
    });
  });

  describe('Shadow unit', () => {
    test('It should return "px" for shadowUnit if passing "px" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--shadowUnit', 'px'])).toEqual(
        expect.objectContaining({
          shadowUnit: 'px'
        })
      );
    });

    test('It should return "px" for shadowUnit if passing "px" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-su', 'px'])).toEqual(
        expect.objectContaining({
          shadowUnit: 'px'
        })
      );
    });

    test('It should return "rem" for shadowUnit if passing "rem" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--shadowUnit', 'rem'])).toEqual(
        expect.objectContaining({
          shadowUnit: 'rem'
        })
      );
    });

    test('It should return "rem" for shadowUnit if passing "rem" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-su', 'rem'])).toEqual(
        expect.objectContaining({
          shadowUnit: 'rem'
        })
      );
    });

    test('It should return "em" for shadowUnit if passing "em" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--shadowUnit', 'em'])).toEqual(
        expect.objectContaining({
          shadowUnit: 'em'
        })
      );
    });

    test('It should return "em" for shadowUnit if passing "em" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-su', 'em'])).toEqual(
        expect.objectContaining({
          shadowUnit: 'em'
        })
      );
    });
  });

  describe('Duration unit', () => {
    test('It should return "s" for durationUnit if passing "s" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--durationUnit', 's'])).toEqual(
        expect.objectContaining({
          durationUnit: 's'
        })
      );
    });

    test('It should return "s" for durationUnit if passing "s" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-du', 's'])).toEqual(
        expect.objectContaining({
          durationUnit: 's'
        })
      );
    });

    test('It should return "ms" for durationUnit if passing "ms" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--durationUnit', 'ms'])).toEqual(
        expect.objectContaining({
          durationUnit: 'ms'
        })
      );
    });

    test('It should return "ms" for durationUnit if passing "ms" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-du', 'ms'])).toEqual(
        expect.objectContaining({
          durationUnit: 'ms'
        })
      );
    });
  });

  describe('Font unit', () => {
    test('It should return "em" for fontUnit if passing "em" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--fontUnit', 'em'])).toEqual(
        expect.objectContaining({
          fontUnit: 'em'
        })
      );
    });

    test('It should return "em" for fontUnit if passing "em" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-fu', 'em'])).toEqual(
        expect.objectContaining({
          fontUnit: 'em'
        })
      );
    });
  });

  describe('Line height unit', () => {
    test('It should return "unitless" for lineHeightUnit if passing "unitless" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--lineHeightUnit', 'unitless'])).toEqual(
        expect.objectContaining({
          lineHeightUnit: 'unitless'
        })
      );
    });

    test('It should return "unitless" for lineHeightUnit if passing "unitless" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-lhu', 'unitless'])).toEqual(
        expect.objectContaining({
          lineHeightUnit: 'unitless'
        })
      );
    });

    test('It should return "px" for lineHeightUnit if passing "px" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--lineHeightUnit', 'px'])).toEqual(
        expect.objectContaining({
          lineHeightUnit: 'px'
        })
      );
    });

    test('It should return "px" for lineHeightUnit if passing "px" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-lhu', 'px'])).toEqual(
        expect.objectContaining({
          lineHeightUnit: 'px'
        })
      );
    });

    test('It should return "em" for lineHeightUnit if passing "em" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--lineHeightUnit', 'em'])).toEqual(
        expect.objectContaining({
          lineHeightUnit: 'em'
        })
      );
    });

    test('It should return "em" for lineHeightUnit if passing "em" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-lhu', 'em'])).toEqual(
        expect.objectContaining({
          lineHeightUnit: 'em'
        })
      );
    });

    test('It should return "rem" for lineHeightUnit if passing "rem" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--lineHeightUnit', 'rem'])).toEqual(
        expect.objectContaining({
          lineHeightUnit: 'rem'
        })
      );
    });

    test('It should return "rem" for lineHeightUnit if passing "rem" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-lhu', 'rem'])).toEqual(
        expect.objectContaining({
          lineHeightUnit: 'rem'
        })
      );
    });
  });

  describe('Letter spacing unit', () => {
    test('It should return the unit for letterSpacingUnit if passing valid value (long-hand)', () => {
      const unit = 'em';
      // @ts-ignore
      expect(parseCliArgs(['--letterSpacingUnit', unit])).toEqual(
        expect.objectContaining({
          letterSpacingUnit: unit
        })
      );
    });

    test('It should return the unit for letterSpacingUnit if passing valid value (short-hand)', () => {
      const unit = 'px';
      // @ts-ignore
      expect(parseCliArgs(['-lsu', unit])).toEqual(
        expect.objectContaining({
          letterSpacingUnit: unit
        })
      );
    });
  });

  describe('Opacities unit', () => {
    test('It should return the unit for opacitiesUnit if passing valid value (long-hand)', () => {
      const unit = 'percent';
      // @ts-ignore
      expect(parseCliArgs(['--opacitiesUnit', unit])).toEqual(
        expect.objectContaining({
          opacitiesUnit: unit
        })
      );
    });

    test('It should return the unit for opacitiesUnit if passing valid value (short-hand)', () => {
      const unit = 'float';
      // @ts-ignore
      expect(parseCliArgs(['-ou', unit])).toEqual(
        expect.objectContaining({
          opacitiesUnit: unit
        })
      );
    });
  });

  describe('Figma data', () => {
    test('It should return the assigned path for figmaData if passing "--figmaData figma.json" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--figmaData', 'figma.json'])).toEqual(
        expect.objectContaining({
          figmaData: 'figma.json'
        })
      );
    });

    test('It should return the assigned path for figmaData if passing "-file figma.json" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-data', 'figma.json'])).toEqual(
        expect.objectContaining({
          figmaData: 'figma.json'
        })
      );
    });
  });

  describe('Figmagic folder', () => {
    test('It should return ".figmagic" for figmagicFolder if passing "figma" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--figmagicFolder', '.figmagic'])).toEqual(
        expect.objectContaining({
          figmagicFolder: '.figmagic'
        })
      );
    });

    test('It should return ".figmagic" for figmagicFolder if passing "figma" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-base', '.figmagic'])).toEqual(
        expect.objectContaining({
          figmagicFolder: '.figmagic'
        })
      );
    });
  });

  describe('Output folder elements', () => {
    test('It should return "elements" for outputFolderElements if passing "--outputFolderElements" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputFolderElements', 'elements'])).toEqual(
        expect.objectContaining({
          outputFolderElements: 'elements'
        })
      );
    });

    test('It should return "elements" for outputFolderElements if passing "-elements" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-elements', 'elements'])).toEqual(
        expect.objectContaining({
          outputFolderElements: 'elements'
        })
      );
    });
  });

  describe('Output folder graphics', () => {
    test('It should return "graphics" for outputFolderGraphics if passing "--outputFolderGraphics" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputFolderGraphics', 'graphics'])).toEqual(
        expect.objectContaining({
          outputFolderGraphics: 'graphics'
        })
      );
    });

    test('It should return "graphics" for outputFolderGraphics if passing "-graphics" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-graphics', 'graphics'])).toEqual(
        expect.objectContaining({
          outputFolderGraphics: 'graphics'
        })
      );
    });
  });

  describe('Output folder tokens', () => {
    test('It should return "tokens" for outputFolderTokens if passing "--outputFolderTokens" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputFolderTokens', 'tokens'])).toEqual(
        expect.objectContaining({
          outputFolderTokens: 'tokens'
        })
      );
    });

    test('It should return "tokens" for outputFolderTokens if passing "-tokens" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-tokens', 'tokens'])).toEqual(
        expect.objectContaining({
          outputFolderTokens: 'tokens'
        })
      );
    });
  });

  describe('Output format CSS', () => {
    test('It should return "ts" for outputFormatCss if passing "--outputFormatCss ts" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputFormatCss', 'ts'])).toEqual(
        expect.objectContaining({
          outputFormatCss: 'ts'
        })
      );
    });

    test('It should return "ts" for outputFormatCss if passing "-fc outputFormatCss" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-fc', 'ts'])).toEqual(
        expect.objectContaining({
          outputFormatCss: 'ts'
        })
      );
    });
  });

  describe('Output format description', () => {
    test('It should return "md" for outputFormatDescription if passing "--outputFormatDescription md" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputFormatDesc', 'md'])).toEqual(
        expect.objectContaining({
          outputFormatDescription: 'md'
        })
      );
    });

    test('It should return "md" for outputFormatDescription if passing "-fd md" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-fd', 'md'])).toEqual(
        expect.objectContaining({
          outputFormatDescription: 'md'
        })
      );
    });
  });

  describe('Output format elements', () => {
    test('It should return "tsx" for outputFormatElements if passing "--outputFormatElements tsx" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputFormatElements', 'tsx'])).toEqual(
        expect.objectContaining({
          outputFormatElements: 'tsx'
        })
      );
    });

    test('It should return "tsx" for outputFormatElements if passing "-elements tsx" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-fe', 'tsx'])).toEqual(
        expect.objectContaining({
          outputFormatElements: 'tsx'
        })
      );
    });
  });

  describe('Output format graphics', () => {
    test('It should return "svg" for outputFormatGraphics if passing "--outputFormatGraphics tsx" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputFormatGraphics', 'svg'])).toEqual(
        expect.objectContaining({
          outputFormatGraphics: 'svg'
        })
      );
    });

    test('It should return "svg" for outputFormatGraphics if passing "-fg tsx" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-fg', 'svg'])).toEqual(
        expect.objectContaining({
          outputFormatGraphics: 'svg'
        })
      );
    });
  });

  describe('Output format Storybook', () => {
    test('It should return "tsx" for outputFormatStorybook if passing "--outputFormatStorybook ts" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputFormatStorybook', 'ts'])).toEqual(
        expect.objectContaining({
          outputFormatStorybook: 'ts'
        })
      );
    });

    test('It should return "tsx" for outputFormatStorybook if passing "-fs ts" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-fs', 'ts'])).toEqual(
        expect.objectContaining({
          outputFormatStorybook: 'ts'
        })
      );
    });
  });

  describe('Output format tokens', () => {
    describe('Long hand', () => {
      test('It should return "ts" for outputFormatTokens if passing "ts"', () => {
        // @ts-ignore
        expect(parseCliArgs(['--outputFormatTokens', 'ts'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'ts'
          })
        );
      });

      test('It should return "mjs" for outputFormatTokens if passing "mjs"', () => {
        // @ts-ignore
        expect(parseCliArgs(['--outputFormatTokens', 'mjs'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'mjs'
          })
        );
      });

      test('It should return "js" for outputFormatTokens if passing "js"', () => {
        // @ts-ignore
        expect(parseCliArgs(['--outputFormatTokens', 'js'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'js'
          })
        );
      });

      test('It should return "json" for outputFormatTokens if passing "json"', () => {
        // @ts-ignore
        expect(parseCliArgs(['--outputFormatTokens', 'json'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'json'
          })
        );
      });

      test('It should return "css" for outputFormatTokens if passing "css"', () => {
        // @ts-ignore
        expect(parseCliArgs(['--outputFormatTokens', 'css'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'css'
          })
        );
      });
    });

    describe('Short hand', () => {
      test('It should return "ts" for outputFormatTokens if passing "ts"', () => {
        // @ts-ignore
        expect(parseCliArgs(['-ft', 'ts'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'ts'
          })
        );
      });

      test('It should return "mjs" for outputFormatTokens if passing "mjs"', () => {
        // @ts-ignore
        expect(parseCliArgs(['-ft', 'mjs'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'mjs'
          })
        );
      });

      test('It should return "js" for outputFormatTokens if passing "js"', () => {
        // @ts-ignore
        expect(parseCliArgs(['-ft', 'js'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'js'
          })
        );
      });

      test('It should return "json" for outputFormatTokens if passing "json"', () => {
        // @ts-ignore
        expect(parseCliArgs(['-ft', 'json'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'json'
          })
        );
      });

      test('It should return "css" for outputFormatTokens if passing "css"', () => {
        // @ts-ignore
        expect(parseCliArgs(['-ft', 'css'])).toEqual(
          expect.objectContaining({
            outputFormatTokens: 'css'
          })
        );
      });
    });
  });

  describe('Output graphic elements as React components', () => {
    test('It should return "true" for outputGraphicElements if passing "--outputGraphicElements" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputGraphicElements'])).toEqual(
        expect.objectContaining({
          outputGraphicElements: true
        })
      );
    });

    test('It should return "true" for outputGraphicElements if passing "-oge" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-oge'])).toEqual(
        expect.objectContaining({
          outputGraphicElements: true
        })
      );
    });
  });

  describe('Output map/index file for all graphic elements exported as React components', () => {
    test('It should return "true" for outputGraphicElementsMap if passing "--outputGraphicElementsMap" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputGraphicElementsMap', 'ts'])).toEqual(
        expect.objectContaining({
          outputGraphicElementsMap: true
        })
      );
    });

    test('It should return "true" for outputGraphicElementsMap if passing "-ogm" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-ogm', 'ts'])).toEqual(
        expect.objectContaining({
          outputGraphicElementsMap: true
        })
      );
    });
  });

  describe('Output scale graphics', () => {
    test('It should return "2" for outputScaleGraphics if passing "2x" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputScaleGraphics', '2x'])).toEqual(
        expect.objectContaining({
          outputScaleGraphics: 2
        })
      );
    });

    test('It should return "2" for outputScaleGraphics if passing "2x" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-scale', '2x'])).toEqual(
        expect.objectContaining({
          outputScaleGraphics: 2
        })
      );
    });
  });

  describe('Output data type for tokens', () => {
    test('It should return "enum" for token if passing "enum" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--outputDataTypeToken', 'enum'])).toEqual(
        expect.objectContaining({
          outputDataTypeToken: 'enum'
        })
      );
    });

    test('It should return "enum" for token if passing "enum" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-tokentype', 'enum'])).toEqual(
        expect.objectContaining({
          outputDataTypeToken: 'enum'
        })
      );
    });
  });

  describe('Recompile local', () => {
    test('It should return true for recompileLocal if passing "--recompileLocal" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--recompileLocal'])).toEqual(
        expect.objectContaining({
          recompileLocal: true
        })
      );
    });

    test('It should return true for recompileLocal if passing "--recompileLocal" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-local'])).toEqual(
        expect.objectContaining({
          recompileLocal: true
        })
      );
    });
  });

  describe('REM size', () => {
    test('It should return "16" for remSize if passing "16p" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--remSize', '16p'])).toEqual(
        expect.objectContaining({
          remSize: 16
        })
      );
    });

    test('It should return "16" for remSize if passing "16p" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-rem', '16p'])).toEqual(
        expect.objectContaining({
          remSize: 16
        })
      );
    });
  });

  describe('Force update', () => {
    test('It should return true for skipFileGeneration.forceUpdate if passing "--forceUpdate" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--forceUpdate'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            forceUpdate: true
          })
        })
      );
    });

    test('It should return true for skipFileGeneration.forceUpdate if passing "-f" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-force'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            forceUpdate: true
          })
        })
      );
    });
  });

  describe('Skip CSS', () => {
    test('It should return true for skipFileGeneration.css if passing "--skipCss" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--skipCss'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipCss: true
          })
        })
      );
    });

    test('It should return true for skipFileGeneration.css if passing "-nocss" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-nocss'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipCss: true
          })
        })
      );
    });
  });

  describe('Skip description', () => {
    test('It should return true for skipFileGeneration.styled if passing "--skipDescription" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--skipDescription'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipDescription: true
          })
        })
      );
    });

    test('It should return true for skipFileGeneration.styled if passing "-nodesc" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-nodesc'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipDescription: true
          })
        })
      );
    });
  });

  describe('Skip React', () => {
    test('It should return true for skipFileGeneration.react if passing "--skipReact" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--skipReact'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipReact: true
          })
        })
      );
    });

    test('It should return true for skipFileGeneration.react if passing "-noreact" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-noreact'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipReact: true
          })
        })
      );
    });
  });

  describe('Skip Storybook', () => {
    test('It should return true for skipFileGeneration.storybook if passing "--skipStorybook" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--skipStorybook'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipStorybook: true
          })
        })
      );
    });

    test('It should return true for skipFileGeneration.storybook if passing "-nostory" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-nostory'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipStorybook: true
          })
        })
      );
    });
  });

  describe('Skip Styled Components', () => {
    test('It should return true for skipFileGeneration.styled if passing "--skipStyled" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--skipStyled'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipStyled: true
          })
        })
      );
    });

    test('It should return true for skipFileGeneration.styled if passing "-nostyled" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-nostyled'])).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipStyled: true
          })
        })
      );
    });
  });

  describe('Spacing unit', () => {
    test('It should return "em" for spacingUnit if passing "em" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--spacingUnit', 'em'])).toEqual(
        expect.objectContaining({
          spacingUnit: 'em'
        })
      );
    });

    test('It should return "em" for spacingUnit if passing "em" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-s', 'em'])).toEqual(
        expect.objectContaining({
          spacingUnit: 'em'
        })
      );
    });
  });

  describe('Sync elements', () => {
    test('It should return true for syncElements if passing "--syncElements" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--syncElements'])).toEqual(
        expect.objectContaining({
          syncElements: true
        })
      );
    });

    test('It should return true for syncElements if passing "-se" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-se'])).toEqual(
        expect.objectContaining({
          syncElements: true
        })
      );
    });
  });

  describe('Sync graphics', () => {
    test('It should return true for syncGraphics if passing "--syncGraphics" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--syncGraphics'])).toEqual(
        expect.objectContaining({
          syncGraphics: true
        })
      );
    });

    test('It should return true for syncGraphics if passing "-sg" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-sg'])).toEqual(
        expect.objectContaining({
          syncGraphics: true
        })
      );
    });
  });

  describe('Sync tokens', () => {
    test('It should return true for syncTokens if passing "--syncGraphics" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--syncTokens'])).toEqual(
        expect.objectContaining({
          syncTokens: true
        })
      );
    });

    test('It should return true for syncTokens if passing "-st" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-st'])).toEqual(
        expect.objectContaining({
          syncTokens: true
        })
      );
    });
  });

  describe('Template path React', () => {
    test('It should return template path for React (long-hand)', () => {
      const templatePathReact = 'foo/react';
      // @ts-ignore
      expect(parseCliArgs(['--templatePathReact', templatePathReact])).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathReact
          })
        })
      );
    });

    test('It should return template path for React (short-hand)', () => {
      const templatePathReact = 'foo/react';
      // @ts-ignore
      expect(parseCliArgs(['-tpreact', templatePathReact])).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathReact
          })
        })
      );
    });
  });

  describe('Template path Storybook', () => {
    test('It should return template path for Storybook (long-hand)', () => {
      const templatePathStorybook = 'foo/story';
      // @ts-ignore
      expect(parseCliArgs(['--templatePathStorybook', templatePathStorybook])).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathStorybook
          })
        })
      );
    });

    test('It should return template path for Storybook (short-hand)', () => {
      const templatePathStorybook = 'foo/story';
      // @ts-ignore
      expect(parseCliArgs(['-tpstory', templatePathStorybook])).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathStorybook
          })
        })
      );
    });
  });

  describe('Template path Styled Components', () => {
    test('It should return template path for Styled Components (long-hand)', () => {
      const templatePathStyled = 'foo/styled';
      // @ts-ignore
      expect(parseCliArgs(['--templatePathStyled', templatePathStyled])).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathStyled
          })
        })
      );
    });

    test('It should return template path for Styled Components (short-hand)', () => {
      const templatePathStyled = 'foo/styled';
      // @ts-ignore
      expect(parseCliArgs(['-tpstyled', templatePathStyled])).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathStyled
          })
        })
      );
    });
  });

  describe('Template path graphics', () => {
    test('It should return template path for graphics (long-hand)', () => {
      const templatePathGraphic = 'foo/graphic';
      // @ts-ignore
      expect(parseCliArgs(['--templatePathGraphic', templatePathGraphic])).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathGraphic
          })
        })
      );
    });

    test('It should return template path for graphics (short-hand)', () => {
      const templatePathGraphic = 'foo/graphic';
      // @ts-ignore
      expect(parseCliArgs(['-tpgraphic', templatePathGraphic])).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathGraphic
          })
        })
      );
    });
  });

  describe('Token', () => {
    test('It should return "asdf" for token if passing "asdf" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--token', 'asdf'])).toEqual(
        expect.objectContaining({
          token: 'asdf'
        })
      );
    });

    test('It should return "asdf" for token if passing "asdf" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-t', 'asdf'])).toEqual(
        expect.objectContaining({
          token: 'asdf'
        })
      );
    });
  });

  describe('Token', () => {
    test('It should return "asdf" for token if passing "asdf" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--tokensRelativeImportPrefix', '../../'])).toEqual(
        expect.objectContaining({
          tokensRelativeImportPrefix: '../../'
        })
      );
    });

    test('It should return "asdf" for token if passing "asdf" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-tip', '../../'])).toEqual(
        expect.objectContaining({
          tokensRelativeImportPrefix: '../../'
        })
      );
    });
  });

  describe('Unitless Precision', () => {
    test('It should return "3" for url if passing "3" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--unitlessPrecision', '3'])).toEqual(
        expect.objectContaining({
          unitlessPrecision: 3
        })
      );
    });

    test('It should return "4" for url if passing "4" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-up', '4'])).toEqual(
        expect.objectContaining({
          unitlessPrecision: 4
        })
      );
    });
  });

  describe('URL', () => {
    test('It should return "abc123" for url if passing "abc123" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--url', 'abc123'])).toEqual(
        expect.objectContaining({
          url: 'abc123'
        })
      );
    });

    test('It should return "abc123" for url if passing "abc123" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-u', 'abc123'])).toEqual(
        expect.objectContaining({
          url: 'abc123'
        })
      );
    });
  });

  describe('Use Postscript font names', () => {
    test('It should return true for usePostscriptFontNames if passing true (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--usePostscriptFontNames', true])).toEqual(
        expect.objectContaining({
          usePostscriptFontNames: true
        })
      );
    });

    test('It should return true for usePostscriptFontNames if passing true (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-ps', true])).toEqual(
        expect.objectContaining({
          usePostscriptFontNames: true
        })
      );
    });
  });

  describe('Use Literal font names', () => {
    test('It should return true for useLiteralFontFamilies if passing true (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--useLiteralFontFamilies', true])).toEqual(
        expect.objectContaining({
          useLiteralFontFamilies: true
        })
      );
    });

    test('It should return true for useLiteralFontFamilies if passing true (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-lff', true])).toEqual(
        expect.objectContaining({
          useLiteralFontFamilies: true
        })
      );
    });
  });

  describe('Use Postscript font names', () => {
    test('It should return "Version 4.1.0" for versionName if passing "Version 4.1.0" (long-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['--versionName', 'Version 4.1.0'])).toEqual(
        expect.objectContaining({
          versionName: 'Version 4.1.0'
        })
      );
    });

    test('It should return "Version 4.1.0" for versionName if passing "Version 4.1.0" (short-hand)', () => {
      // @ts-ignore
      expect(parseCliArgs(['-v', 'Version 4.1.0'])).toEqual(
        expect.objectContaining({
          versionName: 'Version 4.1.0'
        })
      );
    });
  });

  /**
   * Odd cases
   */

  describe('Return successfully if given no arguments', () => {
    test('Should return an empty object if an empty array of args is passed', () => {
      // @ts-ignore
      expect(parseCliArgs([])).toEqual({});
    });
  });

  describe('Skip file generation: all', () => {
    test('It should return true for all skipFileGeneration properties, if passing all --skip flags', () => {
      const args = [
        '--skipReact',
        '--skipStyled',
        '--skipCss',
        '--skipStorybook',
        '--skipDescription'
      ];

      // @ts-ignore
      expect(parseCliArgs(args)).toEqual(
        expect.objectContaining({
          skipFileGeneration: expect.objectContaining({
            skipCss: true,
            skipDescription: true,
            skipReact: true,
            skipStorybook: true,
            skipStyled: true
          })
        })
      );
    });
  });

  describe('Template paths', () => {
    test('It should return all template paths', () => {
      const templatePathReact = 'foo/react';
      const templatePathStyled = 'foo/styled';
      const templatePathStorybook = 'foo/story';

      const args = [
        '--templatePathReact',
        templatePathReact,
        '--templatePathStyled',
        templatePathStyled,
        '--templatePathStorybook',
        templatePathStorybook
      ];

      // @ts-ignore
      expect(parseCliArgs(args)).toEqual(
        expect.objectContaining({
          templates: expect.objectContaining({
            templatePathReact,
            templatePathStyled,
            templatePathStorybook
          })
        })
      );
    });
  });
});
