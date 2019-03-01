import { setupLineHeightTokens } from '../bin/functions/setupLineHeightTokens.mjs';

test('Description', () => {
	expect(setupLineHeightTokens('asdf')).toBe('asdf');
});
