import { setupSpacingTokens } from '../bin/functions/setupSpacingTokens.mjs';

test('Description', () => {
	expect(setupSpacingTokens('asdf')).toBe('asdf');
});
