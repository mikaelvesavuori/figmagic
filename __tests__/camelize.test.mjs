import { camelize } from '../bin/functions/camelize.mjs';

test('It should remove spaces and capitalize first letter of the word coming after the removed space', () => {
	expect(camelize('John Johnson')).toBe('johnJohnson');
});

test('It should lower-case the string', () => {
	expect(camelize('ASDF')).toBe('asdf');
});

test('It should trim trailing whitespace', () => {
	expect(camelize('text       ')).toBe('text');
});

test('It should throw an error if no parameter is provided', () => {
	expect(() => {
		camelize();
	}).toThrow();
});
