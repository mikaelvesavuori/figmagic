import { createPage } from '../bin/functions/createPage.mjs';

test('Description', () => {
	expect(createPage('asdf')).toBe('asdf');
});
