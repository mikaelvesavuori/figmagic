import { setupFontSizeTokens } from '../bin/functions/setupFontSizeTokens.mjs';

test('Description', () => {
	expect(setupFontSizeTokens('asdf')).toBe('asdf');
});
