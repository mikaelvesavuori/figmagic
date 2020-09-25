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
  test('Should return an empty object if an empty array of args is passed', () => {
    // @ts-ignore
    expect(parseCliArgs([])).toEqual({});
  });

  /*
   * Debug mode
   */
  test('It should return true for debugMode if passing "--debug"', () => {
    // @ts-ignore
    expect(parseCliArgs(['--debug'])).toEqual(
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
    expect(parseCliArgs(['--recompileLocal'])).toEqual(
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
    expect(parseCliArgs(['--syncGraphics'])).toEqual(
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
    expect(parseCliArgs(['--syncElements'])).toEqual(
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
    expect(parseCliArgs(['--skipReact'])).toEqual(
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
    expect(parseCliArgs(['--skipStyled'])).toEqual(
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
    expect(parseCliArgs(['--skipCss'])).toEqual(
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
    expect(parseCliArgs(['--skipStorybook'])).toEqual(
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
    expect(parseCliArgs(['--skipDescription'])).toEqual(
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
    expect(parseCliArgs(['--forceUpdate'])).toEqual(
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

  /*
   * Output token format
   */
  test('It should return "js" for outputFormatTokens if passing "js" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(['--outputFormatTokens', 'js'])).toEqual(
      expect.objectContaining({
        outputFormatTokens: 'js'
      })
    );
  });

  test('It should return "js" for outputFormatTokens if passing "js" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(['-ft', 'js'])).toEqual(
      expect.objectContaining({
        outputFormatTokens: 'js'
      })
    );
  });

  /*
   * Font unit
   */
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

  /*
   * LetterSpacing unit
   */
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

  /*
   * Opacities unit
   */
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

  /*
   * Spacing unit
   */
  test('It should return "em" for outputFormatTokens if passing "em" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(['--spacingUnit', 'em'])).toEqual(
      expect.objectContaining({
        spacingUnit: 'em'
      })
    );
  });

  test('It should return "em" for outputFormatTokens if passing "em" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(['-s', 'em'])).toEqual(
      expect.objectContaining({
        spacingUnit: 'em'
      })
    );
  });

  /*
   * Token
   */
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

  /*
   * Token data type
   */
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

  /*
   * URL
   */
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

  /*
   * Output folder base file
   */
  test('It should return ".figma" for outputFolderBaseFile if passing "figma" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(['--outputFolderBaseFile', 'figma'])).toEqual(
      expect.objectContaining({
        outputFolderBaseFile: 'figma'
      })
    );
  });

  test('It should return "figma" for outputFolderBaseFile if passing "figma" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(['-base', 'figma'])).toEqual(
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

  /*
   * Output folder elements
   */
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

  /*
   * Output file name
   */
  test('It should return "tokens" for outputFileName if passing "--outputFileName figma.json" (long-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(['--outputFileName', 'figma.json'])).toEqual(
      expect.objectContaining({
        outputFileName: 'figma.json'
      })
    );
  });

  test('It should return "tokens" for outputFileName if passing "-file figma.json" (short-hand)', () => {
    // @ts-ignore
    expect(parseCliArgs(['-file', 'figma.json'])).toEqual(
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

  /*
   * Template paths
   */

  test('It should return template path for React, if provided', () => {
    const templatePathReact = 'foo/react.jsx';
    // @ts-ignore
    expect(parseCliArgs(['--templatePathReact', templatePathReact])).toEqual(
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
    expect(parseCliArgs(['--templatePathStyled', templatePathStyled])).toEqual(
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
    expect(parseCliArgs(['--templatePathStorybook', templatePathStorybook])).toEqual(
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
