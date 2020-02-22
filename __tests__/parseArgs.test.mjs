import { parseArgs } from '../bin/functions/parseArgs';

test('It should return "mjs" if value is undefined', () => {
	expect(parseArgs()).toEqual(
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
	expect(parseArgs(['--format', 'js'])).toEqual(
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
	expect(parseArgs(['--format', 'lkjwef'])).toEqual(
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
	expect(parseArgs(['--format', 'MJS'])).toEqual(
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
