function formatName(str) {
	const forbiddenCharacters = ['-', '–', '—', '|', '.'];

	let fixedString = str;

	forbiddenCharacters.forEach(char => {
		fixedString = fixedString.replace(char, '');
	});

	return fixedString;
}

module.exports = formatName;
