import { createFolder } from '../bin/functions/createFolder.mjs';

test('Description', () => {
	expect(createFolder('asdf')).toBe('asdf');
});
