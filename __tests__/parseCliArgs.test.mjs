import { parseCliArgs } from '../bin/functions/parseCliArgs';

/*
 * Debug mode
 */
test('It should return true for debugMode if passing "--debug"', () => {
  expect(parseCliArgs(['--debug'])).toEqual(
    expect.objectContaining({
      debugMode: true
    })
  );
});

/*
 * Output token format
 */
test('It should return "js" for outputTokenFormat if passing "js" (long-hand)', () => {
  expect(parseCliArgs(['--outputTokenFormat', 'js'])).toEqual(
    expect.objectContaining({
      outputTokenFormat: 'js'
    })
  );
});

test('It should return "js" for outputTokenFormat if passing "js" (short-hand)', () => {
  expect(parseCliArgs(['-tf', 'js'])).toEqual(
    expect.objectContaining({
      outputTokenFormat: 'js'
    })
  );
});

/*
test('It should warn and set default value if passing invalid value for outputTokenFormat', () => {
  const consoleSpy = jest.spyOn(console, 'warn');
  console.warn('hello');
  expect(consoleSpy).toHaveBeenCalledWith('hello');

  expect(parseCliArgs(['-tf', 'asdf'])).toEqual(
    expect.objectContaining({
      outputTokenFormat: 'js'
    })
  );
});
*/

/*
 * Token
 */
test('It should return "asdf" for token if passing "asdf" (long-hand)', () => {
  expect(parseCliArgs(['--token', 'asdf'])).toEqual(
    expect.objectContaining({
      token: 'asdf'
    })
  );
});

test('It should return "asdf" for token if passing "asdf" (short-hand)', () => {
  expect(parseCliArgs(['-t', 'asdf'])).toEqual(
    expect.objectContaining({
      token: 'asdf'
    })
  );
});

/*
 * URL
 */
test('It should return "abc123" for url if passing "abc123" (long-hand)', () => {
  expect(parseCliArgs(['--url', 'abc123'])).toEqual(
    expect.objectContaining({
      url: 'abc123'
    })
  );
});

test('It should return "abc123" for url if passing "abc123" (short-hand)', () => {
  expect(parseCliArgs(['-u', 'abc123'])).toEqual(
    expect.objectContaining({
      url: 'abc123'
    })
  );
});

/*
 * Output folder base file
 */
test('It should return "figma" for outputFolderBaseFile if passing "figma" (long-hand)', () => {
  expect(parseCliArgs(['--outputFolderBaseFile', 'figma'])).toEqual(
    expect.objectContaining({
      outputFolderBaseFile: 'figma'
    })
  );
});

test('It should return "figma" for outputFolderBaseFile if passing "figma" (short-hand)', () => {
  expect(parseCliArgs(['-base', 'figma'])).toEqual(
    expect.objectContaining({
      outputFolderBaseFile: 'figma'
    })
  );
});

/*
 * Output folder tokens
 */
test('It should return "tokens" for outputFolderTokens if passing "tokens" (long-hand)', () => {
  expect(parseCliArgs(['--outputFolderTokens', 'tokens'])).toEqual(
    expect.objectContaining({
      outputFolderTokens: 'tokens'
    })
  );
});

test('It should return "tokens" for outputFolderTokens if passing "tokens" (short-hand)', () => {
  expect(parseCliArgs(['-tokens', 'tokens'])).toEqual(
    expect.objectContaining({
      outputFolderTokens: 'tokens'
    })
  );
});

/*
 * Output file name
 */
test('It should return "tokens" for outputFileName if passing "figma.json" (long-hand)', () => {
  expect(parseCliArgs(['--outputFileName', 'figma.json'])).toEqual(
    expect.objectContaining({
      outputFileName: 'figma.json'
    })
  );
});

test('It should return "tokens" for outputFileName if passing "figma.json" (short-hand)', () => {
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
  expect(parseCliArgs(['--usePostscriptFontNames', true])).toEqual(
    expect.objectContaining({
      usePostscriptFontNames: true
    })
  );
});

test('It should return true for usePostscriptFontNames if passing true (short-hand)', () => {
  expect(parseCliArgs(['-ps', true])).toEqual(
    expect.objectContaining({
      usePostscriptFontNames: true
    })
  );
});

/*
test('It should return "mjs" if value is invalid (i.e. not "mjs" or "js")', () => {
  expect(parseCliArgs(['--format', 'lkjwef'])).toEqual(
    expect.objectContaining({
      debugMode: false,
      fontUnit: 'rem',
      outputFileName: 'figma.json',
      outputFolderBaseFile: 'figma',
      outputFolderTokens: 'tokens',
      outputTokenFormat: 'mjs',
      spacingUnit: 'rem',
      token: null,
      url: null
    })
  );
});

test('It should return "mjs" regardless of casing', () => {
  expect(parseCliArgs(['--format', 'MJS'])).toEqual(
    expect.objectContaining({
      debugMode: false,
      fontUnit: 'rem',
      outputFileName: 'figma.json',
      outputFolderBaseFile: 'figma',
      outputFolderTokens: 'tokens',
      outputTokenFormat: 'mjs',
      spacingUnit: 'rem',
      token: null,
      url: null
    })
  );
});
*/
