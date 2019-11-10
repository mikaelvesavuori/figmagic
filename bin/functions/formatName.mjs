/**
 * Used to clean and format the name of a file
 *
 * @exports
 * @function
 * @param {string} str - The incoming name
 * @returns {string} - The fixed string
 * @throws {Error} - When no string is provided
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
