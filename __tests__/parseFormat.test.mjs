import { parseFormat } from '../bin/functions/parseFormat.mjs';

test('It should return "mjs" if value is undefined', () => {
	expect(parseFormat()).toBe('mjs');
});

test('It should return "js" if value is "js"', () => {
	expect(parseFormat('js')).toBe('js');
});

test('It should return "mjs" if value is invalid (i.e. not "mjs" or "js")', () => {
	expect(parseFormat('lkjwef')).toBe('mjs');
});

test('It should return "mjs" regardless of casing', () => {
	expect(parseFormat('JS')).toBe('js');
});
