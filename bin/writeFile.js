const fs = require('fs');
const createFolder = require('./createFolder.js');

function writeFile(file, name, path = 'tokens') {
	createFolder(path);
	write();

	function write() {
		const fileName = `${path}/${name}.js`;

		fs.writeFileSync(
			fileName,
			'module.exports = ' + JSON.stringify(file, null, ' '),
			'utf-8',
			function(error) {
				if (error) {
					return console.log(error);
				}
			}
		);
	}
}

module.exports = writeFile;
