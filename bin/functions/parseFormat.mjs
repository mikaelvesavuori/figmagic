/**
 * Parse the third process.env argument (first user-specified argument) to select a token format for the exported files
 *
 * @export
 * @param {string} value - The kind of value that is requested, either "mjs" or "js"
 * @returns
 */
export function parseFormat(value) {
	if (value === undefined) {
		return 'mjs';
	} else {
		if (value.toLowerCase() === 'mjs' || value.toLowerCase() === 'js') {
			return value.toLowerCase();
		} else return 'mjs';
	}
}
