import { formatName } from '../bin/functions/formatName.mjs';

test('It should remove single instances of forbidden characters', () => {
	expect(formatName('as–df')).toBe('asdf');
});

test('It should throw an error if no parameter is provided', () => {
	expect(() => {
		formatName();
	}).toThrow();
});
