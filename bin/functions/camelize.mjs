export function camelize(str) {
	if (str) {
		return str
			.toLowerCase()
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
				return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
			})
			.replace(/\s+/g, '');
	} else {
		console.error('No string provided to camelize()!');
		process.exit(1);
	}
}
