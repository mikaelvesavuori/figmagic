import { setupFontWeightTokens } from '../bin/functions/setupFontWeightTokens.mjs';

test('Description', () => {
	expect(setupFontWeightTokens('asdf')).toBe('asdf');
});
