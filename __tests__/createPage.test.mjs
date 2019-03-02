import { createPage, findShortenedNameMatch } from '../bin/functions/createPage.mjs';

test('It should throw an error if no parameter is provided', () => {
	expect(() => {
		createPage();
	}).toThrow();
});

test('It should throw an error if array is empty', () => {
	const figmaPages = [];
	expect(() => {
		createPage(figmaPages);
	}).toThrow();
});
