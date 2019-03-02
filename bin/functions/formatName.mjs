/**
 * Used to clean and format the name of a file
 *
 * @export
 * @param {string} str - The incoming name
 * @returns
 */
export function formatName(str) {
	if (str) {
		const forbiddenCharacters = ['-', '–', '—', '|', '.'];

		let fixedString = str;

		forbiddenCharacters.forEach(char => {
			fixedString = fixedString.replace(char, '');
		});

		return fixedString;
	} else {
		throw new Error('No string for formatName()!');
	}
}
