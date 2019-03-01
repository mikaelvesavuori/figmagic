import { writeTokens } from '../bin/functions/writeTokens.mjs';

test('Description', () => {
	expect(writeTokens('asdf')).toBe('asdf');
});
