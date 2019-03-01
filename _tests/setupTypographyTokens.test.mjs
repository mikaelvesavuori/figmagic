import { setupTypographyTokens } from '../bin/functions/setupTypographyTokens.mjs';

test('Description', () => {
	expect(setupTypographyTokens('asdf')).toBe('asdf');
});
