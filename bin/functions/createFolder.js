const fs = require('fs');

function createFolder(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

module.exports = createFolder;
