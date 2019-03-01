import { getFromApi } from '../bin/functions/getFromApi.mjs';

test('Description', () => {
	expect(getFromApi('asdf')).toBe('asdf');
});
