import { writeFile } from '../bin/functions/writeFile.mjs';

test('Description', () => {
	expect(writeFile('asdf')).toBe('asdf');
});
