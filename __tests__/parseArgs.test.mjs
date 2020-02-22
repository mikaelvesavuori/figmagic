import { parseCliArgs } from '../bin/functions/parseCliArgs';

test('It should return "mjs" if value is undefined', () => {
	expect(parseCliArgs()).toEqual(
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

test('It should return "js" if value is "js"', () => {
	expect(parseCliArgs(['--format', 'js'])).toEqual(
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
