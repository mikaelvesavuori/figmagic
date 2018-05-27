import fs from 'fs';
fs.exists('./tokens/grid.mjs', function(exists) {
	if (exists) {
		return true;
	} else {
		if (!fs.existsSync('tokens')) {
			fs.mkdirSync('tokens');
		}

		fs.writeFileSync(
			'tokens/grid.mjs',
			'const grid = {\n\n}\n\nexport default grid;',
			'utf-8',
			function(error) {
				if (error) {
					return console.log(error);
				}
			}
		);
	}
});
