import { setupColorTokens } from '../bin/functions/setupColorTokens.mjs';

test('Description', () => {
	expect(setupColorTokens('asdf')).toBe('asdf');
});
