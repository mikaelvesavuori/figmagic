import { processTokens } from '../bin/functions/processTokens.mjs';

test('Description', () => {
	expect(processTokens('asdf')).toBe('asdf');
});
