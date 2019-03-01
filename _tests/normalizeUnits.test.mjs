import { normalizeUnits } from '../bin/functions/normalizeUnits.mjs';

test('Description', () => {
	expect(normalizeUnits('asdf')).toBe('asdf');
});
