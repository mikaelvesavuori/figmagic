import { setupFontTokens } from '../bin/functions/setupFontTokens.mjs';

test('Description', () => {
	expect(setupFontTokens('asdf')).toBe('asdf');
});
