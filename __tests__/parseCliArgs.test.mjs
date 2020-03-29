import { parseCliArgs } from '../bin/functions/config/parseCliArgs';

import { config } from '../bin/meta/config.mjs';

test('It should throw an error if no arguments array is passed', () => {
  expect(() => {
    parseCliArgs();
  }).toThrow();
});

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

test('It should return default value for outputTokenFormat if passing invalid value (long-hand)', () => {
  expect(parseCliArgs(['--outputTokenFormat', 'asdf'])).toEqual(
    expect.objectContaining({
      outputTokenFormat: config.defaultOutputTokenFormat
    })
  );
});

/*
 * Font unit
 */
test('It should return "em" for fontUnit if passing "em" (long-hand)', () => {
  expect(parseCliArgs(['--fontUnit', 'em'])).toEqual(
    expect.objectContaining({
      fontUnit: 'em'
    })
  );
});

test('It should return "em" for fontUnit if passing "em" (short-hand)', () => {
  expect(parseCliArgs(['-f', 'em'])).toEqual(
    expect.objectContaining({
      fontUnit: 'em'
    })
  );
});

test('It should return default value for fontUnit if passing invalid value (long-hand)', () => {
  expect(parseCliArgs(['--fontUnit', 'asdf'])).toEqual(
    expect.objectContaining({
      fontUnit: config.defaultFontUnit
    })
  );
});

/*
 * Spacing unit
 */
test('It should return "em" for outputTokenFormat if passing "em" (long-hand)', () => {
  expect(parseCliArgs(['--spacingUnit', 'em'])).toEqual(
    expect.objectContaining({
      spacingUnit: 'em'
    })
  );
});

test('It should return "em" for outputTokenFormat if passing "em" (short-hand)', () => {
  expect(parseCliArgs(['-s', 'em'])).toEqual(
    expect.objectContaining({
      spacingUnit: 'em'
    })
  );
});

test('It should return default value for spacingUnit if passing invalid value', () => {
  expect(parseCliArgs(['--spacingUnit', 'asdf'])).toEqual(
    expect.objectContaining({
      spacingUnit: config.defaultSpacingUnit
    })
  );
});

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
