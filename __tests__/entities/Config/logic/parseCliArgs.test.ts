import { parseCliArgs } from '../../../../bin/entities/Config/logic/parseCliArgs';
import { baseConfig } from '../../../../bin/entities/Config/baseConfig';

describe('Failure cases', () => {
  test('It should throw an error if no config is passed', () => {
    expect(() => {
      // @ts-ignore
      parseCliArgs();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('Should return an empty object if an empty array of args is passed', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, [])).toEqual({});
  });

  /*
   * Debug mode
   */
  test('It should return true for debugMode if passing "--debug"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--debug'])).toEqual(
      expect.objectContaining({
        debugMode: true
      })
    );
  });

  /*
   * Recompile only local files
   */
  test('It should return true for recompileLocal if passing "--recompileLocal"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--recompileLocal'])).toEqual(
      expect.objectContaining({
        recompileLocal: true
      })
    );
  });

  /*
   * Sync graphics
   */
  test('It should return true for syncGraphics if passing "--syncGraphics"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--syncGraphics'])).toEqual(
      expect.objectContaining({
        syncGraphics: true
      })
    );
  });

  /*
   * Sync elements
   */
  test('It should return true for syncElements if passing "--syncElements"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--syncElements'])).toEqual(
      expect.objectContaining({
        syncElements: true
      })
    );
  });

  /*
   * Skip file generation: React
   */
  test('It should return true for skipFileGeneration.react if passing "--skipReact"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--skipReact'])).toEqual(
      expect.objectContaining({
        skipFileGeneration: expect.objectContaining({
          skipReact: true
        })
      })
    );
  });

  /*
   * Skip file generation: Styled Components
   */
  test('It should return true for skipFileGeneration.styled if passing "--skipStyled"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--skipStyled'])).toEqual(
      expect.objectContaining({
        skipFileGeneration: expect.objectContaining({
          skipStyled: true
        })
      })
    );
  });

  /*
   * Skip file generation: CSS
   */
  test('It should return true for skipFileGeneration.css if passing "--skipCss"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--skipCss'])).toEqual(
      expect.objectContaining({
        skipFileGeneration: expect.objectContaining({
          skipCss: true
        })
      })
    );
  });

  /*
   * Skip file generation: Storybook
   */
  test('It should return true for skipFileGeneration.storybook if passing "--skipStorybook"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--skipStorybook'])).toEqual(
      expect.objectContaining({
        skipFileGeneration: expect.objectContaining({
          skipStorybook: true
        })
      })
    );
  });

  /*
   * Skip file generation: Markdown description
   */
  test('It should return true for skipFileGeneration.styled if passing "--skipDescription"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--skipDescription'])).toEqual(
      expect.objectContaining({
        skipFileGeneration: expect.objectContaining({
          skipDescription: true
        })
      })
    );
  });

  /*
   * Force update
   */
  test('It should return true for skipFileGeneration.forceUpdate if passing "--forceUpdate"', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--forceUpdate'])).toEqual(
      expect.objectContaining({
        skipFileGeneration: expect.objectContaining({
          forceUpdate: true
        })
      })
    );
  });

  /**
   * Skip file generation: all
   */
  test('It should return true for all skipFileGeneration properties, if passing all --skip flags', () => {
    const args = [
      '--skipReact',
      '--skipStyled',
      '--skipCss',
      '--skipStorybook',
      '--skipDescription'
    ];

    // @ts-ignore
    expect(parseCliArgs(baseConfig, args)).toEqual(
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

  /*
   * Output token format
   */
  test('It should return "js" for outputTokenFormat if passing "js" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--outputTokenFormat', 'js'])).toEqual(
      expect.objectContaining({
        outputTokenFormat: 'js'
      })
    );
  });

  test('It should return "js" for outputTokenFormat if passing "js" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-tf', 'js'])).toEqual(
      expect.objectContaining({
        outputTokenFormat: 'js'
      })
    );
  });

  test('It should return default value for outputTokenFormat if passing invalid value (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--outputTokenFormat', 'asdf'])).toEqual(
      expect.objectContaining({
        outputTokenFormat: baseConfig.outputTokenFormat
      })
    );
  });

  /*
   * Font unit
   */
  test('It should return "em" for fontUnit if passing "em" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--fontUnit', 'em'])).toEqual(
      expect.objectContaining({
        fontUnit: 'em'
      })
    );
  });

  test('It should return "em" for fontUnit if passing "em" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-f', 'em'])).toEqual(
      expect.objectContaining({
        fontUnit: 'em'
      })
    );
  });

  test('It should return default value for fontUnit if passing invalid value (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--fontUnit', 'asdf'])).toEqual(
      expect.objectContaining({
        fontUnit: baseConfig.fontUnit
      })
    );
  });

  /*
   * LetterSpacing unit
   */
  test('It should return the unit for letterSpacingUnit if passing valid value (long-hand)', () => {
    const unit = 'em';
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--letterSpacingUnit', unit])).toEqual(
      expect.objectContaining({
        letterSpacingUnit: unit
      })
    );
  });

  test('It should return the unit for letterSpacingUnit if passing valid value (short-hand)', () => {
    const unit = 'px';
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-lsu', unit])).toEqual(
      expect.objectContaining({
        letterSpacingUnit: unit
      })
    );
  });

  test('It should return default value for letterSpacingUnit if passing invalid value', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--letterSpacingUnit', 'asdf'])).toEqual(
      expect.objectContaining({
        letterSpacingUnit: baseConfig.letterSpacingUnit
      })
    );
  });

  /*
   * Opacities unit
   */
  test('It should return the unit for opacitiesUnit if passing valid value (long-hand)', () => {
    const unit = 'percent';
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--opacitiesUnit', unit])).toEqual(
      expect.objectContaining({
        opacitiesUnit: unit
      })
    );
  });

  test('It should return the unit for opacitiesUnit if passing valid value (short-hand)', () => {
    const unit = 'float';
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-ou', unit])).toEqual(
      expect.objectContaining({
        opacitiesUnit: unit
      })
    );
  });

  test('It should return default value for opacitiesUnit if passing invalid value', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--opacitiesUnit', 'asdf'])).toEqual(
      expect.objectContaining({
        opacitiesUnit: baseConfig.opacitiesUnit
      })
    );
  });

  /*
   * Spacing unit
   */
  test('It should return "em" for outputTokenFormat if passing "em" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--spacingUnit', 'em'])).toEqual(
      expect.objectContaining({
        spacingUnit: 'em'
      })
    );
  });

  test('It should return "em" for outputTokenFormat if passing "em" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-s', 'em'])).toEqual(
      expect.objectContaining({
        spacingUnit: 'em'
      })
    );
  });

  test('It should return default value for spacingUnit if passing invalid value', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--spacingUnit', 'asdf'])).toEqual(
      expect.objectContaining({
        spacingUnit: baseConfig.spacingUnit
      })
    );
  });

  /*
   * Token
   */
  test('It should return "asdf" for token if passing "asdf" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--token', 'asdf'])).toEqual(
      expect.objectContaining({
        token: 'asdf'
      })
    );
  });

  test('It should return "asdf" for token if passing "asdf" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-t', 'asdf'])).toEqual(
      expect.objectContaining({
        token: 'asdf'
      })
    );
  });

  /*
   * Token data type
   */
  test('It should return "enum" for token if passing "enum" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--outputTokenDataType', 'enum'])).toEqual(
      expect.objectContaining({
        outputTokenDataType: 'enum'
      })
    );
  });

  test('It should return "enum" for token if passing "enum" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-tokentype', 'enum'])).toEqual(
      expect.objectContaining({
        outputTokenDataType: 'enum'
      })
    );
  });

  /*
   * URL
   */
  test('It should return "abc123" for url if passing "abc123" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--url', 'abc123'])).toEqual(
      expect.objectContaining({
        url: 'abc123'
      })
    );
  });

  test('It should return "abc123" for url if passing "abc123" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-u', 'abc123'])).toEqual(
      expect.objectContaining({
        url: 'abc123'
      })
    );
  });

  /*
   * Output folder base file
   */
  test('It should return ".figma" for outputFolderBaseFile if passing "figma" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--outputFolderBaseFile', 'figma'])).toEqual(
      expect.objectContaining({
        outputFolderBaseFile: 'figma'
      })
    );
  });

  test('It should return "figma" for outputFolderBaseFile if passing "figma" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-base', 'figma'])).toEqual(
      expect.objectContaining({
        outputFolderBaseFile: 'figma'
      })
    );
  });

  /*
   * Output folder tokens
   */
  test('It should return "tokens" for outputFolderTokens if passing "--outputFolderTokens" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--outputFolderTokens', 'tokens'])).toEqual(
      expect.objectContaining({
        outputFolderTokens: 'tokens'
      })
    );
  });

  test('It should return "tokens" for outputFolderTokens if passing "-tokens" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-tokens', 'tokens'])).toEqual(
      expect.objectContaining({
        outputFolderTokens: 'tokens'
      })
    );
  });

  /*
   * Output folder elements
   */
  test('It should return "elements" for outputFolderElements if passing "--outputFolderElements" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--outputFolderElements', 'elements'])).toEqual(
      expect.objectContaining({
        outputFolderElements: 'elements'
      })
    );
  });

  test('It should return "elements" for outputFolderElements if passing "-elements" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-elements', 'elements'])).toEqual(
      expect.objectContaining({
        outputFolderElements: 'elements'
      })
    );
  });

  /*
   * Output file name
   */
  test('It should return "tokens" for outputFileName if passing "--outputFileName figma.json" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--outputFileName', 'figma.json'])).toEqual(
      expect.objectContaining({
        outputFileName: 'figma.json'
      })
    );
  });

  test('It should return "tokens" for outputFileName if passing "-file figma.json" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-file', 'figma.json'])).toEqual(
      expect.objectContaining({
        outputFileName: 'figma.json'
      })
    );
  });

  /*
   * Postscript font family names
   */
  test('It should return true for usePostscriptFontNames if passing true (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--usePostscriptFontNames', true])).toEqual(
      expect.objectContaining({
        usePostscriptFontNames: true
      })
    );
  });

  test('It should return true for usePostscriptFontNames if passing true (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['-ps', true])).toEqual(
      expect.objectContaining({
        usePostscriptFontNames: true
      })
    );
  });

  /*
   * Template paths
   */

  test('It should return template path for React, if provided', () => {
    const templatePathReact = 'foo/react.jsx';
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--templatePathReact', templatePathReact])).toEqual(
      expect.objectContaining({
        templates: expect.objectContaining({
          templatePathReact
        })
      })
    );
  });

  test('It should return template path for Styled Components, if provided', () => {
    const templatePathStyled = 'foo/styled.jsx';
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--templatePathStyled', templatePathStyled])).toEqual(
      expect.objectContaining({
        templates: expect.objectContaining({
          templatePathStyled
        })
      })
    );
  });

  test('It should return template path for Storybook, if provided', () => {
    const templatePathStorybook = 'foo/story.js';
    // @ts-ignore
    expect(parseCliArgs(baseConfig, ['--templatePathStorybook', templatePathStorybook])).toEqual(
      expect.objectContaining({
        templates: expect.objectContaining({
          templatePathStorybook
        })
      })
    );
  });

  test('It should return all template paths, if provided', () => {
    const templatePathReact = 'foo/react.jsx';
    const templatePathStyled = 'foo/styled.jsx';
    const templatePathStorybook = 'foo/story.js';

    const args = [
      '--templatePathReact',
      templatePathReact,
      '--templatePathStyled',
      templatePathStyled,
      '--templatePathStorybook',
      templatePathStorybook
    ];

    // @ts-ignore
    expect(parseCliArgs(baseConfig, args)).toEqual(
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
